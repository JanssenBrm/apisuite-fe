
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('user', function (table) {
			table.increments('id').primary()
			table.string('email').notNullable().unique()
			table.string('password')
			table.string('first_name').notNullable()
			table.string('last_name').notNullable()
			table.string('avatar')
			table.string('phone_number')
			table.integer('github_id').unsigned().unique()
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('user')
}
