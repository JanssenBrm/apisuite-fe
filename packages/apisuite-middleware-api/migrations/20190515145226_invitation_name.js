exports.up = (knex) => {
	return knex.schema
		.alterTable('user_invitation_ticket', (table) => {
			table.string('user_name').nullable().after('user_id')
		})
		.alterTable('user_registration_ticket', (table) => {
			table.integer('invitation_id').unsigned().nullable().references('user_invitation_ticket.id').onDelete('CASCADE').after('id')
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('user_invitation_ticket', (table) => {
			table.dropColumn('user_name')
		})
		.alterTable('user_registration_ticket', (table) => {
			table.dropColumn('invitation_id')
		})
}
