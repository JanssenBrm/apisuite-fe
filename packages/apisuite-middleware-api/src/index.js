'use strict'

const config = require('./config')

const log = require('./utils/logger')

const server = require('./server')

const cleaner = require('./services/oauth2/cleaner')
const registrationTokenCleaner = require('./services/userRegistration/cleaner')
const invitationPostpone = require('./services/userInvitation/postponeService')

const logger = require('./utils/logger')
const smsService = require('./services/sms')
const Boom = require('boom')

/**
 * Creates hapijs server, loads all plugins and start the server
 * @throws an error if plugin registration fails or server fails to start
 * @returns {Void} This function does not return a value
 */
async function start() {

	log.fatal('##### Starting APISuite Middleware API #####')

	const plugins = config.get('plugins').map(plugin => require(plugin))

	await server.register(plugins)

	await server.start()

	log.info('All plugins were loaded successfuly')

	log.info('apisuite-middleware-api is up and running on port %s', config.get('server').port)

	cleaner.startCleaningSchedule()
	registrationTokenCleaner.startCleaningSchedule()
	invitationPostpone.startPostponedInvitationsSchedule()
	smsCredentialsInit()
}

/**
 * @returns {Void} -
 */
const smsCredentialsInit = async () => {
	logger.info('Connecting to the SMS Gateway Provider. Retrieving Token')
	const credentials = await smsService.connect()

	if (credentials && credentials.error) {
		logger.error('Failed to connect to SMS Gateway: ', credentials.error)
		throw Boom.unauthorized(credentials.error)
	}

	if (credentials) {
		logger.info('Setting SMS Gateway Credentials in cache')

		const expires = new Date(0)
		expires.setUTCSeconds(credentials.expiration)
		credentials.expiration = expires

		server.app.cache.set('smsGatewayCredentials', credentials)


		logger.info('SMS Credentials Expire at: ', credentials.expiration)

	}

	logger.info('Finished loading SMS Gateway plugin.')

}

start()

module.exports = server
