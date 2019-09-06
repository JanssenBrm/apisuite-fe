exports.up = (knex) => {
	return knex.schema.alterTable('user_invitation_ticket', (table) => {
		table.date('postpone_for').nullable().after('expiration_date')
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('user_invitation_ticket', (table) => {
		table.dropColumn('postpone_for')
	})
}
