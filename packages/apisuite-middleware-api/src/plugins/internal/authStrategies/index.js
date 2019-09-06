const oauth2Srvc = require('../../../services/oauth2')
const oauthClientSrvc = require('../../../services/oauthClient')
const onBoardingSrvc = require('../../../services/onBoarding')
const log = require('../../../utils/logger')
const config = require('../../../config')

exports = module.exports = {}

exports.plugin = {
	register: (server) => {

		server.auth.strategy('oauth2Basic', 'bearer-access-token', {
			tokenType: 'Basic',
			validate: async (request, token) => {
				try {
					if (!token) throw new Error('No token present')
					const oauthClient = await oauthClientSrvc.validateClientToken(token)
					return { isValid: true, credentials: { token }, artifacts: { oauthClient }}

				} catch (err) {
					return { isValid: false, credentials: {}, artifacts: {} }
				}
			},
		})

		// Bearer strategy
		server.auth.strategy('appcenterToken', 'bearer-access-token', {
			validate: async (request, token) => {

				try {
					const foundToken = await oauth2Srvc.validateBearerToken(token)

					if (!foundToken.token.related('user').get('id'))
						throw new Error('User does not exist anymore')

					return {
						isValid: true,
						credentials: {
							token,
							scope: foundToken.token.getScopes(),
							roles: foundToken.roles,
						},
						artifacts: {
							user: foundToken.token.related('user'),
						},
					}

				} catch (err) {
					log.warn(err, 'Failed to validate token')
					return { isValid: false, credentials: {}, artifacts: {} }
				}

			},
		})

		// Onboarding strategy
		server.auth.strategy('onboardingToken', 'bearer-access-token', {
			validate: async (request, token) => {

				try {
					const foundToken = await onBoardingSrvc.validateBearerToken(token)

					if (!foundToken.token.related('user').get('id'))
						throw new Error('User does not exist anymore')

					return {
						isValid: true,
						credentials: { token },
						artifacts: { user: foundToken.token.related('user') },
					}

				} catch (err) {
					log.warn(err, 'Failed to validate token')
					return { isValid: false, credentials: {}, artifacts: {} }
				}

			},
		})

		// Password recovery strategy
		server.auth.strategy('recoveryToken', 'bearer-access-token', {
			validate: async (request, token) => {

				try {
					const user = await oauth2Srvc.validateRecoveryToken(token)
					return { isValid: true, credentials: { token: token }, artifacts: user }
				} catch (err) {
					return { isValid: false, credentials: {}, artifacts: {} }
				}

			},
		})

		server.auth.strategy('token2FA', 'bearer-access-token', {
			validate: async (request, token) => {

				try {
					const user = await oauth2Srvc.validate2FAtoken(token)
					return { isValid: true, credentials: { token: token }, artifacts: user }
				} catch (err) {
					log.error(err)
					return { isValid: false, credentials: {}, artifacts: {} }
				}

			},
		})

		//github
		server.auth.strategy('github', 'bell', {
			provider: 'github',
			clientId: config.get('github').app.client_id,
			clientSecret: config.get('github').app.client_secret,
			password: 'temp-pass-sdasodjosaeodejfiepwjfew-efoofejwofjewoif-ewfkeowjfoiewjf-ewfew',
			location: config.get('appcenter').api,
			isSecure: false,     // set true for production
			scope: ['user'],
		})

	},
	name: 'appcenter-oauth-strategies',
}
