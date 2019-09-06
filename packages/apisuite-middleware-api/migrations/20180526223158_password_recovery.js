
exports.up = function (knex) {
	return Promise.all([
		knex.schema.createTable('password_recovery', function (table) {
			table.increments('id').primary()
			table.string('token').unique()
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.timestamps()
		}),
	])
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('password_recovery')
}
