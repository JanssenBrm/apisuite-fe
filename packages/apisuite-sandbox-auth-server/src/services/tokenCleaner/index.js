const authService = require('../../services/oauth')
const config = require('../../../config')
const logger = require('../../utils/logger')

exports = module.exports = {}

exports.startTokenCleaningSchedule = async () => {
	logger.info('Cleaning expired Access Tokens, Refresh Tokens and Authorization Codes')
	const interval = config.get('tokenCleaner').interval
	await authService.removeExpiredTokens()
	logger.info('Expired tokens were cleaned.')
	setInterval( async () => {
		logger.info('Cleaning expired Access Tokens, Refresh Tokens and Authorization Codes every ' + interval + ' ms')
		await authService.removeExpiredTokens()
		const nextRun = new Date(new Date().getTime() + interval)
		logger.info('Expired tokens where cleaned. Next run will happen at ' + nextRun)
	}, interval )
}
