
exports.up = (knex) => {
	return Promise.all([
		knex.schema.createTable('user_activation_ticket', (table) => {
			table.increments('id').primary()
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.string('activation_code').notNullable().unique()
			table.datetime('expires_at', 6).notNullable()
		}),
		knex.raw('ALTER TABLE `user` ADD `activated` TINYINT(1) NULL DEFAULT 0 AFTER `github_id`;'),
	])
}

exports.down = (knex) => {
	return Promise.all([
		knex.schema.dropTableIfExists('user_activation_ticket'),
		knex.raw('ALTER TABLE `user` DROP `activated`;'),
	])
}
