exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('user_organization_role', function (table) {
			table.increments('id').primary()
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.integer('organization_id').unsigned().notNullable().references('organization.id').onDelete('CASCADE')
			table.integer('role_id').unsigned().notNullable().references('role.id').onDelete('CASCADE')
			table.unique(['user_id', 'organization_id', 'role_id'])
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('user_organization_role')
}
