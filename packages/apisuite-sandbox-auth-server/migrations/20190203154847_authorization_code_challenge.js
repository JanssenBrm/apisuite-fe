
exports.up = function (knex) {
	
	return knex.schema.alterTable('oauth_authorization_code', (table) => {
		table.enu('code_challenge_method', ['S256'])
		table.string('code_challenge')
	})
	
}

exports.down = function (knex) {
	return knex.schema.alterTable('oauth_authorization_code', (table) => {
		table.dropColumn('code_challenge_method')
		table.dropColumn('code_challenge')
	})
}
