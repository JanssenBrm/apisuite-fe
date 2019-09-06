
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('user_two_fa', function (table) {
			table.increments('id').primary()
			table.string('secret').notNullable().unique()
			table.boolean('verified').notNullable().default(false)
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.timestamps()
		}).createTable('two_fa_token', function (table) {
			table.increments('id').primary()
			table.string('token').unique()
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('user_two_fa')
		.dropTableIfExists('two_fa_token')
}
