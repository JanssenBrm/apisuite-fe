exports.up = (knex) => {
	return knex.schema
		.alterTable('activity_log', (table) => {
			table.string('category').after('organization_id')
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('activity_log', (table) => {
			table.dropColumn('category')
		})
}
