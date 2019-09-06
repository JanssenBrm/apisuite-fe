const uuid = require('uuid')

exports.up = (knex) => {
	return knex.schema
		.createTable('scope', (table) => {
			table.increments('id').primary()
			table.string('name').notNullable().unique()
		})
		.dropTableIfExists('app_scopes')
		.createTable('app_scope', function(table) {
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
			table.integer('scope_id').unsigned().notNullable().references('scope.id').onDelete('CASCADE')
		})
		.createTable('oauth_access_token_scope', function(table) {
			table.integer('oauth_access_token_id').unsigned().notNullable().references('oauth_access_token.id').onDelete('CASCADE')
			table.integer('scope_id').unsigned().notNullable().references('scope.id').onDelete('CASCADE')
		})
		.createTable('oauth_refresh_token_scope', function(table) {
			table.integer('oauth_refresh_token_id').unsigned().notNullable().references('oauth_refresh_token.id').onDelete('CASCADE')
			table.integer('scope_id').unsigned().notNullable().references('scope.id').onDelete('CASCADE')
		})
		.createTable('oauth_authorization_code_scope', function(table) {
			table.integer('oauth_auth_code_id').unsigned().notNullable().references('oauth_authorization_code.id').onDelete('CASCADE')
			table.integer('scope_id').unsigned().notNullable().references('scope.id').onDelete('CASCADE')
		})
		.then(() => {
			return knex('app')
				.insert({
					name: 'Openbank Middleware API (internal)',
					description: 'Internal client for the Middleware API',
					client_id: uuid.v4(),
					client_secret: uuid.v4(),
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
					grant_type: 'client_credentials',
				})
				.then((appId) => {
					return knex('scope')
						.insert([
							{	name: 'internal' },
							{	name: 'aisp' },
							{	name: 'aisp_extended_transaction_history' },
							{	name: 'pisp' },
							{	name: 'piisp' },
						])
						.then((scopeId) => {
							return knex('app_scope')
								.insert({
									app_id: appId,
									scope_id: scopeId,
								})
						})
				})
		})
}

exports.down = (knex) => {
	return knex.schema.createTable('app_scopes', (table) => {
		table.increments('id').primary()
		table.string('scope').notNullable()
		table.boolean('internal').notNullable().defaultTo(false)
		table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
		table.timestamps()
	})
		.dropTableIfExists('app_scope')
		.dropTableIfExists('oauth_access_token_scope')
		.dropTableIfExists('oauth_refresh_token_scope')
		.dropTableIfExists('oauth_authorization_code_scope')
		.dropTableIfExists('scope')
		.then(() => {
			return knex('app')
				.where('name', 'Openbank Middleware API (internal)')
				.del()
		})
}
