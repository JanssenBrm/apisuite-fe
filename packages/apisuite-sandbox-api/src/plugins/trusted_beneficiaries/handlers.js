const logger = require('../../utils/logger')
const Boom = require('boom')

exports = module.exports = {}

/**
 * @memberof module:plugins/trusted_beneficiaries
 */

// Not need atm
exports.getTrustedBeneficiaries = {
	response: {},
	handler: async (request, h) => {
		try {
			return h.response().code(200)
		} catch (error) {
			logger.error(error)
			throw Boom.internal(error.message)
		}
	},
	id: 'sandbox-api-get-trusted-beneficiaries',
	description: 'DESCRIPTION HERE',
	tags: ['sandbox-api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
			},
		},
	},
}
