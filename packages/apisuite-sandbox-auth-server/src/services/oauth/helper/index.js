const boom = require('boom')
const appService = require('../../../services/app')
const bookshelf = require('../../../utils/bookshelf')
const AuthCode = require('../../../models/AuthorizationCode')
const AuthCodeScope = require('../../../models/AuthorizationCodeScope')
const logger = require('../../../utils/logger')
const bcrypt = require('bcrypt')

exports = module.exports = { }

/**
 * 
 * @param {String} code -
 * @param {String} clientId -
 * @returns { Object } -
 */
const getCode = async (code, clientId) => {
	const authCode = new AuthCode({code: code, client_id: clientId})

	const result = await authCode.fetch({withRelated: ['scopes', 'scopes.scope']})

	return result.toJSON()
}

/**
 * 
 * @param {Number} id - 
 * @returns { Void } - 
 */
const removeCode = async (id) => {
	await new AuthCode({id}).destroy()
}

/**
 * 
 * @param {Array} sourceScopes - The scopes of the original request
 * @param {Array} targetScopes - The scopes of the exchange request
 * @returns { Boolean } - valid or invalid
 */
const checkScopes = (sourceScopes, targetScopes) => {

	let source, target
	
	source = sourceScopes.filter((elem, pos, arr) => {
		return arr.indexOf(elem) === pos
	})

	source = source.sort().join(';')
	target = targetScopes.sort().join(';')

	return source === target
}

/**
 * 
 * @param {String} codeVerifier - 
 * @param {String} codeChallenge -
 * @param {String} method - S256
 * @returns {Boolean} - 
 */
const validateCodeChallenge = (codeVerifier, codeChallenge, method = 'S256') => {
	if (method === 'S256')
		return bcrypt.compare(codeVerifier, codeChallenge)
	else
		return codeVerifier === codeChallenge
}

exports.verifySecurityParams = (secret, verifier) => {
	if (!secret && !verifier) 
		throw boom.badRequest('Client Secret or Challenge Verifier are missing')
}

exports.fetchAuthorizationCode = async (code, clientId) => {

	let authCode

	try {
		logger.debug('checking if code exists')
		authCode = 	await getCode(code, clientId)
	} catch (error) {
		logger.error(`${code} was not found on the database`)
		throw boom.forbidden('Code not found')
	}

	if (!authCode) {
		logger.error('Code was not found on the database')
		throw boom.forbidden('Code not found')
	}

	return authCode
}

exports.validateAuthorizationCode = async (code,scope) => {
	
	logger.debug('Checking if scopes match the original request')

	if (!code.scopes) {
		logger.error('Authorization code has no scopes. This code is invalid.')
		await removeCode(code.id)
		throw boom.badData('Authorization code has no scopes. This code is no longer valid')
	}



	if(!checkScopes(code.scopes.map((s)=>s.scope.name), scope.split(';'))) {
		logger.error('Scopes do not match the original request')
		throw boom.badRequest('Scopes do not match with the original request')
	}

	logger.debug('checking if code is not expired')
	if (new Date().getTime() > new Date(code.expires).getTime()) {
		logger.info(`${code} as expired. Expire date was ${new Date(code.expires)}`)
		await removeCode(code.id)
		throw boom.forbidden('Code has expired')
	}
	
}

exports.validateCodeChallenge = async (verifier, challenge, method) => {
	
	if (!verifier) return

	logger.debug('Validating the code challenge')
	const challengValid = 
		await validateCodeChallenge(verifier, challenge, method)
	if (!challengValid) {
		logger.debug(`Code Verifier does not match the Code Challenge 
			${verifier} !== ${ challenge } using the methos ${method}`)
		throw boom.forbidden('Code Verifier did not pass validation')
	}
	
	return
}

exports.fetchApp = async (clientId, secret ,verifier) => {

	logger.debug('Finding the app to which the code belongs to')

	let app

	if (!verifier){
		logger.debug('Finding app by client secret')
		app = await appService.findClientByCredentials(clientId, secret)
	}
	else {
		logger.debug('Finding app by clientid only. Challenge has been properly verified')
		app = await appService.findClientById(clientId)
	}
	

	if (!app) {
		logger.error('App was not found')
		throw boom.forbidden('Unknown client app')
	}

	return app
}

exports.validateRedirectUrl = async (clientId, redirectUri) => {

	logger.debug('Getting the registred redirect urls')
	const appRedirectUrl = await appService.findRedirectUrl(clientId, redirectUri)

	if (!appRedirectUrl) {
		logger.error('The request redirect url does not match the registred redirect urls')
		throw boom.badRequest('The Redirect Url must match the registred callback url(s)')
	}

}

/**
 * @param {String} clientId - 
 * @returns { Array } -
 */
const getAppScopes = async (clientId) => {
	return await appService.getAppScopes(clientId)
}

exports.getAppScopes = getAppScopes

exports.saveCode = async (options) => {

	const result = await bookshelf.transaction(async (trx)=> {
		logger.debug('Creating Bearer token')
		const authCode = await AuthCode.create({
			code: options.code,
			client_id: options.clientId,
			user_id: options.userId,
			scope: options.scope,
			code_challenge: options.codeChallenge,
			code_challenge_method: options.codeChallengeMethod,
			expires_on: new Date(options.authCodeExpiresOn),
		}, {transacting: trx})

		logger.debug(`Bearer token created, attaching scopes to : ${JSON.stringify(authCode)}`)

		const transformedScopes = options.appScopes.map((scope) => {
			return {
				scope_id: scope.scopeId || scope.scope_id,
				brand: scope.brand,
				name: scope.scope.name,
			}
		})

		const scopeList = options.scope.split(';')

		const scopesToInsert = transformedScopes.reduce((results, s)=> {
			if (scopeList.includes(s.name)) results.push(s)

			return results
		}, [])

		await Promise.all(scopesToInsert.map(async(scope)=> {
			await AuthCodeScope.create({
				oauth_auth_code_id: authCode.get('id'),
				scope_id: scope.scopeId || scope.scope_id,
				brand: scope.brand,
			}, { transacting: trx})
		}))

		logger.debug('scopes attached')
		return authCode.toJSON()
	})

	return result
}
