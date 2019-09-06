const boom = require('boom')
const jwt = require('jsonwebtoken')
const knex = require('../../../utils/knex')


exports = module.exports = {}

exports.find = async (accessToken) => {
	return await knex('oauth_access_token').select().where({ access_token: jwt.decode(accessToken).jti })
}

// exports.hasClientUser = async (clientID, userID) => {

// 	const c = await knex('oauth_access_token').count().where({
// 		client_id: clientID,
// 		user_id: userID
// 	})

// 	if (c[0]['count(*)'] === 1) {
// 		return true
// 	}

// 	return false

// }

/**
 * Saves a access token, expiration date, user id, client id, and scope. Note: The actual full
 * access token is never saved.  Instead just the ID of the token is saved.  In case of a database
 * breach this prevents anyone from stealing the live tokens.
 * @param		{Object}	accessToken									-
 * @param		{String}	accessToken.token						- The access token (required)
 * @param		{String}	accessToken.clientID				- The client ID (required)
 * @param		{String}	accessToken.userID					- The user ID (required)
 * @param		{Date}		accessToken.expirationDate	- The expiration of the access token (required)
 * @param		{String}	accessToken.scope						- The scope (optional)
 * @returns	{Promise}															- resolved with the saved token
 */
exports.save = async (accessToken) => {

	let token = {
		access_token: jwt.decode(accessToken.token).jti,
		client_id: accessToken.clientID,
		user_id: accessToken.userID,
		expiration_date: accessToken.expirationDate,
		scope: accessToken.scope,
	}

	return await knex('oauth_access_token').insert(token)

}

/**
 * Deletes/Revokes an access token by getting the ID and removing it from the storage.
 * @param   {String}  accessToken - The token to decode to get the id of the access token to delete.
 * @returns {Promise} resolved with the deleted token
 */
exports.delete = async (accessToken) => {

	const token = jwt.decode(accessToken)

	if (!token) {
		throw boom.badRequest()
	}

	return await knex('oauth_access_token').where({
		access_token: token.jti,
	}).del()

}

/**
 * Removes expired access tokens.
 * @returns {Promise} resolved with an associative of tokens that were expired
 */
exports.removeExpired = async () => {
	return await knex('oauth_access_token')
		.where('expiration_date', '<', new Date())
		.del()
}

/**
 * Removes all user access tokens except the inputed.
 * @param		{String} userId User id
 * @param		{String} keep The token to keep
 * @returns {Promise} resolved with an associative of tokens that were expired
 */
exports.revokeUserTokens = async (userId, keep) => {
	let query = knex('oauth_access_token')
		.where('user_id', '=', userId)

	if(keep) {
		query.andWhere('access_token', '<>', keep)
	}

	return await query.del()
}
