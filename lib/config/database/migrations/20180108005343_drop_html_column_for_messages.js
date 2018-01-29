exports.up = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.dropColumn('html')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('messages', table => {
    table.json('html')
  })
}
