
const paths = [
	{
		method: 'POST',
		path: '/accreditation',
	},
	{
		method: 'PUT',
		path: '/consents',
	},
	{
		method: 'POST',
		path: '/v1/funds-confirmations',
	},
	{
		method: 'GET',
		path: '/healthcheck',
	},
	{
		method: 'GET',
		path: '/info/swagger',
	},
	{
		method: 'POST',
		path: '/auth/psu',
	},
	{
		method: 'POST',
		path: '/admin/psus',
	},
	{
		method: 'GET',
		path: '/admin/psus',
	},
	{
		method: 'GET',
		path: '/admin/psus/*',
	},
	{
		method: 'PUT',
		path: '/admin/psus/*',
	},
	{
		method: 'GET',
		path: '/admin/psus/accounts',
	},
	{
		method: 'GET',
		path: '/admin/accounts/*/transactions',
	},
	{
		method: 'GET',
		path: '/trusted-beneficiaries',
	},
]

exports.up = function (knex, promise) {
	return knex.schema.createTable('endpoint_whitelist', function (table) {
		table.increments('id').primary()
		table.string('method').notNullable()
		table.string('path').notNullable()
		table.timestamps()
	}).then(function () {
		return promise.map(paths, (path) => knex('endpoint_whitelist').insert(path))
	})
}

exports.down = function (knex) {
	return knex.schema
		.dropTableIfExists('endpoint_whitelist')
}
