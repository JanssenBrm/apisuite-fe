//const jwt = require('jsonwebtoken')
const knex = require('../../../utils/knex')
//const config = require('../../../config')

exports = module.exports = {}

/**
 * Returns an authorization code if it finds one.
 * @param   {String}  token - The token to decode to get the id of the authorization token to find.
 * @returns {Promise} resolved with the authorization code
 */
// exports.find = async (token) => {
// 	return await knex('oauth_authorization_code').select().where({
// 		authorization_code: jwt.decode(token).jti,
// 	})
// }

// exports.hasClientUser = async (clientID, userID) => {

// 	const c = await knex('oauth_authorization_code').count().where({
// 		client_id: clientID,
// 		user_id: userID
// 	})

// 	if (c[0]['count(*)'] === 1) {
// 		return true
// 	}

// 	return false

// }

/**
 * Saves a authorization code, client id, redirect uri, user id, and scope
 * @param		{object}	authorizationCode							-
 * @param   {String}  authorizationCode.code        - The authorization code (required)
 * @param   {String}  authorizationCode.clientID    - The client ID (required)
 * @param   {String}  authorizationCode.redirectURI - The redirect URI of where to send access tokens once exchanged
 * @param   {String}  authorizationCode.userID      - The user ID (required)
 * @param   {String}  authorizationCode.scope       - The scope (optional)
 * @returns {Promise}																- resolved with the saved token
 */
// exports.save = async (authorizationCode) => {
// 	var newDateObj = new Date()
// 	newDateObj.setTime(new Date() + config.get('oauth2').code_expiresIn)

// 	let code = {
// 		authorization_code: jwt.decode(authorizationCode.code).jti,
// 		client_id: authorizationCode.clientID,
// 		user_id: authorizationCode.userID,
// 		redirect_uri: authorizationCode.redirectURI,
// 		expiration_date: newDateObj,
// 		scope: authorizationCode.scope,
// 	}

// 	return await knex('oauth_authorization_code').insert(code)
// }

/**
 * Deletes an authorization code
 * @param   {String}  token - The authorization code to delete
 * @returns {Promise} resolved with the deleted value
 */
// exports.delete = async (token) => {
// 	return await knex('oauth_authorization_code')
// 		.del()
// 		.where({
// 			authorization_code: jwt.decode(token).jti,
// 		})
// }

/**
 * Removes expired codes.
 * @returns {Promise} resolved with an associative of codes that were expired
 */
exports.removeExpired = async () => {
	return await knex('oauth_authorization_code')
		.del()
		.where('expiration_date', '<', new Date())
}
