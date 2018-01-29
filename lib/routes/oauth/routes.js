import passport from 'passport'

import controller from './controller'
import oauthMiddlewares from '../../middlewares/oauth-middlewares'

export default oauthRouter => {
  // Login Routes
  oauthRouter
    .route('/login')
    // Shows a resource_server-specific login page to the user.
    .get(controller.renderLogin)
    // POST /login {username: U, password: P}
    // Target for site.loginForm. Passes the credentials to the LocalStrategy
    // configured in auth.js.
    .post(controller.oauthLogin)

  // Logout route
  oauthRouter.route('/logout').get(controller.processLogout)

  // Google Oauth Routes

  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve
  //   redirecting the user to google.com.  After authorization, Google
  //   will redirect the user back to this application at /auth/google/callback
  oauthRouter.route('/google').get(
    passport.authenticate('google', {
      scope: ['https://www.googleapis.com/auth/userinfo.email'],
    }),
  )

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  oauthRouter.route('/google/callback').get(
    passport.authenticate('google', {
      failureRedirect: '/oauth/login',
      successRedirect: '/',
      successReturnToOrRedirect: '/',
      failureFlash: true,
    }),
  )
}
