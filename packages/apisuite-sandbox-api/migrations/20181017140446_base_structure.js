exports.up = function (knex) {
	return knex.schema.createTable('account_resource', function (table) {
		table.increments('id').primary()
		table.string('bic_fi')
		table.string('name', 70)
		table.string('details', 140)
		table.string('linked_account', 70)
		table.enu('usage', ['PRIV', 'ORG'])
		table.enu('cash_account_type', ['CACC', 'CARD'])
		table.string('product', 35)
		table.string('currency', 3)
		table.string('psu_status', 35)
	}).createTable('balance_resource', function (table) {
		table.increments('id').primary()
		table.string('name', 70)
		table.enu('balance_type', ['CLBD', 'XPCD', 'VALU', 'OTHR'])
		table.datetime('last_change_date_time')
		table.datetime('reference_date')
		table.string('last_committed_transaction', 40)
		table.string('account_resource_id').references('account_resource.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTableIfExists('account_resource'),
		knex.schema.dropTableIfExists('balance_resource'),
	])
}
