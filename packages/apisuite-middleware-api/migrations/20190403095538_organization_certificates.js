
exports.up = (knex) => {
	return knex.schema.createTable('organization_certificates', (table) => {
		table.increments('id').primary()
		table.mediumtext('cert')
		table.mediumtext('key')
		table.string('algorithm').default('RS256')
		table.datetime('expiration_date')
		table.integer('organization_id').notNullable().unsigned().references('organization.id').onDelete('CASCADE')
		table.timestamps()
	})
}

exports.down = (knex) => {
	return knex.schema.dropTableIfExists('organization_certificates')
}
