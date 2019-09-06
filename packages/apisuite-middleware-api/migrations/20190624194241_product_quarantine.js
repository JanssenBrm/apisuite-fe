exports.up = (knex) => {
	return knex.schema.alterTable('product', (table) => {
		table.boolean('quarantine').notNullable().after('version').default(false)
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('product', (table) => {
		table.dropColumn('quarantine')
	})
}
