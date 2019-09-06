exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('role', function (table) {
			table.increments('id').primary()
			table.string('name').notNullable().unique()
			table.integer('level').notNullable().unique()
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('role')
}
