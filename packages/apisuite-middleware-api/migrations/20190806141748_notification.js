
exports.up = function (knex) {
	return knex.schema.createTable('notification', function (table) {
		table.increments('id').primary()
		table.string('tag').nullable()
		table.string('message').notNullable()
		table.string('link').nullable()
		table.string('author').notNullable()
		table.boolean('public').notNullable().default(false)
		table.boolean('alert').notNullable().default(false)
		table.datetime('scheduled_to', { precision: 6 }).nullable()
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('notification')
}
