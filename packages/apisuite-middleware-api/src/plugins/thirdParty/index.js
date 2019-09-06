const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with third party endpoints.
 * @module plugins/thirdparty
 */

/**
 * Configuration object
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'POST',
				path: '/third-party',
				options: handlers.onBoardingRegistration,
			},
			{
				method: 'POST',
				path: '/onboarding/token',
				options: handlers.onBoardingToken,
			},
		])
	},
	name: 'third-party',
}
