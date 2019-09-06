
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('app_activity', function (table) {
			table.increments('id').primary()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.string('status_code')
			table.string('method')
			table.string('path')
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('app_activity')
}
