exports.up = (knex) => {
	return knex.schema.alterTable('product_endpoint', (table) => {
		table.string('brand').notNullable().default('bnpparibasfortis')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('product_endpoint', (table) => {
		table.dropColumn('brand')
	})
}
