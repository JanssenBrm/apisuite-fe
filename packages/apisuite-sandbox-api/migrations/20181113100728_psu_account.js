
exports.up = function (knex) {
	return knex.schema.createTable('psus_accounts', (table) => {
		table.integer('psu_id').unsigned().references('psu.id')
		table.integer('account_resource_id').unsigned().references('account_resource.id').onDelete('CASCADE')
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('psus_accounts')
}
