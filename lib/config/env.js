// Keep this file, and load this file at the very start in ./lib/app.js
// Otherwise app will fail to load environment variables.
// Ref: https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import dotenv from 'dotenv'
import path from 'path'

const isKnexMigrate = process.env.IS_KNEX_MIGRATE || false

if (isKnexMigrate) {
  dotenv.config({
    // When running Knex Migrate, we are assuming we will have the .env at ./../../.env
    // Because knex will be run from `dist`.
    path: path.join(__dirname, '..', '..', '.env'),
  })
} else {
  dotenv.config()
}
