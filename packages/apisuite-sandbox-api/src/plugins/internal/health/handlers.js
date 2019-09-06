const hal = require('./hal')

exports = module.exports = {}

/** handler for /healthcheck endpoint */
exports.healthCheck = {
	handler: async (request, h) => {
		return h.response({ status: 'OK' }).code(200)
	},
	id: 'appcenter-health-check',
	description: 'health check endpoint',
	notes: ['It checks if the api is able to connect to the database'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'OK' },
				'503': { 'description': 'Service Unavailable' },
			},
		},
		'hal': hal.health,
	},
}
