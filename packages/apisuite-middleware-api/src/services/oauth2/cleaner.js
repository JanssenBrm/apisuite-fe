// $lab:coverage:off$
// That is an async file that uses node-cron to run queries to delete expired tokens.
// For now, test coverage is disable for this file
const cron = require('node-cron')
const config = require('../../config')
const dbMethods = require('./db_methods')
const time = config.get('oauth2').db_timeToCheckExpiredTokens
const log = require('../../utils/logger')

exports = module.exports = {}

exports.startCleaningSchedule = () => {

	const hrs = Math.floor(time / 3600)
	const mins = Math.floor((time % 3600) / 60)

	let scheduleTime = `*/${mins} * * * *`

	if (hrs > 0) {
		scheduleTime = `0 */${hrs} * * *`
	}

	log.info(`Starting Cleaning Schedule ${scheduleTime} ${hrs > 0 ? 'hours' : 'mins'}`)

	cron.schedule(scheduleTime, () => {
		dbMethods.accessTokens.removeExpired().then(() => { }).catch((err) => {
			log.error(err)
		})
	})

}
// $lab:coverage:on$
