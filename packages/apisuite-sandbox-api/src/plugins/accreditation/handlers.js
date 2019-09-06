const boom = require('boom')
const Joi = require('joi')
const accreditationService = require('../../services/accreditation')
const logger = require('../../utils/logger')

exports = module.exports = {}


exports.createAccreditation = {
	id: 'createAccreditation',
	description: 'creates accreditation',
	validate: {
		payload: Joi.object().keys({
			scope: Joi.string().required(),			
		}),
	},
	auth: {
		strategy: 'internal',
		scope: 'internal',
	},
	handler: async (request, h) => {
		
		const clientId = request.auth.credentials.clientId
		const userId = request.auth.credentials.userId
		const scope = request.payload.scope
		

		try {
			await accreditationService.createAccreditation(userId, clientId, scope)
		} catch (error) {
			logger.error(error)
			throw boom.internal(error.message)
		}

		return h.response().code(201)
	},
}
