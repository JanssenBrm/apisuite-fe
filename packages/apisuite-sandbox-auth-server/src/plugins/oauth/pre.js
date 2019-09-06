exports = module.exports = {}
const boom = require('boom')
const oauthService = require('../../services/oauth')
const appService = require('../../services/app')
const logger = require('../../utils/logger')

exports.validateState = {
	method: async (request) => {
		
		let incomingState = request.query.state
		logger.debug(request.id, `Validating incoming state ${incomingState}`)

		// state param is missing from the payload or the query
		if(!incomingState) {
			logger.error('state is missing on the querystring')
			throw boom.badData('state param is missing')
		}

		logger.debug(request.id, 'Getting the persisted state')
		const initialState = await oauthService.getStateParameter(incomingState, request.query.client_id)
		logger.debug(request.id, 'Retrieved persisted state. Checking if it null')
		// this means there were no redirects rendering the state parameter unnecessary
		if(!initialState || (initialState.constructor === Object && Object.keys(initialState).length === 0)) {
			logger.debug(request.id, 'State was not persisted, proceeding with incoming state')
			return incomingState
		}

		// compares the state value
		if (incomingState !== initialState) {
			logger.error(request.id, 'invalid state')
			throw boom.badData('invalid state')
		}
		
		logger.debug(request.id, `State is valid: ${initialState}`)
		return initialState
	},
	assign: 'state',
	failAction: 'error',
}
exports.validateScope = {
	method: async (request) => {
		
		const clientId = request.query.client_id || request.payload.client_id
		const scope = request.query.scope || request.payload.scope || ''

		await oauthService.validateScope(clientId, scope)

		return null
	},
}
exports.validateGrant = {
	method: async (request) => {
		const grantType = request.payload.grant_type || request.query.grant_type
		const clientId = request.payload.client_id || request.query.client_id

		const validGrant = await oauthService.validateGrantType(clientId, grantType)
		if (validGrant && !validGrant.isValid) {
			logger.error(request.id,`grant is not valid: ${JSON.stringify(validGrant)}`)
			throw boom.unauthorized(validGrant.message)
		}

		return null
	},
}
exports.fetchApp = {
	assign: 'app',
	failAction: 'error',
	method: async (request) => {
		
		const clientId = request.query.client_id

		let app
		try {
			app = await appService.getAppByClientId(clientId)
		} catch (error) {
			logger.error(request.id,error)
			throw boom.internal(error.message)
		}

		if (!app) throw boom.unauthorized('unable to find client')

		return app
	},
}
exports.validateRedirectUri = {

	method: async (request) => {

		const clientId = request.query.client_id || request.payload.client_id
		const redirectUri = request.query.redirect_uri || request.payload.redirect_uri

		logger.debug('Getting the registred redirect urls')
		const appRedirectUrl = await appService.findRedirectUrl(clientId, redirectUri)
	
		if (!appRedirectUrl) {
			logger.error('The request redirect url does not match the registred redirect urls')
			throw boom.badRequest('The Redirect Url must match the registred callback url(s)')
		}

		return null
	},
	
}
