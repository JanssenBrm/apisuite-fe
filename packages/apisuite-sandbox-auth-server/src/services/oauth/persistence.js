const AuthToken = require('../../models/AccessToken')
const AuthTokenScope = require('../../models/AccessTokenScope')
const RefreshTokenScope = require('../../models/RefreshTokenScope')
const AuthCode = require('../../models/AuthorizationCode')
const RefreshToken = require('../../models/RefreshToken')
const State = require('../../models/State')
const bookshelf = require('../../utils/bookshelf')
const logger = require('../../utils/logger')
const Boom = require('boom')
const helper = require('./helper')

const App = require('../../models/App')
const uuid = require('uuid/v4')
const config = require('../../../config')

exports = module.exports = {}

exports.getTokenHierarchy = async (token) => {

	const authToken = new AuthToken({token})

	const tokenHierarchy = await authToken.fetch({withRelated: ['app','app.container']})

	const t = tokenHierarchy
	const app = tokenHierarchy.related('app')
	const container = app.related('container')
	return {
		token: t.toJSON(),
		app: app.toJSON(),
		container: container.toJSON(),
	}
}

exports.getBearerWithScopes = (token) => {
	return AuthToken.findOne({ token }, {
		withRelated: ['scopes', 'scopes.scope'],
		require: false,
	})
}

exports.saveToken = async (client_id, user_id, scopes) => {

	const accessToken = uuid()
	const refreshToken = uuid()
	const currentTime = new Date().getTime()

	const accessTokenExpiresOn = currentTime + (config.get('authOptions').accessToken.ttl || 1000 * 60 * 30)
	const refreshTokenExpiresOn = currentTime + (config.get('authOptions').refreshToken.ttl || 1000 * 60 * 60 * 24 * 7)

	const tokenRes = await bookshelf.transaction(async (trx) => {
		const token = await AuthToken.create({
			token: accessToken, client_id, user_id, expires_on: new Date(accessTokenExpiresOn),
		},{transacting: trx})


		await Promise.all(scopes.map(async(scope)=> {
			await AuthTokenScope.create({
				oauth_access_token_id: token.get('id'),
				scope_id: scope.scopeId || scope.scope_id,
				brand: scope.brand,
			}, { transacting: trx})
		}))

		return token.toJSON()
	})

	const refreshRes = await bookshelf.transaction(async (trx)=> {
		const token = await RefreshToken.create({
			token: refreshToken, client_id, user_id, expires_on: new Date(refreshTokenExpiresOn),
		}, {transacting: trx})

		await Promise.all(scopes.map(async(scope)=> {
			await RefreshTokenScope.create({
				oauth_refresh_token_id: token.get('id'),
				scope_id: scope.scopeId || scope.scope_id,
				brand: scope.brand,
			}, { transacting: trx})
		}))

		return token.toJSON()
	})

	const expiresIn = (tokenRes.expires.getTime() - new Date().getTime()) / 1000

	const retVal = {
		token_type: 'bearer',
		token: tokenRes.token,
		expires_in: Math.ceil(expiresIn),
		expires: tokenRes.expires,
		refresh: refreshRes.token,
	}

	return retVal

}

exports.checkIfCodeExistsAndRemove = async (clientId, userId) => {
	const query = new AuthCode({client_id: clientId, user_id: userId})
	logger.debug(`Checking if code already exists for the client ${clientId} and user ${userId}`)

	try {

		const existingCode = await query.fetchAll()
		if (existingCode.length > 0) {
			logger.debug('Code already exists. Removing it')

			await Promise.all(existingCode.map(c => {
				return c.destroy()
			}))
		}

	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}

}

exports.saveCode = async (code, clientId, userId, scope, codeChallenge, codeChallengeMethod) => {
	logger.debug('[Method saveCode]: Saving code')
	const currentTime = new Date().getTime()
	const authCodeExpiresOn = currentTime + (config.get('authOptions').authorizationCode.ttl || 1000 * 60 * 5)

	logger.debug(`Setting code expiration date to ${authCodeExpiresOn}`)

	const scopeList = scope.split(';')
	logger.debug('Intersecting incoming scopes')

	const appScopes = await helper.getAppScopes(clientId)

	const flatAppScopes = appScopes.map(elem => elem.scope.name)

	const isValid =	scopeList.every(elem => flatAppScopes.includes(elem))

	if (!isValid) {
		logger.error(`Scopes are invalid for client_id ${clientId}`)
		throw Boom.badRequest(`Scopes are invalid for client_id ${clientId}`)
	}


	const result = helper.saveCode({
		code,
		clientId,
		userId,
		scope,
		codeChallenge,
		codeChallengeMethod,
		authCodeExpiresOn,
		appScopes,

	})

	logger.debug(`Bearer token and scopes created ${JSON.stringify(result)}`)
	return result

}

exports.getCode = async (code, clientId) => {

	const authCode = new AuthCode({code: code, client_id: clientId})

	const result = await authCode.fetch({withRelated: ['scopes']})

	return result.toJSON()

}

exports.removeCode = async (id) => {
	await new AuthCode({id}).destroy()
}

exports.getRefreshToken = async (token) => {

	const refreshToken = new RefreshToken({token})

	const t = await refreshToken.fetch({
		withRelated: 'scopes',
	})

	if (!t) return t

	const ts = t && t.toJSON ? t.toJSON() : t
	const scopes = t.related('scopes').toJSON()
		.map(scp => scp.name)
	ts.scopes = scopes

	return ts
}

exports.removeRefreshToken = async (token) => {
	const refreshToken = RefreshToken.forge().where({token})
	return await refreshToken.destroy()
}

exports.removeAccessToken = async (token) => {
	const accessToken = AuthToken.forge().where({token})
	return await accessToken.destroy()
}

exports.validateScope = async (clientId, scope) => {

	const app = await App.findOne({ client_id: clientId}, {
		withRelated: ['scopes', 'scopes.scope'],
		require: false,
	})

	if (!app)
		return { isValid: false, message: 'Client not found' }

	const appScopes = app.related('scopes').toJSON()
		.map(elem => elem.scope.name)

	const isValid =	scope.every(elem => appScopes.includes(elem))

	if (!isValid)
		return { isValid: false, message: 'Scope not allowed' }

	return { isValid: true }
}

exports.validateGrantType = async (clientId, grantType) => {
	try {
		const app = await new App({ client_id : clientId}).fetch()

		if(!app || !app.toJSON()) {
			return { isValid: false, message: 'client not found' }
		}

		const validGrants = app.toJSON().grants

		return {isValid: validGrants.includes(grantType), message: null}

	} catch (error) {
		return {isValid: false, message: error.message}
	}
}

exports.removeExpiredTokens = () => {
	return Promise.all([
		AuthToken.deleteAllExpired(),
		RefreshToken.deleteAllExpired(),
		AuthCode.deleteAllExpired(),
		State.deleteAllExpired(),
	])
}

exports.setStateParameter = async (state, clientId) => {

	const s = await new State({state, client_id: clientId}).fetch({require: false})
	if (s) {
		s.destroy()
	}

	return await State.create({
		state,
		client_id: clientId,
		expires_on: new Date(new Date().getTime() + 1000 * 60),
	})

}

exports.getStateParameter = (state, clientId) => {
	return new State({state: state, client_id: clientId}).fetch()
}
