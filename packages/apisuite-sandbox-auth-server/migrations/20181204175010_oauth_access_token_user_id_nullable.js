exports.up = (knex) => {
	return knex.schema.alterTable('oauth_access_token', (table) => {
		table.dropColumn('user_id')
	}).alterTable('oauth_access_token', (table)=>{
		table.string('user_id').after('client_id')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('oauth_access_token', (table) => {
		table.dropColumn('user_id')
	}).alterTable('oauth_access_token', (table)=>{
		table.string('user_id').notNullable().after('client_id')
	})
}
