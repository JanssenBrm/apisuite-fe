const userRegistrationSrvc = require('../../services/userRegistration')

exports = module.exports = {}

exports.registrationToken = {
	validate: async (request, token) => {
		try {
			if (!token) throw new Error('No token present')

			const registrationTicket = await userRegistrationSrvc.validateRegistrationToken(token)
			return { isValid: true, credentials: { token }, artifacts: { registrationTicket }}
		} catch (err) {
			return { isValid: false, credentials: {}, artifacts: {} }
		}
	},
}
