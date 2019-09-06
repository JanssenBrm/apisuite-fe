const invitationServices = require('./index')
const emailServices = require('../email')

exports = module.exports = {}

/**
 * Process loop
 * 
 * @async
 * @throws {Error}				- An error if db call fails
 * @returns	{Void}				-
 */
exports.startPostponedInvitationsSchedule = async () => {
	// Clean once called
	await processPostponedTickets()

	// Try to clean again in 1 day
	setInterval( async () => {
		await processPostponedTickets()
	}, 86400000)
}

/**
 * Attempt to resend email for all postponed invitations
 * 
 * @async
 * @throws {Error}				- An error if db call fails
 * @returns	{Void}				-
 */
async function processPostponedTickets() {
	const postponedTicketsForToday = await invitationServices.getPostponedTicketsForToday()
	postponedTicketsForToday.forEach(async (postponedTicket) => {
		await Promise.all([
			emailServices.sendUserInvitationLink(postponedTicket.get('invitation_code'), postponedTicket.get('email')),
			invitationServices.removePostponedDate(postponedTicket.get('id')),
		])
	})
}
