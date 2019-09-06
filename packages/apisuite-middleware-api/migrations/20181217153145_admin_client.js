const uuid = require('uuid')
const crypto = require('crypto')

exports.up = (knex) => {
	return knex.schema
		.alterTable('oauth_client', (table) => {
			table.dropColumn('redirect_uri')
		})
		.createTable('scope', (table) => {
			table.increments('id').primary()
			table.string('name').notNullable()
		})
		.createTable('user_scope', (table) => {
			table.integer('user_id').unsigned().notNullable().references('user.id').onDelete('CASCADE')
			table.integer('scope_id').unsigned().notNullable().references('scope.id').onDelete('CASCADE')
		})
		.dropTableIfExists('oauth_approved_client')
		.dropTableIfExists('oauth_refresh_token')
		.dropTableIfExists('oauth_login')
		.dropTableIfExists('oauth_authorization_code')
		.dropTableIfExists('account_user')
		.dropTableIfExists('account')
		.then(() => {
			return Promise.all([
				knex('scope').insert({ name: 'admin' }),
				knex('oauth_client').insert({
					client_id: uuid.v4(),
					client_secret: crypto.randomBytes(32).toString('hex'),
					name: 'Openbank ADMIN Client',
					description: 'Openbank admin client',
					grant_types: 'password',
					trusted: true,
					make_token: true,
					scope: 'admin',
				}),
				knex('user').insert({
					email: 'goska@cloudoki.com',
					password: '$2a$10$ShYxz967LnusRuE50JO6TufYYXgWjLS5aU8gVSLtlGlpQkMSNKblW',
					full_name: 'Gosia Trojanowska',
					activated: '1',
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				}),
			])
				.then((res) => {
					return knex('user_scope').insert({
						scope_id: res[0],
						user_id: res[2],
					})
				})
		})
}

exports.down = (knex) => {
	return knex.schema
		.alterTable('oauth_client', (table) => {
			table.string('redirect_uri')
		})
		.dropTableIfExists('user_scope')
		.dropTableIfExists('scope')
		.createTable('oauth_approved_client', (table) => {
			table.increments('id').primary()
			table.string('client_id').references('oauth_client.client_id')
			table.integer('user_id').unsigned().references('user.id').onDelete('CASCADE')
			table.timestamps()
		})
		.createTable('oauth_refresh_token', (table) => {
			table.increments('id').primary()
			table.string('refresh_token').notNullable().unique()
			table.timestamp('expiration_date').notNullable()
			table.string('scope')
			table.string('client_id').references('oauth_client.client_id')
			table.integer('user_id').notNullable().unsigned().references('user.id').onDelete('CASCADE')
			table.timestamps()
		})
		.createTable('oauth_login', (table) => {
			table.increments('id').primary()
			table.timestamp('expiration_date').notNullable()
			table.string('token').notNullable()
			table.integer('user_id').unsigned().references('user.id').onDelete('CASCADE')
			table.timestamps()
		})
		.createTable('oauth_authorization_code', function (table) {
			table.increments('id').primary()
			table.string('authorization_code').notNullable().unique()
			table.string('redirect_uri')
			table.timestamp('expiration_date').notNullable()
			table.string('scope')
			table.string('client_id').references('oauth_client.client_id')
			table.integer('user_id').notNullable().unsigned().references('user.id').onDelete('CASCADE')
			table.timestamps()
		})
		.createTable('account', (table) => {
			table.increments('id').primary()
			table.string('name')
			table.string('url')
			table.string('vat')
			table.string('api_version')
			table.timestamps()
		})
		.createTable('account_user', (table) => {
			table.integer('account_id').notNullable().unsigned().references('account.id')
			table.integer('user_id').notNullable().unsigned().references('user.id')
			table.unique(['user_id', 'account_id'])
			table.timestamps()
		})
		.then(() => {
			return Promise.all([
				knex('oauth_client').where({ name: 'Openbank ADMIN Client' })
					.del(),
				knex('user').where({ email: 'goska@cloudoki.com' })
					.del(),
			])
		})
}
