exports.up = (knex) => {
	return knex.schema.createTable('onboarding_token', function (table) {
		table.increments('id').primary()
		table.string('token').notNullable().unique()
		table.timestamp('expiration_date').notNullable()
		table.integer('user_id').notNullable().unsigned().references('user.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('onboarding_token')
}
