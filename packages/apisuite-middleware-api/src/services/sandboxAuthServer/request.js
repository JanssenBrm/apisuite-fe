const request = require('request-promise-native')
const authorization = require('./authorization')
const log = require('../../utils/logger')
const Boom = require('boom')

exports = module.exports = {}

/**
 *
 * @param {Object} requestOptions	- Request options
 * @returns	{Void} -
 */
exports.authServer = async (requestOptions) => {
	// Fetch token
	let token = authorization.getAccessToken()

	if (!token) {
		token = await authorization.loadAuthToken()
	}

	// Include authorization header and token
	requestOptions.headers = requestOptions.headers || {}
	requestOptions.headers.Authorization = `Bearer ${token}`

	// Include status codes in the response
	requestOptions.resolveWithFullResponse = true

	// Do not throw error if not for technical reasons (500's)
	requestOptions.simple = false


	const req = await request(requestOptions)

		// The server responded with a status codes other than 2xx.
		.catch(async (error) => {
			log.warn({ error }, 'Request failed')
			throw Boom.serverUnavailable('unavailable')
		})

	// If request suceeds, return the body
	if (req.statusCode >= 200 && req.statusCode <= 299) return req.body

	// If request is unauthorized
	if (req.statusCode === 401) {

		// Attempt to retrieve a new token
		const newToken = await authorization.requestAccessToken()

		// Add new token to the Auth header and rety the call
		requestOptions.headers.Authorization = `Bearer ${newToken}`
		const retry = await request(requestOptions)

		// If request suceeds retrieve the body
		if (retry.statusCode >= 200 && retry.statusCode <= 299) return retry.body

		// Else, fail for good
		log.error(req, 'Auth server request failed after retry')
		throw Boom.serverUnavailable('unavailable')
	}

	// If another error, fail it
	log.error(req, 'Auth server request failed')
	throw Boom.serverUnavailable('unavailable')
}
