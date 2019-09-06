const persistence = require('./persistence')
const Boom = require('boom')

const OauthClient = require('../../models/OauthClient')

exports = module.exports = {}

/**
 * Module responsbile for all oauth2 client functions.
 * @module services/oauthClient
 */

/**
 * Validates if a client basic auth token is valid, returning the found client
 * @async
 * @param {String} token 		- B64 token
 * @throws {Error}					- An error if fails or if not found
 * @returns	{OauthClient}		- returns an OauthClient
 */
exports.validateClientToken = async (token) => {
	const inputBuffer = new Buffer(token, 'base64').toString()
	const elements = inputBuffer.split(':')

	if (!elements || !elements.length || elements.length < 2)
		throw Boom.unauthorized()

	return await OauthClient.findOne({
		client_id: elements[0],
		client_secret: elements[1],
	})
}

/**
 * Get one client by id
 * @async
 * @param		{number}	clientID	- client id
 * @throws	{error}				- an error if database query fails
 * @returns	{Object}			- returns the client object from the database
 */
exports.getByClientID = async (clientID) => {
	const client = await persistence.selectByClientID(clientID)
	return client[0]
}
