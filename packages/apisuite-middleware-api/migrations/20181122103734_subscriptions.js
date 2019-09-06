
exports.up = function (knex) {
	return knex.schema
		.createTable('product', function (table) {
			table.increments('id').primary()
			table.string('name').notNullable()
			table.string('description')
			table.string('version')
		})
		.createTable('subscription', function (table) {
			table.increments('id').primary()
			table.integer('organization_id').unsigned().notNullable().references('organization.id').onDelete('CASCADE')
			table.integer('product_id').unsigned().notNullable().references('product.id').onDelete('CASCADE')
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('subscription')
		.dropTableIfExists('product')
}
