
exports.up = function (knex) {
	return knex.schema.createTable('account', function (table) {
		table.increments('id').primary()
		table.string('name')
		table.string('url')
		table.string('vat')
		table.string('api_version')
		table.timestamps()
	}).createTable('account_user', function (table) {
		table.integer('account_id').notNullable().unsigned().references('account.id')
		table.integer('user_id').notNullable().unsigned().references('user.id')
		table.unique(['user_id', 'account_id'])
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('account_user').dropTableIfExists('account')
}
