
exports.up = function (knex) {
	return knex.schema.createTable('product_endpoint', function (table) {
		table.increments('id').primary()
		table.enum('method', ['GET', 'POST', 'PATCH', 'DELETE', 'PUT', 'HEAD',  'OPTIONS']).notNullable()
		table.string('path').notNullable()
		table.integer('api_id').unsigned().notNullable().references('api_docs.id').onDelete('CASCADE')
		table.timestamps()
	})
	
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('product_endpoint')
}
