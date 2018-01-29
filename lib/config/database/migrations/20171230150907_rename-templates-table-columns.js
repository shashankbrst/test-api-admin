exports.up = function(knex, Promise) {
  return knex.schema.table('templates', table => {
    table.renameColumn('label', 'type')
    table.renameColumn('html', 'markup')
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('templates', table => {
    table.renameColumn('type', 'label')
    table.renameColumn('markup', 'html')
  })
}
