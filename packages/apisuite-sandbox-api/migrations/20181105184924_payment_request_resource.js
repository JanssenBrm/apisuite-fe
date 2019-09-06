exports.up = function (knex) {
	return knex.schema.createTable('payment_request_resource', function (table) {
		table.increments('id').primary()
		table.string('payment_information_id')
		table.integer('number_of_transactions')
		table.enu('purpose', ['ACCT', 'CASH', 'COMC', 'CPKC', 'TRPT'])
		table.enu('charge_bearer', ['SLEV'])
		table.enu('payment_information_status', ['ACCP', 'ACSC', 'ACSP', 'ACTC', 'ACWC', 'ACWP', 'PART', 'RCVD', 'PDNG', 'RJCT'])
		table.enu('status_reason_information', ['AC01', 'AC04', 'AC06', 'AG01', 'CH03', 'CUST', 'DS02', 'FF01', 'FRAD', 'MS03', 'NOAS', 'RR01', 'RR03', 'RR04', 'RR12'])
		table.boolean('funds_availability')
		table.boolean('booking')
		table.datetime('requested_execution_date')
		table.string('debtor_account_id')
		table.string('creditor_account_id')
		table.string('brand')
		table.timestamps()
	}).createTable('party_identification', function (table) {
		table.increments('id').primary()
		table.string('name', 140)
		table.string('initiating_party_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.string('debtor_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.string('ultimate_creditor_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.string('creditor_id').unsigned().references('beneficiary.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('generic_identification', function (table) {
		table.increments('id').primary()
		table.string('identification', 70)
		table.string('scheme_name', 70)
		table.string('issuer', 35)
		table.string('organisation_id').references('party_identification.id').onDelete('CASCADE')
		table.string('private_id').references('party_identification.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('payment_type_information', function (table) {
		table.increments('id').primary()
		table.enu('instruction_priority', ['HIGH', 'NORM'])
		table.enu('service_level', ['NURG', 'SEPA'])
		table.enu('local_instrument', ['INST'])
		table.enu('category_purpose', ['CASH', 'DVPM'])
		table.string('payment_request_resource_id').unsigned().references('payment_request_resource.id')
		table.timestamps()
	}).createTable('postal_address', function (table) {
		table.increments('id').primary()
		table.string('country')
		table.integer('party_identification_id').unsigned().references('party_identification.id').onDelete('CASCADE')
		table.integer('psu_id').unsigned().references('psu.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('address_line', function (table) {
		table.increments('id').primary()
		table.string('address_line')
		table.integer('postal_address_id').unsigned().references('postal_address.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('supplementary_data', function (table) {
		table.increments('id').primary()
		table.enu('sca_hint', ['noScaExemption', 'scaExemption'])
		table.string('successful_report_url')
		table.string('unsuccessful_report_url')
		table.integer('payment_request_resource_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('accepted_authentication_approach', function (table) {
		table.increments('id').primary()
		table.enu('accepted_authentication_approach', ['REDIRECT', 'DECOUPLED', 'EMBEDDED'])
		table.integer('supplementary_data_id').unsigned().references('supplementary_data.id').onDelete('CASCADE')
		table.timestamps()
	}).createTable('beneficiary', function (table) {
		table.increments('id').primary()
		table.boolean('is_trusted')
		table.string('creditor_account_id')
		table.integer('payment_request_resource_id').unsigned().references('payment_request_resource.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTableIfExists('party_identification'),
		knex.schema.dropTableIfExists('generic_identification'),
		knex.schema.dropTableIfExists('payment_type_information'),
		knex.schema.dropTableIfExists('postal_address'),
		knex.schema.dropTableIfExists('address_line'),
		knex.schema.dropTableIfExists('supplementary_data'),
		knex.schema.dropTableIfExists('accepted_authentication_approach'),
		knex.schema.dropTableIfExists('beneficiary'),
		knex.schema.dropTableIfExists('payment_request_resource'),
	])
}
