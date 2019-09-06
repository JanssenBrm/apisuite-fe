exports.up = function (knex) {
	return knex.schema.createTable('payment_coverage_request_resource', function (table) {
		table.increments('id').primary()
		table.string('payee', 70)
		table.string('account_identification_id').unsigned().references('account_identification.id').onDelete('CASCADE')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('payment_coverage_request_resource')
}
