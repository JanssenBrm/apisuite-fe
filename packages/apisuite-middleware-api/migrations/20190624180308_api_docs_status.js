exports.up = (knex) => {
	return knex.schema.alterTable('api_docs', (table) => {
		table.string('title').notNullable().after('id').default('')
		table.enu('access_scope', ['public', 'private', 'internal']).notNullable().after('product_id').default('private')
		table.boolean('live').notNullable().after('access_scope').default(false)
		table.boolean('sandbox').notNullable().after('live').default(false)
		table.boolean('deprecated').notNullable().after('sandbox').default(false)
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('api_docs', (table) => {
		table.dropColumn('title')
		table.dropColumn('access_scope')
		table.dropColumn('live')
		table.dropColumn('sandbox')
		table.dropColumn('deprecated')
	})
}
