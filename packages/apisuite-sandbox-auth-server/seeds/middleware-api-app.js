
exports.seed = function (knex, Promise) {

	return knex('app').insert([
		{
			name: 'middleware-api-app',
			description: 'middleware api app',
			client_id: 'e05b6a6c-ac05-42ba-973e-32c9550b84b5',
			client_secret:'3f2dd64f-a2cc-4617-8522-adec7a922669',
			grant_type: 'client_credentials',
		},
	])
		.then((app_id)=>{
			return new Promise.all([
				knex('app_scopes').insert([
					{
						scope: 'internal',
						internal: true,
						app_id: app_id,
					},
				]),
			])
		})
		.catch((e)=> { return e.message })
}
