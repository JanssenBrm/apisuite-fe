
exports.up = function (knex) {
	return knex.schema.createTable('app_scopes', function (table) {
		table.increments('id').primary()
		table.string('scope').notNullable()
		table.boolean('internal').notNullable().defaultTo(false)
		table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('app_scopes')
}
