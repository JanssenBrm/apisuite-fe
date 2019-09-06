const oauthSrvc = require('../../services/oauth')
const boom = require('boom')
const uuid = require('uuid/v4')
const Joi = require('joi')
const pre = require('./pre')
const appService = require('../../services/app')
const querystring = require('querystring')
const logger = require('../../utils/logger')

const Grants = require('./grants')

exports = module.exports = {}

exports.login = {
	handler: async (request, h) => {

		const clientId = request.query.client_id

		return h.view('pug/authentication', {
			next: request.query.next,
			err: request.query.err,
			clientId: clientId,
		})
	},
}

exports.authenticate = {
	validate: {
		payload: {
			username: Joi.string().required(),
			password: Joi.string().required(),
			next: Joi.string().allow('').optional(),
		},
	},
	handler: async (request, h) => {
		const next = request.payload.next
		const username = request.payload.username
		const password = request.payload.password

		//parse clientId
		const rawQuery = next.split('?')

		const query = querystring.parse(rawQuery.length > 1 ? rawQuery[1] : rawQuery[0])

		const client = query.client_id || request.query.client_id

		if (!client) {
			logger.error(request.id, 'client_id is missing on the querystring: ', client)
			throw boom.badData('client_id is missing')
		}

		let appContainer, container

		try {
			appContainer = await appService.findAppContainerByClientId(client)
		} catch (error) {
			logger.error(request.id, error)
			throw boom.internal(error.message)
		}

		if (!appContainer) {
			logger.error(request.id, `Container not found: ${appContainer}`)
			throw boom.unauthorized('container not found')
		}

		container = appContainer.name

		if (!container) {
			logger.error(request.id, 'container name cannot be null')
			throw boom.unauthorized('container cannot be null')
		}

		let result
		try {
			result = await oauthSrvc.authenticate(username, password, container, client)
		} catch (error) {
			logger.error(request.id, error)
			throw boom.unauthorized(error.message)
		}

		if (!result || (result && !result.authenticated)) {
			logger.error(request.id, `Not authenticated:  ${result}`)
			return h.redirect('/login?next=' + next + '&err=1')
		}

		const sid = uuid()

		const { user, token, clientId } = result

		await request.server.app.cache.set(sid, { user, clientId, token }, 0)

		request.cookieAuth.set({ sid, user, token, clientId })

		if (next)
			return h.redirect(next).code(302)

		const personalToken = {
			data: token,
		}

		return h.response(personalToken).code(200)
	},
}


exports.authorizeView = {
	auth: {
		mode: 'required',
		strategies: ['authServerToken', 'session'],
	},
	validate: {
		query: {
			client_id: Joi.string().required(),
			redirect_uri: Joi.string().required(),
			response_type: Joi.string().valid('code', 'token').required(),
			scope: Joi.string().required(),
			state: Joi.string().required(),
			code_challenge: Joi.string().allow('', null).optional(),
			code_challenge_method: Joi.string().allow('', null).optional(),
		},
	},
	pre: [
		pre.validateRedirectUri,
		pre.validateScope,
		pre.fetchApp,
	],
	handler: async (request, h) => {

		const clientId = request.query.client_id
		const redirectUri = request.query.redirect_uri
		const scope = request.query.scope
		const state = request.query.state
		const responseType = request.query.response_type

		const codeChallenge = request.query.code_challenge
		const codeChallengeMethod = request.query.code_challenge_method

		const app = request.pre.app

		const authorizationText = request.i18n.__('request-authorization-text')
		const permissionsText = request.i18n.__('permissions')
		const authorizeButton = request.i18n.__('authorize-button-text')
		const rejectButton = request.i18n.__('reject-button-text')
		const authorize = request.i18n.__('authorize')

		const appName = app.name

		const scopes = scope.split(';')

		const scopesText = scopes.map((s) => {
			return `${request.i18n.__(s)}`
		})

		try {
			await oauthSrvc.setStateParameter(state, clientId)
		} catch (error) {
			logger.error(request.id, error)
			throw boom.internal(error)
		}

		return h.view('pug/authorization', {
			clientId,
			redirectUri,
			scope,
			state,
			responseType,
			authorizationText,
			appName,
			permissionsText,
			scopesText: JSON.stringify(scopesText),
			authorizeButton,
			rejectButton,
			authorize,
			codeChallenge,
			codeChallengeMethod,
		})
	},
}

exports.authorize = {
	auth: {
		mode: 'required',
		strategies: ['authServerToken', 'session'],
	},
	validate: {
		payload: {
			redirect_uri: Joi.string().required(),
			scope: Joi.string().required(),
			response_type: Joi.string().valid('code').required(),
			code_challenge: Joi.string().allow('',null).optional(),
			code_challenge_method: Joi.string().allow('',null).optional(),
		},
		query: {
			state: Joi.string().required(),
			client_id: Joi.string().required(),
		},
	},
	pre: [
		pre.validateState,
		pre.validateRedirectUri,
	],
	handler: async (request, h) => {

		logger.debug(request.id, 'Authorize entry point')
		const clientId = request.query.client_id
		const redirectUri = request.payload.redirect_uri
		const scope = request.payload.scope
		const responseType = request.payload.response_type
		const codeChallenge = request.payload.code_challenge
		const codeChallengeMethod = request.payload.code_challenge_method
		
		const auth = request.auth.credentials.user || request.auth.artifacts

		const userId = auth.id || auth.user

		let validScope

		if (responseType === 'code') {
			try {
				validScope = await oauthSrvc.validateScope(clientId, scope)
			} catch (error) {
				logger.error(request.id, error)
				throw boom.internal(error.message)
			}
	

			if (!validScope || (validScope && !validScope.isValid)) throw boom.unauthorized('invalid scope')
			
			logger.debug(request.id, 'Scopes are valid')

			logger.debug(request.id, 'Generating Code')
			try {
				
				const code = await oauthSrvc.generateCode(clientId, userId, scope, codeChallenge, codeChallengeMethod)
				
				return h.redirect(`${redirectUri}?code=${code}&state=${request.pre.state}`).code(302)
			} catch (error) {
				logger.error(error)
				throw boom.internal(error)
			}
		}
	},
}

exports.token = {
	validate: {
		payload: {
			grant_type: Joi.string().valid('authorization_code', 'client_credentials', 'refresh_token').required(),
			code: Joi.string().optional(),
			redirect_uri: Joi.string().optional(),
			client_id: Joi.string().optional(),
			client_secret: Joi.string().optional(),
			scope: Joi.string().optional(),
			refresh_token: Joi.string().optional(),
			code_verifier: Joi.string().allow(null).optional(),
		},
	},
	pre: [
		//pre.validateScope,
		//pre.validateGrant,
	],
	handler: async (request, h) => {

		const grantType = request.payload.grant_type
		const token = await Grants[grantType](request)

		if (!token) {
			logger.error(request.id, 'Unable to exchange token')
			return h.response('Unable to exchange token').code(400)
		}

		return token
	},
}

exports.introspect = {
	validate: {
		payload: {
			token: Joi.string().required(),
		},
	},
	auth: {
		strategy: 'authServerToken',
	},
	handler: async (request) => {
		try {
			const retval = request.auth

			return retval
		} catch (error) {
			logger.error(request.id, error)
			throw boom.internal(error.message)
		}
	},
}

exports.internal = {
	validate: {
		headers: Joi.object().keys({
			'x-client-id': Joi.string().required(),
			'x-client-secret': Joi.string().required(),
			'x-client-scope': Joi.string().required(),
			'x-user-id': Joi.string().required(),
		}).options({ allowUnknown: true }),
	},
	handler: async (request) => {
		try {
			const clientId = request.headers['x-client-id']
			const clientSecret = request.headers['x-client-secret']
			const scope = request.headers['x-client-scope']
			const userId = request.headers['x-user-id']

			const token = await oauthSrvc.internal(clientId, clientSecret, userId, scope)

			return token
		} catch (error) {
			logger.error(request.id, error)
			throw boom.internal(error.message)
		}
	},
}

// Revoke token as specified at https://tools.ietf.org/html/rfc7009
exports.revokeToken = {
	auth: {
		strategy: 'authServerToken',
	},
	validate: {
		payload: {
			token: Joi.string().required(),
			token_type_hint: Joi.string().valid('access_token', 'refresh_token'),
		},
	},
	handler: async (request, h) => {

		const auth = request.auth.credentials.user || request.auth.artifacts
		const userId = auth.id || auth.user

		// check if token belongs to user
		const validatedToken = await oauthSrvc.validateTokenOwnership(request.payload.token, userId)

		// if token no longer exists we already achieved the requirement
		if (!validatedToken.exists) {
			return h.response().code(200)
		}

		if (!validatedToken.isFromUser) {
			// user doesn't have ownership of token
			throw boom.badRequest('invalid_request')
		}

		// remove token
		try {
			await oauthSrvc.revokeToken(request.payload.token, request.payload.token_type_hint)
		} catch(err) {
			// according to spec invalid tokens should not cause an error response look at note in https://tools.ietf.org/html/rfc7009#section-2.2
			logger.error(err, 'Failed to revoke token')
		}

		return h.response().code(200)
	},
	id: 'appcenter-oauth-access-token-revoke',
	tags: ['api'],
}
