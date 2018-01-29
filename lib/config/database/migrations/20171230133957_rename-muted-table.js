exports.up = function(knex, Promise) {
  return knex.schema.renameTable('muted', 'is_muted')
}

exports.down = function(knex, Promise) {
  return knex.schema.renameTable('is_muted', 'muted')
}
