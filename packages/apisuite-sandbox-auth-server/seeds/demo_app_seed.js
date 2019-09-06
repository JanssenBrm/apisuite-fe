exports.seed = function (knex, Promise) {

	return knex('app').insert([
		{
			name: 'demo-app',
			description: 'demo app',
			client_id: 'aB541dfA',
			client_secret:'sup3rs3cr3t',
			owner_id: 1,
			organization_id:1,
			grant_type: 'authorization_code;client_credentials',
		},
	])
		.then((app_id)=>{
			return new Promise.all([
				knex('app_redirect_url').insert([
					{
						url: 'http://demo_app:3000/cb',
						app_id: app_id,
					},
				]),
				knex('app_container').insert([
					{
						name: 'openbank_demo_org',
						app_id: app_id,
					},
				]),
			])
		})
		.catch((e)=> { return e.message })
}
