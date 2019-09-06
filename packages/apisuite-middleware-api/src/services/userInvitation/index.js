const crypto = require('crypto')
const UserInvitationTicket = require('../../models/UserInvitationTicket')

exports = module.exports = {}

/**
 * Creates an invitation ticket for non registered users
 *
 * @async
 * @param		{Object}	invitationData		- Invitation data
 * @param		{Object}	opts							- Query options
 * @throws	{Error}											-	Throws an error if fails to create token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.createInvitationTicket = async (invitationData = {}, opts) => {
	const buffer = crypto.randomBytes(48)
	
	invitationData.expiration_date = new Date(new Date().getTime() + 432000000)
	invitationData.invitation_code = buffer.toString('hex')

	// Create invitation
	return await UserInvitationTicket.upsert({ email: invitationData.email }, invitationData, opts)
}

/**
 * Update invitation ticket
 *
 * @async
 * @param		{Object}	invitationId			- Invitation id
 * @param		{Object}	opts							- Options
 * @throws	{Error}											-	Throws an error if fails to retrieve token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.postponeInvitation = async (invitationId, opts = {}) => {
	opts.id = invitationId

	return await UserInvitationTicket.update({
		postpone_for: new Date(new Date().getTime() + 604800000),
	}, opts)
}

/**
 * Remove postponed_for from invitation ticket
 *
 * @async
 * @param		{Object}	invitationId			- Invitation id
 * @param		{Object}	opts							- Options
 * @throws	{Error}											-	Throws an error if fails to retrieve token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.removePostponedDate = async (invitationId, opts = {}) => {
	opts.id = invitationId

	return await UserInvitationTicket.update({
		postpone_for: null,
	}, opts)
}

/**
 * Get invitation tickets that were postpoed for today
 *
 * @async
 * @param		{Object}	opts							- Options
 * @throws	{Error}											-	Throws an error if fails to retrieve token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.getPostponedTicketsForToday = async (opts = {}) => {
	return await UserInvitationTicket.findAll({ postpone_for: new Date().toISOString().slice(0,10) }, opts)
}

/**
 * Get invitation ticket
 *
 * @async
 * @param		{Object}	invitationToken		- Invitation token
 * @param		{Object}	opts							- Options
 * @throws	{Error}											-	Throws an error if fails to retrieve token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.getInvitationTicketByToken = async (invitationToken, opts = {}) => {
	return await UserInvitationTicket.findOne({ invitation_code: invitationToken }, opts)
}

exports.deleteInvitationTicket = async (id) => {
	return await UserInvitationTicket.destroy({ id })
}

/**
 * Get organization invitation tickets
 *
 * @async
 * @param		{Integer}	orgId							- Organization id
 * @throws	{Error}											-	Throws an error if fails to retrieve token
 * @returns	{UserInvitationTicket}			- Returns an UserInvitationTicket model
 */
exports.getOrganizationTickets = async (orgId) => {
	return await UserInvitationTicket.findAll({ organization_id: orgId })
}
