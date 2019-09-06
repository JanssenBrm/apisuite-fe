const knex = require('../../../utils/knex')

exports = module.exports = {}

/**
 * Returns an approved client for an user, if it exists.
 * @param {String} clientID - The client ID (required)
 * @param {String} userID - The user ID (required)
 * @returns {Promise} The approved client for that user.
 */
exports.find = async (clientID, userID) => {
	return await knex('oauth_approved_client')
		.select().where({
			client_id: clientID,
			user_id: userID,
		})
}

/**
 * Saves an authorized client for an user.
 * @param   {String} clientID - The client ID (required)
 * @param   {String} userID - The user ID (required)
 * @returns {Promise} resolved with the saved data
 */
exports.save = async (clientID, userID) => {
	return await knex('oauth_approved_client')
		.insert({
			client_id: clientID,
			user_id: userID,
		})
}

/**
 * Deletes/Revokes an approved client if exists.
 * @param   {String} clientID - The client ID (required)
 * @param   {String} userID - The user ID (required)
 * @returns {Promise} resolved with the deleted data
 */
// exports.delete = async (clientID, userID) => {
// 	return await knex('oauth_approved_client')
// 		.where({
// 			client_id: clientID,
// 			user_id: userID,
// 		}).del()
// }
