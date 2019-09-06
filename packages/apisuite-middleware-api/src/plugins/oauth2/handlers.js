const boom = require('boom')
const joi = require('joi')
const wreck = require('wreck')
const log = require('../../utils/logger')
const config = require('../../config')

const tokenRequestSchemas = require('./schemas').tokenRequestSchemas

const oauth2Srvc = require('../../services/oauth2')
const emailSrvc = require('../../services/email')
const userSrvc = require('../../services/user')
const user2faSrvc = require('../../services/user2fa')
const smsSrvc = require('../../services/sms')
//const activityLog= require('../../utils/activity-log')

exports = module.exports = {}

exports.revokeAccessToken = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		payload: {
			token: joi.string(), // to be removed, just make sure frontend dependencies are updated
		},
	},
	handler: async (request, h) => {

		await oauth2Srvc.revokeToken(request.auth.credentials.token)
			.catch((err) => {
				log.error(err, 'Failed to revoke token')
				throw boom.internal()
			})

		return h.response().code(200)
	},
	id: 'appcenter-oauth-access-token-revoke',
	tags: ['api'],
}

exports.tokenRequestHandler = {
	auth: {
		strategy: 'oauth2Basic',
	},
	// For the moment only password flow is implemented
	validate: {
		payload: joi.alternatives().try(tokenRequestSchemas),
	},
	handler: async (request) => {
		// Find user by email
		const user = await userSrvc.findUser({ email: request.payload.username }, {
			withRelated: ['scopes', 'tfa'],
			require: false,
		})
			.catch((error) => {
				log.error({ error }, 'Password flow: Failed to retrieve user')
				throw boom.internal()
			})

		if (!user) {
			log.debug({ email: request.payload.username, clientId: request.auth.artifacts.oauthClient.get('client_id') }, 'User not found')
			throw boom.unauthorized()
		}

		// Validate the password
		const isPasswordCorrect = await user.comparePassword(request.payload.password)
			.catch((error) => {
				log.error({ error }, 'Password flow: Failed to compare user password')
				throw boom.internal()
			})

		if (!isPasswordCorrect) {
			log.debug({ email: request.payload.username, clientId: request.auth.artifacts.oauthClient.get('client_id') }, 'Password flow: Password validation failed')
			throw boom.unauthorized()
		}

		// Validate if the user has the required scopes
		if (!user.hasScopes(request.auth.artifacts.oauthClient.getScopes())) {
			log.debug({ email: request.payload.username, clientId: request.auth.artifacts.oauthClient.get('client_id') }, 'Password flow: User doesnt have permissions to use this client')
			throw boom.unauthorized('Insuficient permissions')
		}

		// If user doesn't have a 2fa secret, create token and return
		const scope = user.related('scopes').toJSON().map(scope => scope.name).join()
		if (!user.related('tfa').get('secret')) {
			return await oauth2Srvc.flows.password(user.get('id'), request.auth.artifacts.oauthClient.get('client_id'), scope)
		}

		const token = await user2faSrvc.generate2FAToken(user.get('id'), scope)

		// If the 2fa method is sms auth, send generate and send the sms with the code
		if (user.related('tfa').get('method') === 'authorizationSms') {

			// If method is sms, send sms code
			let code = user2faSrvc.generateTOTPToken(user.related('tfa').getDecryptedSecret(), 'base32', request.payload.username, 'Appcenter')

			// Send sms with code
			await smsSrvc.sendTwoFactorAuthSms(user.get('phone_number'), code)
				.catch((err) => {
					log.error(err, 'Failed to send SMS code')

					// When phone number is invalid
					if (err.code === 21211)
						throw boom.badRequest(err.message)
					else
						throw boom.internal()
				})
		}

		return {
			access_token: token,
			token_type: 'bearer',
			two_factor_authentication: true,
			two_factor_authentication_method: user.related('tfa').get('method'),
		}
	},
	id: 'appcenter-oauth2-access-token',
	tags: ['api'],
}

/**
 * Recover password handler
 * POST /forgot
 */
exports.forgotPassword = {
	validate: {
		payload: {
			email: joi.string().email().required(),
		},
	},
	handler: async (request, h) => {

		try {

			const token = await oauth2Srvc.generateRecoveryToken(request.payload.email)

			await emailSrvc.sendRecoverPassword(request.payload.email, token)

		} catch (err) {
			log.error(err)
		}

		return h.response().code(200)

	},
	id: 'appcenter-forgot-password',
	tags: ['api'],
}

/**
 * Recover password handler
 * POST /recover
 */
exports.recoverPassword = {
	auth: {
		strategy: 'recoveryToken',
	},
	validate: {
		payload: {
			password: joi.string().required().min(8).example('secretpass'),
		},
	},
	handler: async (request, h) => {

		await userSrvc.recoverPassword(request.auth.artifacts.user.id, request.payload.password)

		return h.response().code(200)

	},
	id: 'appcenter-recover-password',
	tags: ['api'],
}

exports.githubAuth = {
	auth: {
		strategy: 'github',
	},
	handler: async (request, h) => {

		if (!request.auth.isAuthenticated) {
			return h.response().code(401)
		}

		const token = request.auth.credentials.token

		const profile = request.auth.credentials.profile

		let user = {
			email: profile.email,
			fullName: profile.displayName || profile.username,
			avatar: profile.raw.avatar_url,
			githubID: profile.id,
		}

		if (!profile.raw.two_factor_authentication) {
			throw boom.unauthorized('github 2F authentication must be enabled')
		}

		if (!user.email) {
			const { res, payload } = await wreck.get('https://api.github.com/user/emails', {
				headers: {
					'User-Agent': 'appcenter',
					'Authorization': `Bearer ${token}`,
				},
			})

			if (res.statusCode !== 200) {
				log.error(res.statusCode, payload)
				throw boom.serverUnavailable()
			}

			const email = JSON.parse(payload)

			const primaryEmail = email.find((info) => {
				return info.primary && info.verified
			})

			if (!primaryEmail) {
				throw boom.unauthorized('could not find a primary and verified email address associated with this github account')
			}

			user.email = primaryEmail.email
		}

		const result = await userSrvc.upsertGithub(user.githubID, user.email, user.fullName, user.avatar)

		const localUser = await userSrvc.getByGithubID(user.githubID)

		const tokenData = await oauth2Srvc.generateTokenNoPass(localUser.id)

		
		if (!result) {
			/*
			// ACTIVITYLOGUNCOMMENT
			await activityLog.log(
				localUser.id,
				null,
				'USER_LOGIN',
				'user',
				`User ${ user.email } has logged in using Github authentication`,
			)
			*/
			return h.redirect(`${config.get('appcenter').url}/github?access_token=${tokenData.token}`)
		}

		return h.redirect(`${config.get('appcenter').url}/signup?access_token=${tokenData.token}&next=org_details`)

	},
	id: 'appcenter-auth-github',
	tags: ['api'],
}

exports.tfaAuth = {
	auth: {
		strategy: 'token2FA',
	},
	validate: {
		payload: joi.object({
			pass: joi.string().regex(/^\d+$/),
		}).label('2faPassAuth'),
	},
	handler: async (request) => {
		const user2fa = await user2faSrvc.getUser2faData(request.auth.artifacts.user.id)

		if (!user2fa) {
			log.warn('Failed to locate user 2fa secret')
			return boom.forbidden()
		}

		const valid = user2faSrvc.verifyTOTP(user2fa.get('secret'), 'base32', request.payload.pass, user2fa.get('method'))

		if (!valid) {
			log.warn('User 2fa validation failed')
			throw boom.forbidden()
		}

		const user = await userSrvc.findUser({ id: request.auth.artifacts.user.id }, {
			withRelated: ['scopes', 'tfa', 'organizations'],
			require: false,
		})
		const scope = user.related('scopes').toJSON().map(scope => scope.name).join(',')



		// LOG USER_LOGIN

		/*
		// ACTIVITYLOGUNCOMMENT
		const organizations = user.related('organizations').toJSON()	
		await activityLog.log(
			request.auth.artifacts.user.id,
			organizations.map(o => o.id),
			'USER_LOGIN',
			'user',
			`User ${ request.auth.artifacts.user.email} has logged in`,
		)
		
		*/

		return await oauth2Srvc.flows.password(request.auth.artifacts.user.id, null, scope)
	},
	id: 'appcenter-auth-2fa',
	tags: ['api'],
}

exports.tfaAuthValidate = {
	auth: {
		strategy: 'appcenterToken',
	},
	validate: {
		payload: joi.object({
			pass: joi.string().regex(/^\d+$/),
		}).label('2faPassAuth'),
	},
	handler: async (request) => {
		const user2fa = await user2faSrvc.getUser2faData(request.auth.artifacts.user.id)

		if (!user2fa) {
			log.warn('Failed to locate user 2fa secret')
			return boom.forbidden()
		}

		const valid = user2faSrvc.verifyTOTP(user2fa.get('secret'), 'base32', request.payload.pass, 'authorizationSms')

		if (!valid) throw boom.badRequest('TOTP is invalid')

		return valid
	},
	id: 'appcenter-auth-2fa-validate',
	tags: ['api'],
}
