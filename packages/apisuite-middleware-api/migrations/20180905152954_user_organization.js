
exports.up = (knex) => {
	return Promise.all([
		knex.schema.createTable('organization', (table) => {
			table.increments('id').primary()
			table.string('name').notNullable()
			table.string('vat_number')
			table.string('website')
			table.timestamps()
		}),
		knex.schema.createTable('user_organization', (table) => {
			table.increments('id').primary()
			table.integer('user_id').notNullable().unsigned().references('user.id').onDelete('CASCADE')
			table.integer('organization_id').notNullable().unsigned().references('organization.id').onDelete('CASCADE')
			table.string('role')
		}),
	])
}

exports.down = (knex) => {
	return Promise.all([
		knex.schema.dropTableIfExists('user_organization'),
		knex.schema.dropTableIfExists('organization'),
	])
}
