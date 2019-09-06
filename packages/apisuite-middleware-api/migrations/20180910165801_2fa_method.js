exports.up = (knex) => {
	return knex.schema.alterTable('user_two_fa', (table) => {
		table.string('method').notNullable()
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('user_two_fa', (table) => {
		table.dropColumn('method')
	})
}
