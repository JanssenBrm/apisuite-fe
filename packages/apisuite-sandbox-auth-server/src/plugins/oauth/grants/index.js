const boom = require('boom')
const logger = require('../../../utils/logger')
const oauthSrvc = require('../../../services/oauth')

exports = module.exports = {}

exports.authorization_code = async (request) => {
	const code = request.payload.code
	const redirectUri = request.payload.redirect_uri
	const clientSecret = request.payload.client_secret
	const scope = request.payload.scope
	const clientId = request.payload.client_id
	
	const codeVerifier = request.payload.code_verifier

	let token
	try {
		token = await oauthSrvc.codeExchange(code, clientId, clientSecret, redirectUri, scope, codeVerifier)	
	} catch (error) {
		logger.error(error)
		throw error
	}
	
	
	return token
}

exports.client_credentials = async (request) => {

	let token
	const clientId = request.payload.client_id
	const clientSecret = request.payload.client_secret
	const scope = request.payload.scope

	const validScope = await oauthSrvc.validateScope(clientId, scope)
	if (!validScope.isValid) {
		logger.error(request.id, `Scope is not valid: ${validScope}`)
		throw boom.unauthorized(validScope.message)
	}

	try {
		token = await oauthSrvc.clientCredentials(clientId, clientSecret, scope)
	} catch (error) {
		logger.error(request.id, error)
		throw boom.unauthorized(error.message)
	}
  
	return token
}

exports.refresh_token = async (request) => {
	const refreshToken = request.payload.refresh_token
	let token
	try {
		token = await oauthSrvc.refreshToken(refreshToken)
	} catch (error) {
		logger.error(request.id, error)
		throw boom.unauthorized(error.message)
	}
	return token
}
