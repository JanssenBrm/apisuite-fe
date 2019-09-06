
exports.up = (knex) => {
	return knex.schema
		.alterTable('oauth_access_token', (table) => {
			table.dropForeign('client_id', 'oauth_access_token_client_id_foreign')
			table.dropColumn('client_id')
		})
		.alterTable('oauth_access_token', (table) => {
			table.string('client_id').notNullable().references('app.client_id').onDelete('CASCADE')
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('oauth_access_token', (table) => {
			table.dropForeign('client_id', 'oauth_access_token_client_id_foreign')
			table.dropColumn('client_id')
		})
}
