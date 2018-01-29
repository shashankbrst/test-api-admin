/**
 * Created by udit on 10/11/17.
 */

import _ from 'lodash'
import { split } from '../helpers/utils'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import passport from 'passport'
import User from '../models/user'

const validAdministratorEmails = _.split(process.env.SUPER_ADMIN_EMAILS || 'john.doe@example.com', ',')

const init = app => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  passport.deserializeUser(function(id, done) {
    User.where({ id: id })
      .fetch()
      .then(objUser => {
        if (objUser === null) {
          done(null, null)
        } else {
          done(null, objUser.toJSON())
        }
      })
      .catch(err => done(err))
  })

  // Use the GoogleStrategy within Passport.
  //   Strategies in Passport require a `verify` function, which accept
  //   credentials (in this case, an accessToken, refreshToken, and Google
  //   profile), and invoke a callback with a user object.
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        callbackURL: '/oauth/google/callback',
        passReqToCallback: true,
      },
      function(req, accessToken, refreshToken, profile, done) {
        profile.email = profile.emails[0].value
        const isSuperAdmin = _.includes(validAdministratorEmails, profile.emails[0].value)
        const photo = profile.photos[0].value || ''
        const names = split(profile.displayName, ' ', 2)

        User.where({ email_address: profile.email })
          .fetch()
          .then(objUser => {
            if (objUser == null) {
              new User({
                username: profile.email,
                email_address: profile.email,
                first_name: names[0],
                last_name: names[1],
                display_name: profile.displayName || profile.email,
                google_oauth_profile: JSON.stringify(profile),
                is_super_admin: isSuperAdmin,
                photo: photo,
              })
                .save()
                .then(objAdmin => {
                  done(null, objAdmin)
                })
                .catch(err => done(err))
            } else {
              const fieldsToReplace = _.pick(objUser.toJSON(), ['first_name', 'last_name', 'display_name', 'photo'])
              const defaults = {
                first_name: names[0],
                last_name: names[1],
                display_name: profile.displayName,
                photo: photo,
              }
              // Apply Defaults for empty values in existing data.
              const data = _.assignWith(fieldsToReplace, defaults, (objValue, srcValue) => {
                return _.isEmpty(objValue) ? srcValue : objValue
              })
              // Update super admin flag & google profile json.
              data.is_super_admin = isSuperAdmin
              data.google_oauth_profile = JSON.stringify(profile)
              new User({ id: objUser.id })
                .save(data)
                .then(updatedObjUser => done(null, updatedObjUser))
                .catch(err => done(err))
            }
          })
          .catch(err => done(err))
      },
    ),
  )
}

export default {
  init,
}
