exports.up = (knex) => {
	return knex.schema.createTable('activity_log', (table) => {
		table.increments('id').primary()
		table.string('action').notNullable()
		table.integer('user_id').notNullable()
		table.integer('organization_id').notNullable()
		table.string('additional_info')
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('activity_log')
}
