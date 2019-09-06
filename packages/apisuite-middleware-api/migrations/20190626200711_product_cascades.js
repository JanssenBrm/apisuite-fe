
exports.up = (knex) => {
	return knex.schema.alterTable('product_feature', (table) => {
		table.dropForeign('product_id')
		table.foreign('product_id').references('product.id').onDelete('CASCADE')
	}).alterTable('product_usecase', (table) => {
		table.dropForeign('product_id')
		table.foreign('product_id').references('product.id').onDelete('CASCADE')
	})
}

exports.down = () => {
	// do nothing
}
