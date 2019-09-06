
exports.up = function (knex) {
	
	return knex.schema.raw('alter table oauth_authorization_code modify column code_challenge_method varchar(10)')
	
}

exports.down = function (knex) {
	return knex.schema.alterTable('oauth_authorization_code', (table) => {
		table.enu('code_challenge_method', ['S256'])
	})
}
