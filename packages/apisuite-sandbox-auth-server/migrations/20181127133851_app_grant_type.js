
exports.up = (knex) => {
	return knex.schema
		.alterTable('app', (table) => {
			table.string('grant_type').notNullable()
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('app', (table) => {
			table.dropColumn('grant_type')
		})
}
