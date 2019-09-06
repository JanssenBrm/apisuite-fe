const hapiswagger = require('hapi-swagger')

const config = require('../../../config')

/**
 * Swagger hapi plugin to auto generate swagger documentation based on code. Should be disabled in production.
 * @module plugins/internal/swagger
 */

const swaggerConfig = config.get('swagger')

/** Plugin with its configurations to be loaded into hapi */
module.exports = {
	plugin: hapiswagger,
	options: {
		schemes: [swaggerConfig.scheme],
		host: swaggerConfig.host,
		info: {
			title: 'Sandbox API Documentation',
			version: '0.0.1',
		},
		documentationPath: '/info/swagger',
	},
}
