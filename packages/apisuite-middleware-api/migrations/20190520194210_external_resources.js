exports.up = function (knex) {
	return knex.schema.createTable('github_app', function (table) {
		table.increments('id').primary()
		table.string('app_id').notNullable().unique()
		table.string('account').notNullable()
		table.string('source_account').notNullable()
		table.mediumtext('private_key').notNullable()
		table.timestamps()
	}).createTable('external_resource', function (table) {
		table.increments('id').primary()
		table.integer('repo_id').unique()
		table.string('name').notNullable()
		table.string('description').notNullable()
		table.string('url').notNullable()
		table.string('commit_sha').notNullable()
		table.string('commit_url').notNullable()
		table.timestamps()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('external_resource')
}
