const Boom = require('boom')
const Joi = require('joi')

const userSrvc = require('../../services/user')
const userRegistrationSrvc = require('../../services/userRegistration')
const orgSrvc = require('../../services/organization')
const sandboxAuthServer = require('../../services/sandboxAuthServer')
const userInvitationTicketService = require('../../services/userInvitation')

const emailService = require('../../services/email')
const smsService = require('../../services/sms')
const user2faSrvc = require('../../services/user2fa')

//const activityLog = require('../../utils/activity-log')

const log = require('../../utils/logger')
const complexityUtil = require('../../utils/complexity')
const config = require('../../config')

exports = module.exports = {}

/**
 * @memberof module:plugins/userRegistration
 */

/**
 * POST /users_registration/user_details
 */
exports.setUserDetails = {
	id: 'appcenter-users-registration-user-details',
	description: 'Generates a registration token for the registration process',
	notes: [
		'Inserts basic user details into the database',
		'Generates a token that identifies the user during the registration flow',
	],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'409': { 'description': 'Conflict' },
				'422': { 'description': 'Bad Data' },
			},
		},
	},
	validate: {
		query: {
			invitation: Joi.string()
				.example('ASDASGSFHFGJC456457457AF'),
		},
		payload: Joi.object({
			email: Joi.string().email()
				.required()
				.example('john@doe.com'),
			fullName: Joi.string()
				.required()
				.example('John Doe'),
			phoneNumber: Joi.string()
				.required()
				.example('+000-123-456-789'),
		}).label('userInfo'),
	},
	response: {
		status: {
			200: Joi.object({
				token: Joi.string()
					.required()
					.example('T25vAL7AD57cCt2!GSNm51Pbr9Qnb%u4mNkYvB$aHFSZnbbZ'),
				expiresAt: Joi.date()
					.required()
					.example('2018-09-10T15:34:20.099Z'),
			}).label('registrationToken'),
		},
	},
	handler: async (request) => {

		// Check if any registered user is already using the requested email
		const userExists = await userSrvc.existsByEmail(request.payload.email)

		// If email address already belongs to a registered user, return the error
		if (userExists) return Boom.conflict('Email is already in use')

		// Generate new registration token and user totp secret
		const token = userRegistrationSrvc.createUserRegistrationToken()
		const secret = user2faSrvc.generate2FASecret('base32')

		// Creates a new registration ticket with user details, token details and the ip address that requested
		let invitationTicket

		// If user was invited, add the info to the registration
		if (request.query.invitation) {
			invitationTicket = await userInvitationTicketService.getInvitationTicketByToken(request.query.invitation, { require: false })
			if (!invitationTicket)
				throw Boom.badRequest('Invalid invitation')
		}

		try {
			await userRegistrationSrvc.createUserRegistration(request.payload, token, request.headers['x-forwarded-for'], secret, invitationTicket)
		} catch (error) {
			throw Boom.internal(error)
		}

		// return token
		return { token: token.token, expiresAt: token.expiresAt.getTime() }
	},
}

/**
 * POST /users_registration/organization_details
 */
exports.setUserOrganizationDetails = {
	id: 'appcenter-users-registration-company-details',
	description: 'Adds the company details to the user registration',
	notes: [
		'Adds company details to the user registration',
	],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'401': { 'description': 'Unauthorized' },
				'409': { 'description': 'Conflict' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'registrationToken',
	},
	validate: {
		payload: Joi.object({
			name: Joi.string()
				.required()
				.example('BNP'),
			vat: Joi.string()
				.required()
				.example('1234567890'),
			website: Joi.string()
				.required()
				.example('www.bnp.com'),
			role: Joi.string()
				.required()
				.example('Developer'),
		}).label('companyInfo'),
	},
	handler: async (request, h) => {

		// Check if the registration is happening by invitation
		// Block if user was invited
		if (request.auth.artifacts.registrationTicket.get('invitation_id'))
			return Boom.badRequest('User was invited to a team')

		// Check if organization exists
		// const orgExists = await orgSrvc.isOrganizationRegistered(request.payload.name)

		// If already exists return the error
		// if (orgExists) return Boom.conflict('Organization already exists')

		// Add org data to user registration
		await userRegistrationSrvc.addOrganizationDetailsToRegistration(request.payload, request.auth.artifacts.registrationTicket.get('id'))

		// Return 204 no content
		return h.response().code(204)
	},
}

/**
 * POST /users_registration/security_details
 */
exports.setUserSecurityDetails = {
	id: 'appcenter-users-registration-security-details',
	description: 'Finalizes registration',
	notes: [
		'Creates the user',
		'Add security data to the user',
		'Enables 2fa',
	],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	auth: {
		strategy: 'registrationToken',
	},
	validate: {
		payload: Joi.object({
			password: Joi.string()
				.required()
				.example('P4ssword'),
			method: Joi.string()
				.valid('authorizationApp', 'authorizationSms')
				.required()
				.example('authorizationApp'),
			confirmationCode: Joi.string()
				.required()
				.example('665754'),
		}).label('securityInfo'),
	},
	pre: [
		{
			method: async (request) => {
				let pwdErrors = complexityUtil.validate(request.payload.password, config.get('pwdComplexity'))

				if (pwdErrors.length > 0) {
					log.error(pwdErrors)
					throw Boom.badRequest(pwdErrors)
				}

				return null
			},
		},
		// Validate 2fa
		{
			method: async (request) => {
				let validation = user2faSrvc.verifyTOTP(request.auth.artifacts.registrationTicket.get('totp_secret'), 'base32', request.payload.confirmationCode, request.payload.method)
				if (!validation)
					throw Boom.forbidden()

				return validation
			},
		},
	],
	handler: async (request) => {

		const invitationTicket = request.auth.artifacts.registrationTicket.related('invitation')
		const registrationTicket = request.auth.artifacts.registrationTicket.attributes


		let organization
		
		if (invitationTicket && invitationTicket.get('id')) {
			organization = await orgSrvc.getOrganization({ id: invitationTicket.get('organization_id') })
		} else {
			organization = await userRegistrationSrvc.createOrganization(registrationTicket)

			try {
				// Create organization container
				await sandboxAuthServer.createOrganizationContainer(organization.get('id'))
			} catch (error) {
				log.warn({ error }, 'Failed to store organization container name')
				await userRegistrationSrvc.removeRegistration(registrationTicket.id, organization.get('id'), null)
				throw Boom.internal('Failed to store organization container name')
			}
		}

		// Submits the user registration, creating all the final data and closing the registration ticket
		const { user } = await userRegistrationSrvc.submitUserRegistration(request.payload, registrationTicket, organization.get('id'), invitationTicket)

		// LOG USER_CREATE
		/*
		// ACTIVITYLOGUNCOMMENT
		await activityLog.log(
			user.get('id'),
			[organization.get('id')],
			'USER_CREATION',
			'user',
			`User ${ user.get('email') } was created.`,
		)
		*/
		
		try {
			const { codes } = await user2faSrvc.generateUserRecoveryCodes(user.get('id'))

			// Only send activation email if user was not invited
			if (!invitationTicket || !invitationTicket.get('id')) {
				// Generate activation code
				const userActivationTicket = await userSrvc.generateUserActivationTicket(user.get('id'))

				// Send activation code over email
				await emailService.sendUserAccountActivationCode(request.auth.artifacts.registrationTicket.get('email'), userActivationTicket.get('activation_code'))
			}

			return {
				user: user.toJSON({ hidden: ['password'] }),
				codes,
			}
		} catch (error) {
			log.warn({ error }, 'Failed to finalise user registration')
			userRegistrationSrvc.removeRegistration(registrationTicket.id, organization.get('id'), user.get('id'))
			throw Boom.internal('Failed to finalise user registration')
		}
	},
}

/**
 * GET /users_registration/2fa/qrcode handler
 * Generates and returns the qrcode to link with the TOTP App
 */
exports.generateQRCode = {
	id: 'appcenter-user-qrcode-generation',
	description: 'Generates and returns the qrcode to link with the TOTP App',
	notes: ['Generates the qrcode base upon the user_registrarion email and secret'],
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
		strategy: 'registrationToken',
	},
	handler: async (request) => {
		const email = request.auth.artifacts.registrationTicket.get('email')
		const secret = request.auth.artifacts.registrationTicket.get('totp_secret')

		try {
			return await user2faSrvc.generateQRCode(email, secret, 'base32', 'Appcenter')
		} catch (error) {
			return Boom.badData(error.message)
		}
	},
}

/** handler for POST /users_registration/sms_code endpoint */
exports.sendSmsCode = {
	id: 'appcenter-user-registration-sms-code',
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
	auth: {
		strategy: 'registrationToken',
	},
	handler: async (request) => {
		const ticket = request.auth.artifacts.registrationTicket
		let code = user2faSrvc.generateTOTPToken(ticket.getDecryptedSecret(), 'base32', ticket.get('email'), 'Appcenter')

		try {
			const smsCredentials = await request.server.app.cache.get('smsGatewayCredentials')
			return await smsService.sendTwoFactorAuthSms(ticket.get('phone_number'), code, smsCredentials)
		} catch (err) {
			log.warn(err, 'Failed to send SMS code')

			// When phone number is invalid
			if (err.code === 21211)
				return Boom.badRequest(err.message)
			else
				return Boom.internal()
		}
	},
}
