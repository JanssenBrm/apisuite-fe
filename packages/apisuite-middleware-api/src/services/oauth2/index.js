const boom = require('boom')
const config = require('../../config')
const dbMethods = require('./db_methods')
const validate = require('./validate')
const expiresIn = config.get('oauth2').token_expiresIn
const userSrvc = require('../user')
const uuid = require('uuid/v4')
const utils = require('./utils')

const OauthAccessToken = require('../../models/OauthAccessToken')

exports = module.exports = {}

exports.flows = require('./flows')

/**
 * Revoke a access token or refresh token
 * @param		{object}	token	-
 * @returns	{boolean}				-
 */
exports.revokeToken = async (token) => await OauthAccessToken.destroyByAccessToken(utils.decode(token).jti)

/**
 * Validates a bearer token
 *
 * @async
 * @param		{String}	token			- Token to validate
 * @throws	{Error}							-	Throws an error if token is not found or is expired
 * @returns	{OauthAccessToken}	- Returns an OauthAccessToken model
 */
exports.validateBearerToken = async (token) => {

	// verify token
	const decodedToken = utils.verifyToken(token)

	// If not found, will be thrown
	let foundToken = await OauthAccessToken.findOne({ access_token: decodedToken.jti }, {
		withRelated: ['user'],
	})

	// Check if token is expired
	if (new Date() > foundToken.get('expiration_date'))
		throw new Error('Token is expired')

	// get user roles
	const roles = await userSrvc.getRolesByUser(foundToken.related('user').get('id'))
	
	// Return attached user
	return {
		token: foundToken,
		roles,
	}
}

exports.validateRecoveryToken = async (token) => {

	const t = await dbMethods.recoverPassword.getByToken(token)

	if (t.length === 0) {
		throw boom.unauthorized()
	}

	if (new Date(t[0].created_at).getTime() + (12 * 60 * 60 * 1000) < Date.now()) {

		await dbMethods.recoverPassword.deleteByToken(token)

		throw boom.unauthorized()

	}

	const user = await userSrvc.getByID(t[0].user_id)

	return { user: userSrvc.present(user) }

}

exports.generateRecoveryToken = async (email) => {

	const token = uuid()

	const user = await userSrvc.getByEmail(email)

	if (!user) {
		throw boom.badRequest()
	}

	await dbMethods.recoverPassword.save(user.id, token)

	return token

}

/**
 * generate access tokens for github login and 2FA.
 * @param		{Number}	userID				-
 * @returns	{object} 								-
 */
exports.generateTokenNoPass = async (userID) => {

	const tokens = await validate.generateTokens({
		userID: userID,
		refresh: true,
	})

	if (tokens.length === 1) {
		return { token: tokens[0], refreshToken: null, expiresIn: expiresIn, state: '' }
	}

	return { token: tokens[0], refreshToken: tokens[1], expiresIn: expiresIn, state: '' }

}

exports.validate2FAtoken = async (token) => {

	const t = await dbMethods.token2FA.getByToken(token)

	if (t.length === 0) {
		throw boom.unauthorized()
	}

	if (new Date(t[0].created_at).getTime() + (60 * 60 * 1000) < Date.now()) {

		await dbMethods.token2FA.deleteByToken(token)

		throw boom.unauthorized()

	}

	const user = await userSrvc.getByID(t[0].user_id)

	return { user: userSrvc.present(user) }

}
