const request = require('request-promise-native')
const Boom = require('boom')
const log = require('../../utils/logger')
const AuthServerToken = require('../../models/AuthServerToken')
const config = require('../../config')

exports = module.exports = {}

let accessToken

/**
 * Retrieve auth token
 *
 * @throws	{Error}												- An error when request fails
 * @returns	{String}											- Token
 */
exports.getAccessToken = () => {
	return accessToken
}

/**
 * Request an access token from the auth token
 *
 * @throws	{Error}												- An error when request fails
 * @returns	{String}											- Token
 */
exports.requestAccessToken = async () => {
	return await fetchAccessToken()
}

/**
 * Loads existing token from database
 *
 * @throws	{Error}												- An error when request fails
 * @returns	{String}											- Token
 */
exports.loadAuthToken = async () => {

	// Fetch token from db at start
	const authServerToken = await AuthServerToken.findOne({}, { require: false })
		.catch(async (err) => {
			log.warn({ err }, 'Failed to search auth token locally')
		})

	// If it fails to fetch a local token or token is expired ask for another
	if (authServerToken && new Date(authServerToken.get('expiration_date')) > new Date()) {
		accessToken = authServerToken.get('token')
		log.debug('Auth server token loaded locally', { expires_at: authServerToken.get('expiration_date') })
		return accessToken
	}

	return await fetchAccessToken()
		.catch((error) => {
			log.warn({ error }, 'Failed to retrieve a new token from the auth server')
		})
}

/**
 * Create an access token in the auth server
 *
 * @async
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
async function fetchAccessToken() {
	log.debug('Requesting a new token from the auth server')

	// Request new token
	const response = await request({
		method: 'POST',
		uri: `${config.get('sandboxAuthServer').host}/token`,
		body: {
			client_id: config.get('sandboxAuthServer').clientId,
			client_secret: config.get('sandboxAuthServer').clientSecret,
			scope: 'internal',
			grant_type: 'client_credentials',
		},
		json: true,
	})
		.catch((error) => {
			log.error(error, 'Failed to request a new token in the auth server')
			throw Boom.unauthorized()
		})

	log.debug({ expiration_date: new Date(response.expires) }, 'New auth server token generated')

	// Upsert database entry
	await AuthServerToken.upsert({ token: response.token, expiration_date: new Date(response.expires) })
		.catch((error) => {
			log.error(error, 'Failed to store access token in the database')
		})

	// Update memory entry
	accessToken = response.token

	return accessToken
}
