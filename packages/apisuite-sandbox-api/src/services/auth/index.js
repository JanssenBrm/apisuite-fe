const config = require('../../config')
const auth = config.get('auth')

const baseUrl = auth.url
const internal = auth.internal
const instrospection = auth.introspection

const Wreck = require('wreck')
const Boom = require('boom')

exports = module.exports = {}

exports.tokenIntrospect = async (token, brand) => {

	const instrospectionUrl = `${baseUrl}${instrospection}?brand=${brand}`
	const { res, payload } = await Wreck.post(instrospectionUrl, {
		headers: {
			'authorization': `Bearer ${token}`,
		},
		payload: {
			token: token,
		},
	})

	if (res.statusCode !== 200) throw Boom.unauthorized()

	try {
		const retval = JSON.parse(payload.toString())
		return retval
	} catch (error) {
		throw Boom.unauthorized()
	}

}

exports.validateInternalToken = async (clientId, clientSecret, userId, scope) => {
	try {

		const internalUrl = `${baseUrl}${internal}`
		const { res, payload } = await Wreck.post(internalUrl, {
			headers: {
				'x-client-id': clientId,
				'x-client-secret': clientSecret,
				'x-user-id': userId,
				'x-client-scope': scope,
			},
		})

		if (res.statusCode !== 200) throw Boom.unauthorized()

		try {
			const { isValid, credentials } = JSON.parse(payload.toString())

			return {
				isValid,
				credentials,
			}

		} catch (error) {
			throw error
		}
	} catch (error) {
		throw error
	}


}
