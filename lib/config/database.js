// Load _env first. Just in case calling directly from terminal.
// Knex will call use this directly from terminal.
// So we need environment variables.
// Don't move this.
// Otherwise app will fail to load environment variables.
// Ref: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import {} from './env'
import _ from 'lodash'

const dbDebug = process.env.DB_DEBUG || 'false'
const dbHost = process.env.DB_HOST || 'localhost'
const dbUser = process.env.DB_USER || 'root'
const dbPassword = process.env.DB_PASSWORD || ''
const dbName = process.env.DB_NAME || 'om'

module.exports = {
  development: {
    client: 'mysql',
    debug: _.toLower(dbDebug) === 'true',
    connection: {
      host: dbHost,
      user: dbUser,
      password: dbPassword,
      database: dbName,
      charset: 'utf8',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: './database/migrations',
    },
    seeds: {
      directory: './database/seeds',
    },
  },

  production: {},
}
