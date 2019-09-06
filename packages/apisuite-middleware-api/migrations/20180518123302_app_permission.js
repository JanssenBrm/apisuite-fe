
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('app_permission', function (table) {
			table.increments('id').primary()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.integer('permission_id').unsigned().notNullable()
			table.unique(['app_id', 'permission_id'])
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('app_permission')
}
