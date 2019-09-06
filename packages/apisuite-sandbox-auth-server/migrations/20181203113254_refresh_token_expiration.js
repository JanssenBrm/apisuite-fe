
exports.up = (knex) => {
	return knex.schema
		.alterTable('oauth_refresh_token', (table) => {
			table.timestamp('expires_on').notNullable()
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('oauth_refresh_token', (table) => {
			table.dropColumn('expires_on')
		})
}
