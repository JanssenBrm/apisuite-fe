exports.up = function (knex) {
	return knex.schema.createTable('account_identification', function (table) {
		table.increments('id').primary()
		table.string('iban').nullable().unique()
		table.string('account_resource_id').references('account_resource.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('account_identification')
}
