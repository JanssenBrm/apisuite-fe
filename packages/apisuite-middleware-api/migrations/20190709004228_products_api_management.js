
exports.up = (knex) => {
	return knex.schema.alterTable('product', (table) => {
		table.string('base_uri').after('name')
		table.string('sandbox_base_uri').after('base_uri')
	}).alterTable('api_docs', (table) => {
		table.string('sandbox_source_control_key').after('deprecated')
		table.string('sandbox_source_control_name').after('sandbox_source_control_key')
	}).createTable('product_field', function (table) {
		table.increments('id').primary()
		table.string('locale').notNullable().default('en-GB')
		table.string('key').notNullable()
		table.string('title')
		table.string('image')
		table.text('body', 'mediumtext')
		table.string('target')
		table.integer('product_id').unsigned().references('product.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('product', (table) => {
		table.dropColumn('base_uri')
		table.dropColumn('sandbox_base_uri')
	}).alterTable('api_docs', (table) => {
		table.dropColumn('sandbox_source_control_key')
		table.dropColumn('sandbox_source_control_name')
	}).dropTableIfExists('product_field')
}
