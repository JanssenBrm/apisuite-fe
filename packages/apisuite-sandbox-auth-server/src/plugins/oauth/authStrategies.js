const oauthSrvc = require('../../services/oauth')
const logger = require('../../utils/logger')
const Boom = require('boom')

exports = module.exports = {}

exports.bearerToken = {
	validate: async (request, token) => {
		let storedToken
		const brand = request.query.brand

		try {
			storedToken = await oauthSrvc.validateBearerToken(token)
		} catch (error) {
			logger.error(error, `${request.id}: Failed to validate the access token`)
			throw Boom.internal(error)
		}

		if (!storedToken) {
			logger.error(request.id, 'Stored Token not found or expired')
			return { isValid: false, credentials: {}, artifacts: {}}
		}

		const tokenScopes = storedToken.related('scopes').toJSON()

		const scope = tokenScopes.reduce((results, scp) => {
			// no brand in the querystring AND the scope is internal
			if ((!scp.brand && scp.scope.name === 'internal') || scp.scope.name === 'internal') results.push(scp.scope.name)
			// brand in the querystring and matches the token scope and its not internal scope
			if (scp.brand && scp.brand === brand && scp.scope.name !== 'internal') results.push(scp.scope.name)

			return results
		}, [])

		return { isValid: true, credentials: { token, scope }, artifacts: { user: storedToken.toJSON().userId, client: storedToken.toJSON().clientId } }
	},
}
