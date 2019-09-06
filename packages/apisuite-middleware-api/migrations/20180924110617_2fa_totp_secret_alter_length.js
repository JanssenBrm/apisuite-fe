exports.up = (knex) => {
	return knex.schema.raw('alter table user_registration_ticket modify column totp_secret varchar(255)')
}

exports.down = (knex) => {

	return Promise.all([
		knex.schema.alterTable('user_registration_ticket', (table) => {
			table.dropColumn('totp_secret')
		}),
		knex.schema.alterTable('user_registration_ticket', (table) => {
			table.string('totp_secret',60)
		}),
	])
}

