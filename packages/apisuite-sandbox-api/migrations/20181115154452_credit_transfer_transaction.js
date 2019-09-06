exports.up = function (knex) {
	return knex.schema.createTable('credit_transfer_transaction', function (table) {
		table.increments('id').primary()
		table.datetime('requested_execution_date')
		table.datetime('end_date')
		table.enu('execution_rule', ['FWNG', 'PREC'])
		table.enu('frequency', ['DAIL', 'WEEK', 'TOWK', 'MNTH', 'TOMN', 'QUTR', 'SEMI', 'YEAR'])
		table.string('remittance_information', 140)
		table.enu('transaction_status', ['RJCT', 'PDNG', 'ACSP', 'ACSC'])
		table.enu('status_reason_information', ['AC01', 'AC04', 'AC06', 'AG01', 'CH03', 'CUST', 'DS02', 'FF01', 'FRAD', 'MS03', 'NOAS', 'RR01', 'RR03', 'RR04', 'RR12'])
		table.integer('payment_request_resource_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('payment_identification', function (table) {
		table.increments('id').primary()
		table.string('instruction_id')
		table.string('end_to_end_id')
		table.integer('credit_transfer_transaction_id').unsigned().references('credit_transfer_transaction.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('remittance_information', function (table) {
		table.increments('id').primary()
		table.string('remittance_line')
		table.integer('credit_transfer_transaction_id').unsigned().references('credit_transfer_transaction.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTableIfExists('credit_transfer_transaction'),
		knex.schema.dropTableIfExists('payment_identification'),
		knex.schema.dropTableIfExists('remittance_information'),
	])
}
