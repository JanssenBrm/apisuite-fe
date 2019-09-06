
exports.up = function (knex) {
	return knex.schema.createTable('oauth_state', function (table) {
		table.increments('id').primary()
		table.string('state').notNullable()
		table.string('client_id').notNullable()
		table.timestamp('expires_on')
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('oauth_state')
}
