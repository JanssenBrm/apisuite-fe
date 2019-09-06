// const boom = require('boom')
const config = require('../../config')
const utils = require('./utils')
const dbMethods = require('./db_methods')
// const userSrvc = require('../user')
// const clientSrvc = require('../oauthClient')

/** Validate object to attach all functions to  */
const validate = Object.create(null)

/**
 * Log the message and throw it as an Error
 * @param		{string}	msg	-
 * @throws	{error}
 * @returns	{void}
 */
validate.logAndThrow = (msg) => {
	throw new Error(msg)
}

/**
 * Given a token and accessToken this will return either the user or the client associated with
 * the token if valid.  Otherwise this will throw.
 * @param   {Object}  token       - The token
 * @param   {Object}  accessToken - The access token
 * @throws  {Error}   If the token is not valid
 * @returns {Promise} Resolved with the user or client associated with the token if valid
 */
// validate.token = async (token, accessToken) => {

// 	utils.verifyToken(accessToken)

// 	// token is a user token
// 	if (token.userID != null) {
// 		return await userSrvc.getByID(token.userID)
// 	}
// 	// token is a client token
// 	return await clientSrvc.getByID(token.clientID)

// }

/**
 * Given a refresh token and client this will return the refresh token if it exists and the client
 * id's match otherwise this will throw an error
 * throw an error
 * @param   {Object} token        - The token record from the DB
 * @param   {Object} refreshToken - The raw refresh token
 * @param   {Object} client_id		- The client profile
 * @throws  {Error}  If the refresh token does not exist or the client id's don't match
 * @returns {Object} The token if valid
 */
validate.refreshToken = (token, refreshToken, client_id) => {
	utils.verifyToken(refreshToken)
	if (client_id !== token.clientID) {
		validate.logAndThrow('RefreshToken clientID does not match client id given')
	}
	return token
}

/**
 * Given a auth code, client, and redirectURI this will return the auth code if it exists and is
 * not 0, the client id matches it, and the redirectURI matches it, otherwise this will throw an
 * error.
 * @param  {String}  code        - The auth code record from the DB
 * @param  {Object}  authCode    - The raw auth code
 * @param  {String}  clientID      - The client id
 * @param  {Object}  redirectURI - The redirectURI to check against
 * @throws {Error}   If the auth code does not exist or is zero or does not match the client or
 *                   the redirectURI
 * @returns {Object} The auth code token if valid
 */
// validate.authCode = (code, authCode, clientID, redirectURI) => {

// 	const verification = utils.verifyToken(code)

// 	if (boom.isBoom(verification)) {
// 		throw verification
// 	}

// 	if (clientID !== authCode.client_id) {
// 		validate.logAndThrow('AuthCode clientID does not match client id given')
// 	}

// 	if (redirectURI !== authCode.redirect_uri) {
// 		validate.logAndThrow('AuthCode redirectURI does not match redirectURI given')
// 	}

// 	return authCode

// }

/**
 * Check if the token generation needs the refresh token.
 * @param   {Boolean} refresh - The flag to indicate the need for a refresh token
 * @returns {Boolean} true If it needs, otherwise false
 */
validate.isRefreshToken = ({
	refresh,
}) => refresh != null && refresh

/**
 * Given a userID, clientID, and scope this will generate a refresh token, save it, and return it
 * @param   {Object}  userID      - The user profile
 * @param   {Object}  clientID    - The client profile
 * @param   {Object}  scope       - The scope
 * @returns {Promise} The resolved refresh token after saved
 */
validate.generateRefreshToken = ({ userID, clientID, scope }) => {
	const expiresIn = config.get('oauth2').refreshToken_expiresIn
	const refreshToken = utils.createToken({
		sub: userID,
		exp: expiresIn,
	})
	const expiration = utils.calculateExpirationDate(expiresIn)
	const refresh_token = {
		token: refreshToken,
		clientID,
		userID,
		expirationDate: expiration,
		scope,
	}
	return dbMethods.refreshTokens.save(refresh_token)
		.then(() => refreshToken)
}

/**
 * Given an auth code this will generate a access token, save that token and then return it.
 * @param   {userID}    userID      - The user profile
 * @param   {clientID}  clientID    - The client profile
 * @param   {scope}     scope       - The scope
 * @returns {Promise}   The resolved refresh token after saved
 */
validate.generateToken = ({ userID, clientID, scope }) => {
	const token = utils.createToken({
		sub: userID,
		exp: config.get('oauth2').token_expiresIn,
	})
	const expiration = utils.calculateExpirationDate(config.get('oauth2').token_expiresIn)
	const access_token = {
		token,
		clientID,
		userID,
		expirationDate: expiration,
		scope,
	}
	return dbMethods.accessTokens.save(access_token)
		.then(() => token)
}

/**
 * Given an auth code this will generate a access and refresh token, save both of those and return
 * them if the auth code indicates to return both.  Otherwise only an access token will be returned.
 * @param   {Object}  authCode - The auth code
 * @throws  {Error}   If the auth code does not exist or is zero
 * @returns {Promise} The resolved refresh and access tokens as an array
 */
validate.generateTokens = (authCode) => {
	if (validate.isRefreshToken(authCode)) {
		return Promise.all([
			validate.generateToken(authCode),
			validate.generateRefreshToken(authCode),
		])
	}
	return Promise.all([validate.generateToken(authCode)])
}

exports = module.exports = validate
