exports.up = (knex) => {
	return knex.schema.alterTable('user_registration_ticket', (table) => {
		table.string('totp_secret',60)
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('user_registration_ticket', (table) => {
		table.dropColumn('totp_secret')
	})
}
