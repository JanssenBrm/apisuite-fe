exports.up = (knex) => {
	return knex.schema.alterTable('app', (table) => {
		table.string('icon_url').after('organization_id')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('app', (table) => {
		table.dropColumn('icon_url')
	})
}
