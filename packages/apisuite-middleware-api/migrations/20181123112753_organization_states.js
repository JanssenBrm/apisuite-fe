exports.up = (knex) => {
	return knex.schema
		.alterTable('organization', (table) => {
			table.enu('state', ['NON_VALIDATED', 'NON_TRUSTED', 'TRUSTED', 'INTERNAL']).defaultTo('NON_VALIDATED').after('policy_url')
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('organization', (table) => {
			table.dropColumn('state')
		})
}
