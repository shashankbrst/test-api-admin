exports.up = function(knex, Promise) {
  return knex.schema
    .renameTable('conversation_audiences', 'conversations_audiences')
    .renameTable('customer_messages', 'customers_messages')
    .renameTable('billing_organizations', 'billing_plans_organizations')
    .renameTable('customer_audiences', 'customers_audiences')
}

exports.down = function(knex, Promise) {
  return knex.schema
    .renameTable('customers_audiences', 'customer_audiences')
    .renameTable('billing_plans_organizations', 'billing_organizations')
    .renameTable('customers_messages', 'customer_messages')
    .renameTable('conversations_audiences', 'conversation_audiences')
}
