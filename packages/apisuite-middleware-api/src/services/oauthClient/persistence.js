// const boom = require('boom')
const knex = require('../../utils/knex')
// const userSrvc = require('../user')

exports = module.exports = {}

/**
 * Find a client by id
 * @param		{Object}	client		-
 * @param   {String}  client.id - The client unique id (required)
 * @returns {Promise} 					- resolved with the client
 */
// exports.selectByID = async (client) => {
// 	return await knex('oauth_client').select().where({
// 		id: client.id
// 	})
// }

/**
 * Find a client by the client_id param.
 * @param   {String}  clientID - The unique client id (required)
 * @returns {Promise} resolved with the client
 */
exports.selectByClientID = async (clientID) => {
	return await knex('oauth_client').where({
		client_id: clientID,
	}).select()
}

/**
 * List clients
 * @returns {Promise}	- resolved with the clients array
 */
// exports.list = async () => {
// 	return await knex('oauth_client').select()
// }

/**
 * Saves a client
 * @param		{Object}	client							-
 * @param   {String}  client.clientID     - The unique client id (required)
 * @param   {String}  client.clientSecret - The unique client secret (required)
 * @param   {String}  client.redirectURI  - The redirect URI of where to send access tokens once exchanged  (required)
 * @param   {String}  client.name         - A human readable name (optional)
 * @param   {String}  client.description  - A human readable description (optional)
 * @param   {String}  client.grantTypes   - The grant type for acquiring the access token (optional)
 * @param   {String}  client.userID       - The creator of the client (optional)
 * @param   {Boolean} client.trusted      - If the client is trusted (optional)
 * @param   {Boolean} client.makeToken    - Should generate refresh token (optional)
 * @param   {String}  client.scope        - The scope (optional)
 * @returns {Promise} resolved with the client
 */
// exports.add = async (client) => {

// 	const c = await knex('oauth_client').where({
// 		client_id: client.clientID
// 	}).count()

// 	if (c[0]['count(*)'] === 1) {
// 		throw boom.conflict()
// 	}

// 	if (client.user && client.user.id) {

// 		const exists = await userSrvc.existsByID(client.user.id)

// 		if (!exists) {
// 			throw boom.badRequest()
// 		}

// 	}

// 	let newClient = {
// 		client_id: client.clientID,
// 		client_secret: client.clientSecret,
// 		redirect_uri: client.redirectURI,
// 		name: client.name,
// 		description: client.description,
// 		grant_types: client.grantTypes,
// 		user_id: client.userID,
// 		trusted: client.trusted,
// 		make_token: client.makeToken,
// 		scope: client.scope,
// 	}

// 	if (client.user && client.user.id) {
// 		newClient.user_id = client.user.id
// 	}

// 	return await knex('oauth_client').insert(newClient)

// }

/**
 * Updates the client data.
 * @param		{Object}	client							-
 * @param   {String}  client.id           - The client id (required)
 * @param   {String}  client.clientSecret - The unique client secret (required)
 * @param   {String}  client.redirectURI  - The redirect URI of where to send access tokens once exchanged  (required)
 * @param   {String}  client.name         - A human readable name (optional)
 * @param   {String}  client.description  - A human readable description (optional)
 * @param   {Boolean} client.makeToken    - Should generate refresh token (optional)
 * @returns {Promise} resolved with the client
 */
// exports.update = async (client) => {

// 	const c = await knex('oauth_client').where({
// 		id: client.id
// 	}).count()

// 	if (c[0]['count(*)'] === 0) {
// 		throw boom.notFound()
// 	}

// 	let newClient = {
// 		client_secret: client.clientSecret,
// 		redirect_uri: client.redirectURI,
// 		name: client.name,
// 		description: client.description,
// 		make_token: client.makeToken
// 	}

// 	return await knex('oauth_client').where({
// 		id: client.id
// 	}).update(newClient)

// }

/**
 *
 * @param		{Promise}	promise	-
 * @returns	{Object}					-
 */
// const reflect = (promise) => {
// 	return promise.then((v) => {
// 		return { v: v, status: 'resolved' }
// 	}, (e) => {
// 		if (e.message === 'No Rows Deleted')
// 			return { e: e, status: 'resolved' }
// 		return { e: e, status: 'rejected' }
// 	})
// }

/**
 *
 * @param		{Object}	client	-
 * @returns	{Boolean}					-
 */
// const deleteRelated = async (client) => {
// 	let accessTokensDestroyed = knex('oauth_access_token').where({ client_id: client.client_id }).del()
// 	let refreshTokensDestroyed = knex('oauth_refresh_token').where({ client_id: client.client_id }).del()
// 	let authorizationCodesDestroyed = knex('oauth_authorization_code').where({ client_id: client.client_id }).del()
// 	let approvedClientDestroyed = knex('oauth_approved_client').where({ client_id: client.client_id }).del()
// 	let promises = [accessTokensDestroyed, refreshTokensDestroyed, authorizationCodesDestroyed, approvedClientDestroyed]
// 	return Promise.all(promises.map(reflect))
// 		.then((result) => {
// 			let resolved = result.filter((res) => {
// 				return res.status === 'resolved'
// 			})
// 			return resolved.length === result.length
// 		})
// }

/**
 * Delete a client by the id
 * @param		{Object}	client		-
 * @param		{String}	client.id	- The client unique id (required)
 * @returns	{Promise}						- resolved with the client
 */
// exports.delete = async (client) => {

// 	const c = await knex('oauth_client').select().where({
// 		id: client.id
// 	})

// 	if (!c) {
// 		throw boom.notFound()
// 	}

// 	const canDelete = await deleteRelated(c)

// 	if (!canDelete) {
// 		throw boom.internal()
// 	}

// 	return await knex('oauth_client').where({
// 		id: client.id
// 	}).del()

// }
