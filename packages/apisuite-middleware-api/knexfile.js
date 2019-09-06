// Database configuration is in the config.js file.
const config = require('./src/config')

/** Contains necessary configuration for knex. */

const knexConfig = {
	client: 'mysql',
	connection: {
		...config.get('database').options,
		typeCast: (field, next) => {
			// cast TINYINT to boolean so we don't need to do it in the model serialize
			if (field.type == 'TINY' && field.length == 1) {
				return (field.string() == '1')
			}
			return next()
		},
	},
	pool: config.get('database').pool,
	acquireConnectionTimeout: config.get('database').acquireConnectionTimeout,
}

module.exports = {
	default: knexConfig,
	development: knexConfig,
	test: knexConfig,
	staging: knexConfig,
	production: knexConfig,
}
