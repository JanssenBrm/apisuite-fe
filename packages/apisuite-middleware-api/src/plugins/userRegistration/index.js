const handlers = require('./handlers')
const authStrategies = require('./authStrategies')

exports = module.exports = {}

/**
 * hapi plugin with userRegistration endpoints.
 * @module plugins/userRegistration
 */

/**
 * Configuration object for user endpoints
 */
exports.plugin = {

	register: (server) => {

		// Registration token auth strategy
		server.auth.strategy('registrationToken', 'bearer-access-token', authStrategies.registrationToken),

		// Routes
		server.route([
			{
				method: 'POST',
				path: '/users_registration/user_details',
				options: handlers.setUserDetails,
			},
			{
				method: 'POST',
				path: '/users_registration/organization_details',
				options: handlers.setUserOrganizationDetails,
			},
			{
				method: 'POST',
				path: '/users_registration/security_details',
				options: handlers.setUserSecurityDetails,
			},
			{
				method: 'GET',
				path: '/users_registration/2fa/qrcode',
				options: handlers.generateQRCode,
			},
			{
				method: 'POST',
				path: '/users_registration/sms_code',
				options: handlers.sendSmsCode,
			},
		])
	},
	name: 'appcenter-user-registration',
}
