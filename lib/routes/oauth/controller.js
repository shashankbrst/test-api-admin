import _ from 'lodash'

const renderLogin = (req, res) => {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }

  const error = req.flash('error')
  const data = {}
  if (error.length > 0) {
    _.extend(data, { error })
  }

  _.extend(data, { layout: false })

  res.render('oauth/login', data)
}

const oauthLogin = (req, res) => {
  // ToDo: Add passport-local-strategy.
  res.sendStatus(200)
}

const processLogout = (req, res) => {
  req.logout()
  res.redirect('/oauth/login')
}

export default {
  renderLogin,
  oauthLogin,
  processLogout,
}
