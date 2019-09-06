const authService = require('../../../services/auth')
const boom = require('boom')
const logger = require('../../../utils/logger')


exports = module.exports = {}

exports.plugin = {
	register: (server) => {

		server.auth.strategy('internal', 'internal-token', {
			validate: async (request, credentials) => {
				try {
					
					const clientId = credentials.clientId
					const clientSecret = credentials.clientSecret
					const scope = credentials.scope
					const userId = credentials.userId

					const result = await authService.validateInternalToken(clientId, clientSecret, userId, scope)
					return { isValid: true, credentials: { clientId: result.credentials.clientId , userId: result.credentials.userId, scope: result.credentials.scope }, artifacts: {}}
				} catch (error) {
					logger.error(error)
					return { isValid: false, credentials: {}, artifacts: {}}
				}
				
			},
		})

		server.auth.strategy('bearerToken', 'bearer-access-token', {
			validate: async (request, token) => {
				try {

					const brand = request.query.brand

					if (!brand) {
						logger.error('Brand must be present in the request querystring')
						throw boom.badRequest('Brand must be present in the request querystring')
					}

					const result = await authService.tokenIntrospect(token, brand)
					
					if (!result.isAuthenticated) throw boom.unauthorized()

					const { scope } = result.credentials
					const { client, user } = result.artifacts

					if ( !client || !scope ) {
						return {isValid: false, credentials: {}, artifacts: {}}
					}
					return { isValid: true, credentials: { token, scope}, artifacts: { userId : user, clientId: client} }
				} catch (error) {
					logger.error(error)
					return {isValid: false, credentials: {}, artifacts: {}}
				}
			},
		})
	},
	name: 'internal-strategy',
}
