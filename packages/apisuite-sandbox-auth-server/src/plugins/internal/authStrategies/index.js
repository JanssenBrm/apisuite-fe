const config = require('../../../../config')

exports = module.exports = {}

exports.plugin = {
	register: (server)=> {

		server.auth.strategy('session', 'cookie', {
			password: 'AFCx793NAkmyT7CuBykGyvdYfAd2sJMR',
			cookie: config.get('cookie').name,
			redirectTo:'/login',
			appendNext: true,
			isSecure: false,
			validateFunc: async (request, session) => {

				const cached = await server.app.cache.get(session.sid)
				
				const out = {
					valid: !!cached && cached.clientId === request.query.client_id,
				}
								
				if (out.valid) {
					out.credentials = cached
				}

				return out

			},
		})
	},
	name: 'authStrategies',
}
