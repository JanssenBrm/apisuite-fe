const logger = require('../../../utils/logger')

/**
 * good hapi plugin that automatic logs API requests.
 * @module plugins/internal/good
 */

/** Plugin with its configurations to be loaded into hapi */
module.exports = {
	plugin: require('good'),
	options: {
		reporters: {
			bunyan: [{
				module: 'good-bunyan',
				args: [
					{ response: '*', log: '*', error: '*', request: '*' },
					{
						logger: logger,
						levels: {
							response: 'info',
						},
						formatters: {
							response: (data) => {
								return '[response] ' + data.statusCode + ' ' + data.method.toUpperCase() + ' ' + data.path
							},
						},
					},
				],
			}],
		},
	},
}
