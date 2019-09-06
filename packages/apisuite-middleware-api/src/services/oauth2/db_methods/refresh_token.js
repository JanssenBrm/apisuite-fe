const knex = require('../../../utils/knex')
const jwt = require('jsonwebtoken')

exports = module.exports = {}

/**
 * Returns a refresh token if it finds one.
 * @param   {String}  token - The token to decode to get the id of the access token to find.
 * @returns {Promise} resolved with the token
 */
exports.find = async (token) => {
	return await knex('oauth_refresh_token').where({
		refresh_token: jwt.decode(token).jti,
	}).select()
}

/**
 * Saves a refresh token, expiration date, user id, client id, and scope.
 * @param   {Object}  refreshToken			          -
 * @param   {String}  refreshToken.token          - The refresh token (required)
 * @param   {String}  refreshToken.clientID       - The client ID (required)
 * @param   {String}  refreshToken.userID         - The user ID (required)
 * @param   {Date}    refreshToken.expirationDate - The expiration of the access token (required)
 * @param   {String}  refreshToken.scope          - The scope (optional)
 * @returns {Promise} 														- resolved with the saved token
 */
exports.save = async (refreshToken) => {
	return await knex('oauth_refresh_token').insert({
		refresh_token: jwt.decode(refreshToken.token).jti,
		client_id: refreshToken.clientID,
		user_id: refreshToken.userID,
		expiration_date: refreshToken.expirationDate,
		scope: refreshToken.scope,
	})
}

/**
 * Deletes/Revokes an refresh token.
 * @param   {String}  refreshToken - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
exports.delete = async (refreshToken) => {
	return await knex('oauth_refresh_token').where({
		refresh_token: jwt.decode(refreshToken).jti,
	}).del()
}

/**
 * Removes expired refresh tokens.
 * @returns {Promise} resolved with an associative of tokens that were expired
 */
exports.removeExpired = async () => {
	return await knex('oauth_refresh_token')
		.where('expiration_date', '<', new Date())
		.del()
}
