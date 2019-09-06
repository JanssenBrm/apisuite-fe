// Database configuration is in the config.js file.
const config = require('./config')

/** Contains necessary configuration for knex. */

const knexConfig = {
	client: 'mysql',
	connection: config.get('database').options,
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
