const meHandlers = require('./handlersMe')
const userHandlers = require('./handlersUser')

exports = module.exports = {}

/**
 * hapi plugin with user endpoints.
 * @module plugins/user
 */

/** Configuration object for user endpoints */
exports.plugin = {
	register: (server) => {
		server.route([
			{
				method: 'GET',
				path: '/users/me',
				options: meHandlers.getMe,
			},
			{
				method: 'PUT',
				path: '/users/me',
				options: meHandlers.updateMe,
			},
			{
				method: 'DELETE',
				path: '/users/me',
				options: meHandlers.deleteMe,
			},
			{
				method: 'PUT',
				path: '/users/me/password',
				options: meHandlers.mePassword,
			},
			{
				method: 'PUT',
				path: '/users/me/2fa/configure',
				options: meHandlers.me2faConfig,
			},
			{
				method: 'POST',
				path: '/users/me/2fa/verify',
				options: meHandlers.me2faVerify,
			},
			{
				method: 'GET',
				path: '/users/confirmation_ticket',
				options: userHandlers.activateUser,
			},
			{
				method: 'POST',
				path: '/users/me/recovery_codes',
				options: meHandlers.meRecoveryCodes,
			},
			{
				method: 'POST',
				path: '/users/me/recovery_codes/verify',
				options: meHandlers.verifyRecoveryCode,
			},
			{
				method: 'POST',
				path: '/users/send_activation',
				options: userHandlers.sendActivationEmail,
			},
			{
				method: 'GET',
				path: '/users/me/2fa/qrcode',
				options: meHandlers.meGenerateQRCode,
			},
			{
				method: 'GET',
				path: '/users/me/sms_code',
				options: meHandlers.meSendSmsCode,
			},
			{
				method: 'GET',
				path: '/admin/users',
				options: userHandlers.usersGetAll,
			},
			{
				method: 'POST',
				path: '/admin/users/{userId}/grant',
				options: userHandlers.userGrantAdmin,
			},
			{
				method: 'POST',
				path: '/admin/users/{userId}/revoke',
				options: userHandlers.userRevokeAdmin,
			},
			{
				method: 'DELETE',
				path: '/admin/users/{userId}',
				options: userHandlers.userDeleteAdmin,
			},
		])
	},
	name: 'appcenter-user',
}
