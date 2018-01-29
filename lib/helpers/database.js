import dbConfig from '../config/database'
import knex from 'knex'
import bookshelf from 'bookshelf'
import securePassword from 'bookshelf-secure-password'

const env = process.env.NODE_ENV || 'development'

let currentDBConfig = dbConfig.development

if (env === 'production') {
  currentDBConfig = dbConfig.production
}

const knexHelper = knex(currentDBConfig)
const bookshelfHelper = bookshelf(knexHelper)

// Load all the required plugins
bookshelfHelper.plugin('registry')
bookshelfHelper.plugin(securePassword)

export default bookshelfHelper
