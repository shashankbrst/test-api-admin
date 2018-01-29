exports.up = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.text('markup', 'longtext')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.dropColumn('markup')
  })
}
