const joi = require('joi')
const boom = require('boom')
const log = require('../../utils/logger')

const userSrvc = require('../../services/user')
const organizationsSrvc = require('../../services/organization')
const smsService = require('../../services/sms')
const user2faSrvc = require('../../services/user2fa')
const oauth2Srvc = require('../../services/oauth2')

//const activityLog = require('../../utils/activity-log')

exports = module.exports = {}

/**
 * @memberof module:plugins/user
 */

/** handler for GET /users/me endpoint */
exports.getMe = {
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const organizations = await organizationsSrvc.listUserOrganizations(request.auth.artifacts.user.get('id'))
		const user2fa = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'), { require: false })

		const resp = Object.assign({}, request.auth.artifacts.user.toJSON())

		// Add the 2a data to the response
		resp.twoFA = !!user2fa
		resp.twoFAMethod = user2fa ? user2fa.get('method') : ''

		// Add organizations data to the response
		resp.organizations = organizations

		// Add the user scopes to the response
		resp.scopes = request.auth.credentials.scope

		// Add the user roles to the response
		resp.roles = request.auth.credentials.roles || []

		return resp
	},
	id: 'appcenter-user-me-get',
	description: 'Get the logged in user',
	notes: ['Get the user making the request, based on the bearer token'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
			},
		},
	},
}

/** handler for PUT /users/me endpoint */
exports.updateMe = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		options: {
			stripUnknown: {
				objects: true,
			},
		},
		payload: joi.object({
			fullName: joi.string().required().example('John Doe'),
			avatar: joi.string().required().allow('', null).example('http://myavatar'),
			phone: joi.string().required().allow('', null).example('+000-123-456-789'),
			bio: joi.string().allow('', null).example('User biography'),
		}).label('userUpdateInfo'),
	},
	response: {
		status: {
			200: joi.object({
				id: joi.number().integer().positive().required().example(1),
				email: joi.string().email().required().example('john@doe.com'),
				fullName: joi.string().required().example('John Doe'),
				avatar: joi.string().required().allow('').example('http://myavatar'),
				phone: joi.string().required().allow('').example('+000-123-456-789'),
				bio: joi.string().allow('', null).example('Biography'),
				twoFA: joi.boolean().required().example(false),
				twoFAMethod: joi.string().optional().allow('').example('Authorisation App'),
				github: joi.boolean().required().example(false),
				activated: joi.boolean().required().example(false),
				created: joi.string().required().isoDate().example('2018-04-19T12:00:00.000Z'),
				updated: joi.string().required().isoDate().example('2018-04-19T12:00:00.000Z'),
			}).label('user'),
		},
	},
	handler: async (request) => {
		await userSrvc.updateUserByID(
			request.auth.artifacts.user.get('id'),
			request.payload.fullName,
			request.payload.avatar,
			request.payload.phone,
			request.payload.bio,
		)

		const user = await userSrvc.getByID(request.auth.artifacts.user.get('id'))

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			null,
			'USER_UPDATE',
			'user',
			`User ${ request.auth.artifacts.user.get('email') } was updated`,
		)
		*/

		return userSrvc.present(user)
	},
	id: 'appcenter-user-me-update',
	description: 'update the logged in user',
	notes: ['update the user in the database with new values'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal error' },
			},
		},
	},
}

/** handler for DELETE /users/me endpoint */
exports.deleteMe = {
	id: 'appcenter-user-me-delete',
	description: 'delete the logged in user and all it\'s related data',
	notes: ['cascade delete the logged in user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'401': { 'description': 'Unauthorized' },
				'500': { 'description': 'Internal error' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {

		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			request.auth.artifacts.user.get('id'),
			null,
			'USER_UPDATE',
			'user',
			`User ${ request.auth.artifacts.user.get('email') } was deleted`,
		)
		*/
		
		await userSrvc.deleteUserByID(request.auth.artifacts.user.get('id'))
			.catch((error) => {
				log.error(error, 'Failed to delete user')
				throw boom.internal()
			})
		
		return h.response().code(204)
	},
}

/** handler for PUT /users/me/password endpoint */
exports.mePassword = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		options: {
			stripUnknown: {
				objects: true,
			},
		},
		payload: joi.object({
			oldPassword: joi.string().required().min(8).example('oldsecretpass'),
			newPassword: joi.string().required().min(8).example('newsecretpass'),
		}).label('passwordInfo'),
	},
	handler: async (request, h) => {

		await userSrvc.updatePasswordByID(request.auth.artifacts.user.get('id'), request.payload.oldPassword, request.payload.newPassword)

		return h.response().code(200)

	},
	id: 'appcenter-user-me-password',
	description: 'update the logged in user\'s password',
	notes: ['Check old password agaist database hash, if match, save new password hash'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/** handler for PUT /users/me/2fa/configure endpoint */
exports.me2faConfig = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		options: {
			stripUnknown: {
				objects: true,
			},
		},
		payload: joi.object({
			confirmationCode: joi.string()
				.required()
				.example('123456'),
			method: joi.string()
				.valid('authorizationApp', 'authorizationSms')
				.required()
				.example('authorizationApp'),
		}).label('2faInfo'),
	},
	handler: async (request, h) => {
		const { method, confirmationCode } = request.payload

		// Retrieve user 2fa details
		const user2faDetails = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'))

		// Verify
		const validation = user2faSrvc.verifyTOTP(user2faDetails.get('secret'), 'base32', confirmationCode, method)

		if (!validation) {
			throw boom.forbidden()
		}

		await user2faSrvc.update2faData(user2faDetails.get('id'), {
			user_id: request.auth.artifacts.user.get('id'),
			secret: user2faDetails.get('secret'),
			verified: true,
			method: method,
		})

		return h.response().code(200)
	},
	id: 'appcenter-user-me-2fa-config',
	description: 'Update the logged in user\'s 2fa method',
	notes: ['Check the confirmationCode matches with the 2fa secret and save the new 2fa method'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/** handler for POST /users/me/2fa/verify endpoint */
exports.me2faVerify = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		payload: joi.object({
			pass: joi.string()
				.regex(/^\d+$/),
		}).label('2faPass'),
	},
	handler: async (request, h) => {
		const { pass } = request.payload

		// Retrieve user 2fa details
		const user2faDetails = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'))

		const valid = user2faSrvc.verifyTOTP(user2faDetails.get('secret'), 'base32', pass, user2faDetails.get('method'))

		if (!valid) {
			throw boom.forbidden()
		}

		return h.response().code(200)
	},
	id: 'appcenter-user-me-2fa-verify',
	description: 'Verify the pass is matching with the 2fa secret',
	notes: ['Verify the 2fa validity'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/** handler for POST /users/me/recovery_codes endpoint */
exports.meRecoveryCodes = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		payload: joi.object({
			pass: joi.string()
				.regex(/^\d+$/),
		}).label('2faPass'),
	},
	response: {
		status: {
			200: joi.object({
				codes: joi.array().required().items(joi.string()),
			}).label('recovery-codes-generate'),
		},
	},
	handler: async (request) => {
		const { pass } = request.payload

		// Retrieve user 2fa details
		const user2faDetails = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'))

		const valid = user2faSrvc.verifyTOTP(user2faDetails.get('secret'), 'base32', pass, 'authorizationSms')

		if (!valid)
			throw boom.forbidden()

		return await user2faSrvc.getUserRecoveryCodes(request.auth.artifacts.user.get('id'))
	},
	id: 'appcenter-user-me-recovery-codes',
	description: 'Get the recovery codes of a given user',
	notes: ['Get the recovery codes'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/** handler for POST /users/me/recovery_codes/verify endpoint */
exports.verifyRecoveryCode = {
	auth: {
		strategy: 'token2FA',
	},
	validate: {
		options: {
			stripUnknown: {
				objects: true,
			},
		},
		payload: joi.object({
			code: joi.string().required().example('95a7ba2d-dbf7-44a0-a2f1-b9a9e6bb1d1a'),
		}).label('recovery-codes-verify'),
	},
	handler: async (request) => {
		// Validates the recovery code
		await user2faSrvc.verifyRecoveryCode(request.auth.artifacts.user.id, request.payload.code)

		// Returns the token used for 2fa login
		return await oauth2Srvc.flows.password(request.auth.artifacts.user.id)
	},
	id: 'appcenter-user-me-recovery-codes-verify',
	description: 'Check the validity of a recovery code',
	notes: ['Verifies a recovery code and removes it for a given user'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
			},
		},
	},
}

/**
 * GET /users/me/2fa/qrcode handler
 * Generates and returns the qrcode to link with the TOTP App
 */
exports.meGenerateQRCode = {
	id: 'appcenter-user-me-qrcode-generation',
	description: 'Generates and returns the qrcode to link with the TOTP App',
	notes: ['Generates the qrcode base upon the logged in user email and secret'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			responses: {
				200: { description: 'OK' },
				400: { description: 'Bad Request' },
				422: { description: 'Bad Data' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {
		const user2fa = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'))
		const secret = user2fa.get('secret')

		try {
			return await user2faSrvc.generateQRCode(request.auth.artifacts.user.get('email'), secret, 'base32', 'Appcenter')
		} catch (error) {
			return boom.badData(error.message)
		}
	},
}

/** handler for GET /users/me/sms_code endpoint */
exports.meSendSmsCode = {
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => {

		// Retrieve user 2fa details
		const user2faDetails = await user2faSrvc.getUser2faData(request.auth.artifacts.user.get('id'))

		// Generate a token with the secret
		let code = user2faSrvc.generateTOTPToken(user2faDetails.getDecryptedSecret(), 'base32', request.auth.artifacts.user.get('email'), 'Appcenter')

		try {
			// Send sms with code
			const smsCredentials = await request.server.app.cache.get('smsGatewayCredentials')
			return await smsService.sendTwoFactorAuthSms(request.auth.artifacts.user.get('phone_number'), code, smsCredentials)
		} catch (err) {
			log.warn(err, 'Failed to send SMS code')

			// When phone number is invalid
			if (err.code === 21211)
				return boom.badRequest(err.message)
			else
				return boom.internal()
		}
	},
	id: 'appcenter-user-me-registration-sms-code',
	description: 'Send sms code to activate/verify 2fa',
	notes: ['Send sms code to activate/verify 2fa'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'400': { 'description': 'Bad Request' },
				'422': { 'description': 'Bad Data' },
			},
		},
	},
}

