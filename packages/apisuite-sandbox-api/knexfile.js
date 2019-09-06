// Database configuration is in the config.js file.
const config = require('./src/config')
const client = config.get('database').client

const knexConfig = {
	client,
	connection: {
		filename: process.env.OPENBANK_SANDBOX_DB || 'sandboxdb.sqlite',
	},
	useNullAsDefault: true,
	pool: {
		afterCreate: (conn, cb) => {
			conn.run('PRAGMA foreign_keys = ON', cb)
		},
	},
}


// Is overriden by convict env var config, just requires the default value to be read
module.exports = {
	default: knexConfig,
	development: knexConfig,
}
