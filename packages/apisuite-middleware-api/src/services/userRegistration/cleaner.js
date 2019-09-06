const registrationServices = require('./index')

exports = module.exports = {}

/**
 * Attempt to remove expired registration tickets everyday, once a day
 * @async
 * @throws {Error}				- An error if db call fails
 * @returns	{Void}				-
 */
exports.startCleaningSchedule = async () => {
	// Clean once called
	await registrationServices.removeExpiredRegistrationTickets()

	// Try to clean again in 1 day
	setInterval( async () => {
		await registrationServices.removeExpiredRegistrationTickets
	}, 86400)
}
