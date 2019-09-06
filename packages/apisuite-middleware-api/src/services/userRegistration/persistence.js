const bookshelf = require('../../utils/bookshelf')

// Models
const UserRegistrationTicket = require('../../models/UserRegistrationTicket')
const UserInvitationTicket = require('../../models/UserInvitationTicket')
const User = require('../../models/User')
const UserTwoFa = require('../../models/UserTwoFa')
const Organization = require('../../models/Organization')

const userSrvc = require('../user')


exports = module.exports = {}

/**
 * Returns the query to to create the registration ticket
 * @param		{Object}	registrationData		- User details
 * @returns {Promise}											- Query promise
 */
exports.createRegistrationTicket = (registrationData) => {
	return UserRegistrationTicket
		.create(registrationData)
}

/**
 * Returns the query to update a registration ticket by id
 * @param		{Object}	updateObject				- Update object with the details
 * @param		{String}	id									- Registration ticket id
 * @returns {Promise}											- Query promise
 */
exports.updateRegistrationTicket = (updateObject, id) => {
	return UserRegistrationTicket
		.update(updateObject, { id })
}

/**
 * Returns the query to retrieve the user registration ticket by registration token
 * @param		{String}	registrationCode		- Registration code
 * @returns {Promise}											- Query promise
 */
exports.getUserRegistrationTicket = (registrationCode) => {
	return UserRegistrationTicket
		.findOne({ registration_code: registrationCode }, { 
			withRelated: ['invitation'],
		})
}

/**
 * Returns the query to remove the registrationTicket by token
 * @param		{String}	registrationCode		- Registration code
 * @returns {Promise}											- Query promise
 */
exports.deleteRegistrationTicket = (registrationCode) => {
	return UserRegistrationTicket
		.deleteOne({ registration_code: registrationCode })
}

/**
 * Returns the query to remove all the expired registration tickets
 * @returns {Promise}					- Query promise
 */
exports.deleteExpiredRegistrationTickets = () => {
	return UserRegistrationTicket
		.deleteAllExpired()
}

/**
 * Returns the query to finalize a user registration in a transaction
 * @param		{Object}	registrationTicketObj			- Registration ticket object
 * @param		{Object}	securityDetails						- Security details object
 * @param		{String}	organizationId						- Organization id
 * @param		{String}	invitation								- If user was created via onboarding, should be upserted
 * @returns {Promise}														- Query promise
 */
exports.registerUser = (registrationTicketObj, securityDetails, organizationId, invitation) => {
	return bookshelf.transaction(async (trx) => {
		// Populate user table

		let user

		if (invitation && invitation.get('user_id')) {
			user = await User.update({ id: invitation.get('user_id') }, {
				email: invitation.get('email'),
				password: securityDetails.password,
				full_name: registrationTicketObj.full_name,
				phone_number: registrationTicketObj.phone_number,
				github_id: registrationTicketObj.github_id,
				activated: true,
				terms_accepted_at: new Date(),
			},
			{ transacting: trx })
		} else if (invitation && invitation.get('id')) {
			// user is invited but doesn't exist so create it and activate it
			user = await User.create({
				email: invitation.get('email'),
				password: securityDetails.password,
				full_name: registrationTicketObj.full_name,
				phone_number: registrationTicketObj.phone_number,
				github_id: registrationTicketObj.github_id,
				activated: true,
				terms_accepted_at: new Date(),
			},
			{ transacting: trx })
		} else {
			user = await User.create({
				email: registrationTicketObj.email,
				password: securityDetails.password,
				full_name: registrationTicketObj.full_name,
				phone_number: registrationTicketObj.phone_number,
				github_id: registrationTicketObj.github_id,
				terms_accepted_at: new Date(),
			},
			{ transacting: trx })
		}

		// Populate user_two_fa table
		await UserTwoFa.create({
			user_id: user.get('id'),
			secret: registrationTicketObj.totp_secret,
			verified: 1,
			method: securityDetails.method,
		}, { transacting: trx })

		await user.organizations().attach({ organization_id: organizationId, role: registrationTicketObj.organization_role }, { transacting: trx })
		await userSrvc.addUserOrganizationRole(user.get('id'), organizationId, invitation.get('role_id') || 1, { transacting: trx })

		await UserRegistrationTicket.destroy({ id: registrationTicketObj.id }, { transacting: trx })

		if (invitation && invitation.get('id'))
			await UserInvitationTicket.destroy({ id: registrationTicketObj.invitation_id }, { transacting: trx })

		return { user }
	})
}

exports.registerOrganization = async (registrationTicketObj) => {
	// Populate organization and user_organization tables
	return await Organization.create({
		name: registrationTicketObj.organization_name,
		vat_number: registrationTicketObj.organization_vat,
		website: registrationTicketObj.organization_website,
	})
}
