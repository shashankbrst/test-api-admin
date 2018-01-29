import _ from 'lodash'
import omEnums from '../../om-enums'

exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists('oauth_clients', table => {
      table.increments()
      table.string('name')
      table.string('application_id')
      table.string('application_secret')
      table.string('redirect_uris')
      table.string('grants').defaultTo(_.join(omEnums.oauth.grants, ','))
      table.string('scope')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table.timestamps(true, true)
    })
    .createTableIfNotExists('oauth_authorization_codes', table => {
      table.increments()
      table.string('code')
      table.dateTime('authorization_code_expires_at')
      table.string('redirect_uri')
      table.string('scope')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table
        .integer('oauth_client_id')
        .unsigned()
        .references('id')
        .inTable('oauth_clients')
      table.timestamps(true, true)
    })
    .createTableIfNotExists('oauth_access_tokens', table => {
      table.increments()
      table.string('access_token')
      table.dateTime('access_token_expires_at')
      table.string('scope')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table
        .integer('oauth_client_id')
        .unsigned()
        .references('id')
        .inTable('oauth_clients')
      table.timestamps(true, true)
    })
    .createTableIfNotExists('oauth_refresh_tokens', table => {
      table.increments()
      table.string('refresh_token')
      table.dateTime('refresh_token_expires_at')
      table.string('scope')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
      table
        .integer('oauth_client_id')
        .unsigned()
        .references('id')
        .inTable('oauth_clients')
      table.timestamps(true, true)
    })
    .createTableIfNotExists('oauth_scopes', table => {
      table.increments()
      table.string('scope')
      table.boolean('is_default')
      table.timestamps(true, true)
    })
}

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTable('oauth_scopes')
    .dropTable('oauth_refresh_tokens')
    .dropTable('oauth_access_tokens')
    .dropTable('oauth_authorization_codes')
    .dropTable('oauth_clients')
}
