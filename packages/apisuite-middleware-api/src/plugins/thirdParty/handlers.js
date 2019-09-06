const Joi = require('joi')
const Boom = require('boom')
const methods = require('./methods')

const onBoardingService = require('../../services/onBoarding')
const userSrvc = require('../../services/user')
const orgSrvc = require('../../services/organization')
const sandboxAuthServer = require('../../services/sandboxAuthServer')
const emailSrvc = require('../../services/email')
const log = require('../../utils/logger')

exports = module.exports = {}

/**
 * @memberof module:plugins/thirdparty
 */

/**
 * POST /third-party
 */
exports.onBoardingRegistration = {
	id: 'openbank-third-party-onboarding-registration',
	description: 'Register a client by way of a JSON in the body of the request',
	notes: ['Endpoint will be secured by way of Mutual Authentication over TLS'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'201': { 'description': 'Created' },
				'400': { 'description': 'Not Found' },
			},
		},
	},
	auth: {
		strategy: 'onboardingToken',
	},
	validate: {
		failAction: async (request, h, err) => {
			log.info('\n\n[updateProduct] ValidationError:', err.message)
			throw Boom.badRequest('Invalid request payload input: ' +  err.message)
		},
		payload: {
			clientName: Joi.string()
				.min(1).max(50)
				.description('Name linked to the client/application of the TPP.')
				.required(),
			clientDescription: Joi.string()
				.min(1).max(250)
				.description('Description of the client/application of the TPP.')
				.required(),
			clientVersion: Joi.string()
				.min(1).max(10)
				.description('Registered version number of the TP client/application'),
			uri: Joi.string()
				.min(1).max(256)
				.description('Domain name of registered client/application')
				.required(),
			redirectUris: Joi.array().items(
				Joi.string()
					.min(1).max(256))
				.description('TPP\'s registered call-back endpoints. Currently, it is only possible to store a single redirect uri')
				.required(),
			clientContacts: Joi.object().keys({
				contactType: Joi.string()
					.valid('Admin', 'Developer', 'Business', 'Operational')
					.description('The type of contact (TP Admin, Developer, Business, Operational, ...) linked to the client/application of the TPP.')
					.required(),
				firstName: Joi.string()
					.regex(/^[A-Za-z]{1,40}$/)
					.description('The first name of the contact person linked to the client/application of the TPP')
					.required(),
				lastName: Joi.string()
					.regex(/^[A-Za-z]{1,60}$/)
					.description('The last name of the contact person linked to the client/application of the TPP')
					.required(),
				email: Joi.string()
					.email()
					.description('The email of the contact person linked to the client/application of the TPP')
					.required(),
				phone: Joi.string()
					.regex(/^[0-9]{1,15}$/)
					.description('The phone of the contact person linked to the client/application of the TPP')
					.required(),
			}),
			tppContacts: Joi.object().keys({
				phone: Joi.string()
					.regex(/^[0-9]{1,15}$/)
					.description('Phone number linked to TPP'),
				email: Joi.string()
					.email()
					.description('Email linked to TPP'),
				website: Joi.string()
					.min(1).max(256)
					.description('Website linked to TPP'),
			}),
		},
		headers: {
			'request-id': Joi.string()
				.description('The request-id needed for the JWS handling')
				.required(),
			'x-jws-signature': Joi.string()
				.description('This header is expected as a JWT which is structured as a JWS. This JWT should contain the JWS representation of the information that is provided in the body of the request. The following JWT can serve as an example. "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjbGllbnROYW1lIjoiYXBwbGljYXRpb24iLCJjbGllbnREZXNjcmlwdGlvbiI6InRoaXMgYXBwbGljYXRpb24gaXMgdXNlZCB0byBkbyBhIHBheW1lbnQiLCJjbGllbnRWZXJzaW9uIjoidjEuMCIsInVyaSI6Imh0dHBzOi8vd3d3LmdldHBvc3RtYW4uY29tL29hdXRoMiIsInJlZGlyZWN0VXJpIjoiaHR0cHM6Ly93d3cuZ2V0cG9zdG1hbi5jb20vb2F1dGgyL2NhbGxiYWNrIiwiY2xpZW50Q29udGFjdHMiOnsiY29udGFjdFR5cGUiOiJBZG1pbiIsImZpcnN0TmFtZSI6InRlc3QiLCJsYXN0TmFtZSI6InRlc3QgdGVzdCIsIm1haWwiOiIiLCJwaG9uZSI6IiJ9LCJ0cHBDb250YWN0cyI6eyJwaG9uZSI6IiIsImVtYWlsIjoidGVzdEB0ZXN0aW5nQGJucHBwYXJpYmFzZm9ydGlzLmNvbSIsIndlYnNpdGUiOiIifSwianRpIjoiYmY1NWViYzQtYzBlMi00Zjg5LTg1NDEtMDQ5ZTA4OWM3ODY2IiwiaWF0IjoxNTU2MjcyNzU4LCJleHAiOjE1NTYyODM0MTh9.ffGqLIVxeMY0YW0k53rsseR3N-bnaKiKvH2IiRDyvLc". The structure of this JWS is described by the body parameter "OnboardingInfo" and is based on RFC 7515.')
				.required(),
			'request-ctx-cert': Joi.string() // it should be placed on the header by the WAF
				.required(),
		},
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request, h) => {

		// Find user
		let user = await userSrvc.findUser({ email: request.payload.clientContacts.email })

		// Get inviter organizations, certificates included
		let orgs = await orgSrvc.listUserOrganizations(request.auth.artifacts.user.id)

		// The organization must exist already and be validated
		if (!orgs || !orgs.length || orgs[0].state === 'NON_VALIDATED')
			return Boom.badRequest('Organization in not ellegible for this request')

		// Get inviter roles
		let inviterRoles = await userSrvc.getUserOrganizationRoles(request.auth.artifacts.user.id, orgs[0].id)
		let adminRole = inviterRoles.find(o => o.name === 'ADMIN')

		// Inviter needs to be admin to perform the invitation
		if (!adminRole)
			throw Boom.forbidden('ADMIN required to perform the action')


		// If user exists, check if he belongs to the organization
		if (user) {
			const organization = await orgSrvc.getUserOrganization(user.get('id'), orgs[0].id)

			if (!organization || organization.related('users').length > 0)
				throw Boom.badRequest('User already belongs to the organization')
		}

		// Get org apps
		const apps = await sandboxAuthServer.listApps(orgs[0].id, {
			limit: 1,
			offset: 0,
		})
			.catch(() => {
				throw Boom.expectationFailed()
			})

		// If apps exist already, fail the request
		if (apps && apps.length && apps.length > 0)
			return Boom.badRequest('Organization has one app at least')

		try {
			// Onboard user
			let registration = await methods.onBoardUser(request.auth.artifacts.user.id, user, orgs[0], request.headers['request-ctx-cert'], request.payload)

			// Send invitation mail
			await emailSrvc.sendUserInvitationLink(registration.invitationTicket.get('invitation_code'), request.payload.clientContacts.email)


			const roles = [ ...new Set(registration.app.scopes.map((s) => s.scope.name))]
			const resp = {
				grantedRoles: roles,
				clientSecretExpiresAt: 0, // never expires
				ClientIdIssuedAt: Date.now(),
			}
			resp.clientId = registration.app.clientId
			resp.clientSecret = registration.app.clientSecret

			// Send with created
			return h.response(resp).code(201)

		} catch(e) {
			log.error(e, 'onBoardingRegistration')
			return Boom.internal()
		}
	},
}

/**
 * POST /onboarding/token
 */
exports.onBoardingToken = {
	id: 'openbank-third-party-onboarding-token',
	description: 'Generates an onboarding access token from a middleware token',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'401': { 'description': 'Unauthorized' },
			},
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request) => await onBoardingService.generateToken(request.auth.artifacts.user),
}
