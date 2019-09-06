exports.up = (knex) => {
	return knex.schema.createTable('action_role', (table) => {
		table.increments('id').primary()
		table.string('action').notNullable()
		table.integer('role_id').notNullable().unsigned().references('role.id')
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('action_role')
}
