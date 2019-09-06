exports.up = function (knex) {
	return knex.schema.createTable('psu', (table) => {
		table.increments('id').primary()
		table.string('username').unique()
		table.string('password')
		table.string('name')
		table.string('email')
		table.string('language')
		table.string('avatar_url')
		table.timestamps()
	}).createTable('tpp', (table) => {
		table.increments('id').primary()
	}).createTable('accreditation', (table) => {
		table.increments('id').primary()
		table.string('tpp_id').notNullable()
		table.integer('psu_id').notNullable().unsigned().references('psu.id').onDelete('CASCADE')
		table.integer('account_resource_id').notNullable().unsigned().references('account_resource.id').onDelete('CASCADE')
		table.unique(['tpp_id', 'psu_id', 'account_resource_id'])
		table.timestamps()
	}).createTable('operation', (table) => {
		table.integer('id').primary()
		table.enu('operation', ['Balances', 'Transactions', 'AmountCoverage', 'TransferInitiation'])
	}).createTable('account_operation', (table) => {
		table.integer('id').primary()
		table.integer('accreditation_id').notNullable().unsigned().references('accreditation.id').onDelete('CASCADE')
		table.integer('operation_id').notNullable().unsigned().references('operation.id')
		table.unique(['accreditation_id', 'operation_id'])
		table.timestamps()
	})
}

exports.down = function (knex) {
	return Promise.all([
		knex.schema.dropTableIfExists('psu'),
		knex.schema.dropTableIfExists('tpp'),
		knex.schema.dropTableIfExists('accreditation'),
		knex.schema.dropTableIfExists('operation'),
		knex.schema.dropTableIfExists('account_operation'),
	])
}
