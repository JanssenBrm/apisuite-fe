
exports.up = function (knex) {
	return knex.schema.createTable('app_container', function (table) {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('app_container')
}
