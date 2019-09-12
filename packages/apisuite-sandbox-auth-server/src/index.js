const config = require('../config')
const log = require('./utils/logger')
const server = require('./server')
const tokenCleanerService = require('./services/tokenCleaner')
/**
 * Creates hapijs server, loads all plugins and start the server
 * @throws an error if plugin registration fails or server fails to start
 * @returns {Void} This function does not return a value
 */
async function start () {

	log.fatal('##### Starting Sandbox Auth Server #####')

	const plugins = config.get('plugins').map(plugin => require(plugin))

	await server.register(plugins)

	log.info('All plugins were loaded successfuly')

	await server.start()
	log.info('apisuite-sandbox-auth-server is up and running on port %s', config.get('server').port)
}

start()

tokenCleanerService.startTokenCleaningSchedule()
