exports.up = (knex) => {
	return knex.schema
		.dropTableIfExists('app_redirect_url')
		.dropTableIfExists('app_permission')
		.dropTableIfExists('app_activity')
		.dropTableIfExists('app')
}

exports.down = (knex) => {
	return knex.schema
		.createTable('app', function (table) {
			table.increments('id').primary()
			table.string('name').notNullable().unique()
			table.string('description')
			table.string('icon')
			table.string('public_url')
			table.string('client_id')
			table.string('client_secret')
			table.text('access_token')
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.timestamps()
		}).createTable('app_redirect_url', function (table) {
			table.increments('id').primary()
			table.string('url').notNullable()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.unique(['url', 'app_id'])
			table.timestamps()
		})
		.createTable('app_permission', function (table) {
			table.increments('id').primary()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.integer('permission_id').unsigned().notNullable()
			table.unique(['app_id', 'permission_id'])
			table.timestamps()
		})
		.createTable('app_activity', function (table) {
			table.increments('id').primary()
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.string('status_code')
			table.string('method')
			table.string('path')
			table.timestamps()
		})
}
