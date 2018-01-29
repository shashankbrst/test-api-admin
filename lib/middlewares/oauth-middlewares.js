import omError from '../errors/omError'
import errorCodes from '../errors/errorCodes'

const ensureSuperAdmin = (req, res, next) => {
  if (req.user && req.user.is_super_admin) {
    return next()
  }
  req.logout()
  return next(new omError(errorCodes.unauthorized_access))
}

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  }
  req.session.returnTo = req.originalUrl || req.url
  res.redirect('/oauth/login')
}

export default {
  ensureAuthenticated,
  ensureSuperAdmin,
}
