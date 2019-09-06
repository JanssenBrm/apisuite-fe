
exports.up = function (knex) {
	
	return knex.schema.createTable('oauth_access_token', function (table) {
		table.increments('id').primary()
		table.string('token').notNullable()
		table.string('scope')
		table.string('client_id').notNullable().references('app.client_id')
		table.string('user_id').notNullable()
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('oauth_access_token')
}
