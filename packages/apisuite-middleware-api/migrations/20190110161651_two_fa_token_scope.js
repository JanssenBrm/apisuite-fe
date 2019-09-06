exports.up = (knex) => {
	return knex.schema.alterTable('two_fa_token', (table) => {
		table.string('scope')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('two_fa_token', (table) => {
		table.dropColumn('scope')
	})
}
