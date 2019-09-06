exports.up = function (knex) {
	return knex.schema.createTable('amount_type', function (table) {
		table.increments('id').primary()
		table.string('currency', 3)
		table.string('amount')
		table.string('resource_id')
		table.string('balance_resource_id').references('balance_resource.id').onDelete('CASCADE')
		table.string('credit_transfer_transaction_id').references('credit_transfer_transaction.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('amount_type')
}
