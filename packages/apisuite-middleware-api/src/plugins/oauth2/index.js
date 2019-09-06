const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with oauth2 endpoints.
 * @module plugins/oauth2
 */

/** Configuration object for oauth2 endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'POST',
				path: '/oauth2/revoke',
				options: handlers.revokeAccessToken,
			},
			{
				method: 'POST',
				path: '/oauth2/token',
				options: handlers.tokenRequestHandler,
			},
			{
				method: 'POST',
				path: '/oauth2/tfa',
				options: handlers.tfaAuth,
			},
			{
				method: 'POST',
				path: '/forgot',
				options: handlers.forgotPassword,
			},
			{
				method: 'POST',
				path: '/recover',
				options: handlers.recoverPassword,
			},
			{
				method: 'GET',
				path: '/auth/github',
				options: handlers.githubAuth,
			},
			{
				method: 'POST',
				path: '/oauth2/tfa/validate',
				options: handlers.tfaAuthValidate,
			},
		])
	},
	name: 'appcenter-oauth2',
}
