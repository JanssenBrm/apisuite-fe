
exports.up = (knex) => {
	return knex.schema.createTable('user_recovery_code', (table) => {
		table.increments('id').primary()
		table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
		table.string('code').notNullable()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('user_recovery_code')
}
