
exports.up = (knex) => {
	return knex.schema.alterTable('product_endpoint', table => {
		table.unique(['path', 'method', 'api_id'], 'unique_endpoint_version')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('product_endpoint', table => {
		table.dropUnique('unique_endpoint_version')
	})
}
