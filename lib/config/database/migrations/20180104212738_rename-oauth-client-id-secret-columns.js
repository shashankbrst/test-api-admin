exports.up = function(knex, Promise) {
  return knex.schema.table('oauth_clients', table => {
    table.renameColumn('application_id', 'client_id')
    table.renameColumn('application_secret', 'client_secret')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('oauth_clients', table => {
    table.renameColumn('client_secret', 'application_secret')
    table.renameColumn('client_id', 'application_id')
  })
}
