
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('app', function (table) {
			table.increments('id').primary()
			table.string('name').notNullable()
			table.string('description')
			table.string('client_id').notNullable().unique()
			table.string('client_secret')
			table.string('public_url')
			table.integer('owner_id')
			table.integer('organization_id')
			table.timestamps()
		}).createTable('app_redirect_url', function (table) {
			table.increments('id').primary()
			table.string('url').notNullable()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.unique(['url', 'app_id'])
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('app_redirect_url')
		.dropTableIfExists('app')
}
