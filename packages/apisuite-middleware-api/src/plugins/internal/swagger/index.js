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
			title: 'AppCenter API Documentation',
			version: '1.1.0',
		},
		securityDefinitions: {
			api_key: {
				type: 'apiKey',
				name: 'authorization',
				in: 'header',
			},
			appcenter_auth: {
				type: 'oauth2',
				tokenUrl: 'http://localhost:3000/oauth2/token',
				flow: 'password',
				scopes: {
					'full:access': 'full access',
				},
			},
		},
		documentationPath: '/info/swagger',
	},
}
