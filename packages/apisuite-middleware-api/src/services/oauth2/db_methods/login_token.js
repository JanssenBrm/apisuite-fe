// const knex = require('../../../utils/knex')

exports = module.exports = {}

/**
 * Saves a login token
 * @param		{object}	login									-
 * @param		{String}	login.userID					- The unique user id (required)
 * @param		{String}	login.accountID				- The unique account id (required)
 * @param		{String}	login.token						- The access token generated for this user/account combination  (required)
 * @param		{Date}		login.expirationDate	- The expiration date of the token
 * @returns	{Promise}												- resolved with the login data
 */
// exports.save = async (login) => {
// 	return await knex('oauth_login').insert({
// 		user_id: login.userID,
// 		account_id: login.accountID,
// 		token: login.token,
// 		expiration_date: login.expirationDate
// 	})
// }

/**
 * Find a login data by token.
 * @param   {String}  token - The token (required)
 * @returns {Promise} resolved with the login data
 */
// exports.find = async (token) => {
// 	return await knex('oauth_login').select().where({
// 		token: token
// 	})
// }

/**
 * Updates the login data
 * @param		{object}	login									-
 * @param   {String}  login.userID         	- The unique user id (required)
 * @param   {String}  login.accountID      	- The unique account id (required)
 * @param   {String}  login.token         	- The access token generated for this user/account combination  (required)
 * @param   {Date}    login.expirationDate	- The expiration date of the token
 * @returns {Promise}												- Resolved with the login data
 */
// exports.update = async (login) => {
// 	return await knex('oauth_login').where({
// 		user_id: login.userID,
// 		account_id: login.accountID
// 	}).update({
// 		token: login.token,
// 		expiration_date: login.expirationDate
// 	})
// }

/**
 * Delete the login data.
 * @param   {String}  token - The token (required)
 * @returns {Promise} resolved with the login data
 */
// exports.delete = async (token) => {
// 	return await knex('oauth_login').where({
// 		token: token
// 	}).del()
// }
