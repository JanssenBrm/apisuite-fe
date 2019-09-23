'use strict'

const config = require('./config')
const log = require('./utils/logger')
const server = require('./server')
// const schedulersService = require('./services/schedulers')

/**
 * Creates hapijs server, loads all plugins and start the server
 * @throws an error if plugin registration fails or server fails to start
 * @returns {Void} This function does not return a value
 */
async function start() {

	log.fatal('##### Starting Sandbox API #####')

	const plugins = config.get('plugins').map(plugin => require(plugin))

	await server.register(plugins)

	await server.start()

	log.info('All plugins were loaded successfuly')

	log.info('apisuite-sandbox-api is up and running on port %s', config.get('server').port)

}

start()

// schedulersService.startPaymentsExecutionScheduler()

module.exports = server
