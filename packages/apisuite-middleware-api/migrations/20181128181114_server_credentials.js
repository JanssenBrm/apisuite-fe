
exports.up = (knex) => {
	return knex.schema
		.createTable('auth_server_token', (table) => {
			table.string('token').primary()
			table.timestamp('expiration_date').notNullable()
		})
}

exports.down = (knex) => {
	return knex.schema
		.dropTableIfExists('auth_server_token')
}
