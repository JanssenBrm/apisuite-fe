
exports.up = (knex) => {
	return knex.schema
		.alterTable('oauth_authorization_code', (table) => {
			table.timestamp('expires_on').notNullable()
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('oauth_authorization_code', (table) => {
			table.dropColumn('expires_on')
		})
}
