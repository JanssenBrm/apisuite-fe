
exports.up = (knex) => {
	return knex.schema.createTable('user_registration_ticket', (table) => {
		table.increments('id').primary()
		table.string('registration_code').notNullable().unique()
		table.string('email')
		table.string('full_name')
		table.string('phone_number')
		table.integer('github_id').unsigned()
		table.string('ip_address')
		table.datetime('expires_at', 6).notNullable()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('user_registration_ticket')
}
