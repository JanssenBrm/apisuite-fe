const psuService = require('../../services/psu')
const appService = require('../../services/app')
const boom = require('boom')
const uuid = require('uuid/v4')

const persistence = require('./persistence')

const logger = require('../../utils/logger')

const helper = require('./helper')

exports = module.exports = {}

/**
 * 
 * @param {Array} sourceScopes - The scopes of the original request
 * @param {Array} targetScopes - The scopes of the exchange request
 * @returns { Boolean } - valid or invalid
 */
const checkScopes = (sourceScopes, targetScopes) => {

	let source, target
	
	source = sourceScopes.sort().join(';')
	target = targetScopes.sort().join(';')

	return source === target
}

exports.checkScopes = checkScopes

/**
 *
 * @param {String} username - the username of the psu
 * @param {String} password - the password of the psu
 * @param {String} container - container name where the psu should be fetch
 * @returns {Object} - The PSU object
 */
const validate = async (username, password, container)  => {

	const psu = await psuService.validatePsu(username, password, container)

	if (!psu) throw boom.unauthorized()

	return psu
}

exports.validate = validate

/**
 *
 * @param {String} client_id -
 * @param {Number} user_id -
 * @param {Array} scopes -
 * @returns {Object} - Access Token object
 */
const generateToken = async (client_id, user_id, scopes) => {

	try {

		const result = await persistence.saveToken(client_id, user_id, scopes)

		return result

	} catch (error) {
		throw boom.internal(error.message)
	}

}

exports.generateToken = generateToken

exports.authenticate = async (username, password, container, clientId) => {

	let result
	try {
		result = await validate(username, password, container)
	} catch (error) {
		return { authenticated : false, user: null }
	}

	if (!result) return { authenticated : false, user: null }

	if (result.statusCode === 403 || result.statusCode === 401) {
		return { authenticated: false, user: null}
	}

	const appScopes = await appService.getAppScopes(clientId)

	const token = await generateToken(clientId, result.psu.id, appScopes)

	return { authenticated: result.authenticated , user: result.psu, token: token, clientId: clientId }
}

exports.generateCode = async (clientId, userId, scope, codeChallenge, codeChallengeMethod) => {

	try {
		const token = uuid()
		logger.debug(`Saving code : ${token}`)
		
		await persistence.checkIfCodeExistsAndRemove(clientId,userId)
		
		const result = await persistence.saveCode(token, clientId, userId, scope, codeChallenge, codeChallengeMethod)

		logger.debug(`Saved code: ${result.code}`)
		return result.code

	} catch (error) {
		logger.error(error)
		throw boom.internal(error.message)
	}

}


exports.validateToken = async (token) => {
	const tokenHierarchy = await persistence.getTokenHierarchy(token)

	if (!tokenHierarchy) throw boom.forbidden('Invalid Token')

	return {

		token: tokenHierarchy.token.token,
		scope: tokenHierarchy.token.scope,
		clientId: tokenHierarchy.token.clientId,
		userId: tokenHierarchy.token.userId,
		container: tokenHierarchy.container.name,

	}
}

exports.codeExchange = async (code, clientId, clientSecret,redirectUri, scope, verifier) => {

	helper.verifySecurityParams(clientSecret, verifier)

	logger.debug('Exchanging code for bearer token')

	const authCode = await helper.fetchAuthorizationCode(code, clientId)

	await helper.validateAuthorizationCode(authCode, scope)
	
	await helper.validateCodeChallenge(verifier, authCode.codeChallenge, authCode.codeChallengeMethod)
	
	const app = await helper.fetchApp(clientId, clientSecret, verifier)
	
	await helper.validateRedirectUrl(clientId, redirectUri)

	const transformedScopes = authCode.scopes.map((scope) => {
		return {
			scope_id: scope.scopeId,
			brand: scope.brand,
			name: scope.scope.name,
		}
	})

	const scopeList = scope.split(';')

	const scopesToInsert = transformedScopes.reduce((results, s)=> {
		if (scopeList.includes(s.name)) results.push(s)

		return results
	}, [])


	try {
		logger.debug('Generating Access Token now.')
		const accessToken = await generateToken(clientId, authCode.userId, scopesToInsert)
		logger.debug('Removing the exchange code')
		await persistence.removeCode(authCode.id)
		logger.debug('Creating an accreditation for this access token')
		await psuService.createAccreditation(clientId, app.clientSecret, authCode.userId, scope)
		logger.debug('Accreditation was created successfuly')
		logger.debug(`Access token: ${accessToken}`)
		return accessToken

	} catch (error) {
		logger.error(error)
		await persistence.removeCode(authCode.id)
		throw boom.internal(error.message)
	}
}

exports.clientCredentials = async (clientId, clientSecret, scope) => {

	try {

		// scope needs to be part of the filter too
		// we need to create a table to relate the app and its scopes

		const app = await appService.findClientByCredentials(clientId, clientSecret)

		if (!app) {
			throw boom.forbidden('Unknown client app')
		}

		const appScopes = app.scopes.toJSON()

		const transformedScopes = appScopes.map((scope) => {
			return {
				scope_id: scope.scopeId,
				brand: scope.brand || null,
				name: scope.scope.name,
			}
		})

		const scopeList = scope.split(';')


		const scopesToInsert = transformedScopes.reduce((results, s)=> {
			if (scopeList.includes(s.name)) results.push(s)

			return results
		}, [])

		const accessToken = await generateToken(clientId, app.ownerId, scopesToInsert)

		return accessToken
	} catch (error) {
		throw boom.internal(error)
	}

}

exports.refreshToken = async (token) => {
	const refreshToken = await persistence.getRefreshToken(token)

	if (!refreshToken) throw boom.forbidden('invalid refresh token')

	const user_id = refreshToken.userId
	const client_id = refreshToken.clientId
	const scopes = refreshToken.scopes

	if (new Date().getTime() > new Date(refreshToken.expires).getTime()) {
		throw boom.forbidden('token has expired')
	}

	await persistence.removeRefreshToken(token)


	const transformedScopes = scopes.map((scope) => {
		return {
			scope_id: scope.scopeId,
			brand: scope.brand,
			name: scope.scope.name,
		}
	})

	const accessToken = await generateToken(client_id, user_id, transformedScopes)

	return accessToken
}

exports.tokenIntrospection = async (token) => {
	const t = await persistence.getTokenHierarchy(token)

	if(!t) throw boom.forbidden('invalid token')

	if (new Date().getTime() > new Date(t.token.expires).getTime()) {
		//await persistence.removeAccessToken(token)
		throw boom.forbidden('token has expired')
	}

	const expiresIn = (t.token.expires - new Date().getTime()) / 1000

	return {
		token: t.token.token,
		expires: t.token.expires,
		expires_in: Math.ceil(expiresIn),
		scope: t.token.scope,
		clientId: t.token.clientId,
		userId: t.token.userId,
	}


}

exports.internal = async (clientId, clientSecret, userId, scope) => {

	try {
		const app = await appService.findClientByCredentials(clientId, clientSecret)

		if(!app) {
			return {
				isValid: false,
			}
		}

		return {
			isValid: true,
			credentials: {
				clientId: clientId,
				userId: userId,
				scope: scope,
			},
		}

	} catch (error) {
		return {
			isValid: false,
		}
	}

}

exports.validateScope = async (clientId, scope) => {
	const scopes = scope.split(';')
	let valid
	try {

		valid = await persistence.validateScope(clientId, scopes)
	} catch (error) {
		throw boom.internal(error.message)
	}

	if (!valid) throw boom.badData('invalid scope')

	return valid
}

exports.validateGrantType = async (clientId, grantType) => {
	try {
		return await persistence.validateGrantType(clientId, grantType)
	} catch (error) {
		throw boom.internal(error.message)
	}
}

exports.validateBearerToken = async (token) => {
	const storedToken = await persistence.getBearerWithScopes(token)

	// If token not present or is expired
	if (!storedToken || (new Date().getTime() >= new Date(storedToken.get('expires_on')).getTime()))
		return

	return storedToken
}

exports.removeExpiredTokens = async () => {
	await persistence.removeExpiredTokens()
}

exports.setStateParameter = async (state, clientId) => {
	await persistence.setStateParameter(state, clientId)
}

exports.getStateParameter = async (state, clientId) => {
	const result = await persistence.getStateParameter(state, clientId)
	return result ? result.get('state') : null
}

exports.validateTokenOwnership = async (token, userId) => {
	const validatedToken = {
		exists: true,
		isFromUser: true,
	}
	const storedToken = await persistence.getBearerWithScopes(token)
	const storedRefreshToken =  await persistence.getRefreshToken(token)

	if (!storedToken && !storedRefreshToken) {
		// token no longer exists
		validatedToken.exists = false
		return validatedToken
	}

	if (storedToken) {
		validatedToken.isFromUser = storedToken.get('user_id') === userId
		return validatedToken
	} else {
		validatedToken.isFromUser = storedRefreshToken.userId === userId
		return validatedToken
	}
}

/**
 * Allow promise all to be resolved by catching the error beforehand
 *
 * @param {Promise} prom Promise to resolve
 * @returns {Promise} Resolved promise with status
 */
const reflect = (prom) => prom.then((res) => ({ res, status: 'resolved' }), (rej) => ({ rej, status: 'rejected' }))

exports.revokeToken = async (token, tokenType) => {
	if (tokenType === 'access_token') {
		return await persistence.removeAccessToken(token)
	} else if (tokenType === 'refresh_token') {
		return await persistence.removeRefreshToken(token)
	} else {
		return await Promise.all([persistence.removeAccessToken(token), persistence.removeRefreshToken(token)].map(reflect))
	}
}
