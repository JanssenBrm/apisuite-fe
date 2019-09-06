exports.up = (knex) => {
	return Promise.all([
		knex.schema.alterTable('user', (table) => {
			table.datetime('terms_accepted_at')
		}),
		knex.raw('UPDATE user SET `terms_accepted_at` = `created_at`;'),
	])
}

exports.down = (knex) => {
	return knex.schema.alterTable('user', (table) => {
		table.dropColumn('terms_accepted_at')
	})
}
