'use strict'

const Boom = require('boom')
const Hoek = require('hoek')
const Joi = require('joi')

const internals = {}

internals.defaults = {
	unauthorized: Boom.unauthorized,
}

internals.schema = Joi.object().keys({
	validate: Joi.func().required(),
	unauthorized: Joi.func(),
})

internals.implementation = (server, opts) => {
	Hoek.assert(opts, 'Missing internal auth strategy options')
	const settings = Hoek.applyToDefaults(internals.defaults, opts)

	Joi.assert(settings, internals.schema)
	const scheme = {
		authenticate: async (request, h) => {

			const clientId = request.raw.req.headers['x-client-id']
			const clientSecret = request.raw.req.headers['x-client-secret']
			const scope = request.raw.req.headers['x-client-scope']
			const userId = request.raw.req.headers['x-user-id']

			
			if (!clientId || !clientSecret || !scope ) {
				return settings.unauthorized()
			}

			const clientCredentials = {
				clientId,
				clientSecret,
				userId,
				scope,
			}

			const {isValid, credentials, artifacts} = await settings.validate(request, clientCredentials, h)


			if (!isValid) {
				let message = 'Bad Token'
				return h.unauthenticated(settings.unauthorized(message, settings.tokenType), { credentials, artifacts})				
			}

			if (!credentials || typeof credentials !== 'object') {
				throw h.unauthenticated(Boom.badImplementation('Bad token string received for internal auth validation'), { credentials: {} })
			}

			return h.authenticated({ credentials , artifacts})
		},
	}

	return scheme
}

exports.plugin = {
	register: (server) => server.auth.scheme('internal-token', internals.implementation),
	name: 'internal-token',
}
