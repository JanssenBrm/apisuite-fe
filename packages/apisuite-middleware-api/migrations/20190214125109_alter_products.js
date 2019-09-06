
exports.up = function(knex) {
	return knex.schema.createTable('product_usecase', function (table) {
		table.increments('id').primary()
		table.string('title')
		table.text('description', 'mediumtext')
		table.integer('product_id').unsigned().references('product.id')
		table.timestamps()
	}).createTable('product_feature', function (table) {
		table.increments('id').primary()
		table.string('title')
		table.text('description', 'mediumtext')
		table.integer('product_id').unsigned().references('product.id')
		table.timestamps()
	}).then(() => {
		return knex.schema.alterTable('product', (table) => {
			table.string('longname').after('name')
			table.string('intro').after('longname')
			table.text('description', 'mediumtext').alter()
			table.string('image').after('description')
			table.timestamps()
		})
	})
}

exports.down = function(knex) {
	return knex.schema.dropTableIfExists('product_usecase')
		.dropTableIfExists('product_feature').then(() => {
			return knex.schema.alterTable('product', (table) => {
				table.dropColumn('longname')
				table.dropColumn('intro')
				table.string('description').alter()
				table.dropColumn('image')
			})
		})
}
