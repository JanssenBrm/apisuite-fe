
exports.up = (knex) => {
	return knex.schema.createTable('user_invitation_ticket', (table) => {
		table.increments('id').primary()
		table.integer('organization_id').unsigned().notNullable().references('organization.id').onDelete('CASCADE')
		table.string('invitation_code').notNullable().unique()
		table.string('email').notNullable()
		table.integer('user_id').unsigned().references('user.id').onDelete('CASCADE')
		table.integer('role_id').unsigned().references('role.id').onDelete('CASCADE')
		table.boolean('onboarding').notNullable().defaultTo(false)
		table.timestamp('expiration_date').notNullable()
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('user_invitation_ticket')
}
