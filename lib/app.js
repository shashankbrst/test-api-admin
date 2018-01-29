// Load _env first. Don't move this.
// Otherwise app will fail to load environment variables.
// Ref: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {} from './config/env'
import { getBaseUrl } from './helpers/utils'
import bodyParser from 'body-parser'
import breadcrumbs from 'express-breadcrumbs'
import cookieParser from 'cookie-parser'
import chalk from 'chalk'
import cors from 'cors'
import debug from 'debug'
import express from 'express'
import favicon from 'serve-favicon'
import flash from 'connect-flash'
import hbs from './helpers/handlebars'
import helmet from 'helmet'
import http from 'http'
import logger from './helpers/logger'
import morgan from 'morgan'
import passport from './helpers/passport'
import path from 'path'
import routes from './routes'
import session from 'express-session'

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('hbs', hbs.instance.engine)
app.set('view engine', 'hbs')
app.enable('view cache')

app.use(morgan('dev'))
app.use(cors()) // enable CORS
app.use(helmet()) // Secure our request headers
app.use(cookieParser()) // parse request cookies for access in body
app.use(bodyParser.urlencoded({ extended: true })) // parse application/x-www-form-urleconded
app.use(bodyParser.json({ limit: '50mb' })) // get all data/stuff out of the body (POST) paramets as json
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.png')))

// Express Breadcrumbs.
app.use(breadcrumbs.init())
// Set Breadcrumbs home information
app.use(breadcrumbs.setHome())
// Mount the breadcrumbs at root i.e., `/`
app.use(
  '/',
  breadcrumbs.setHome({
    name: '<i class="fa fa-dashboard"></i> Dashboard',
    url: '/',
  }),
)

// Flash setup for error messaging for Passport
app.use(flash())

// Session setup. Required for passport
app.use(
  session({
    secret: 'admin.openmessage.io admin',
    resave: false,
    saveUninitialized: false,
  }),
)

//Setup Passport User Authentication for Admin Module
//====================
passport.init(app)

app.use('/', routes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.info = req.app.get('env') === 'development' ? err.toString() : ''
  res.locals.status = err.status || 500
  res.locals.baseUrl = getBaseUrl(req)

  if (req.app.get('env') === 'development') {
    logger.log(chalk.red(err))
  } else {
    res.locals.info = ''
  }

  if (err.status === 404) {
    res.render('errors/404', { layout: false })
  } else {
    res.render('errors/500', { layout: false })
  }
})

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || '3001')
app.set('port', port)

/**
 * Create HTTP server.
 */

const server = http.createServer(app)

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port
  debug('Listening on ' + bind)
}
