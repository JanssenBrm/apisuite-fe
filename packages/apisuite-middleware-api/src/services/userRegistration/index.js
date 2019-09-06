const Boom = require('boom')
const crypto = require('crypto')
const bcrypt = require('bcrypt')

const config = require('../../config')
const cryptoUtils = require('../../utils/crypto')
const log = require('../../utils/logger')
const Bookshelf = require('../../utils/bookshelf')
const queries = require('./persistence')

const User = require('../../models/User')
const UserRegistrationTicket = require('../../models/UserRegistrationTicket')

const Organization = require('../../models/Organization')

const TOTP_KEY = config.get('twoFactor').totp_encryption_key

exports = module.exports = {}

/**
 * Module responsbile for all user registration services.
 * @module services/userRegistration
 */

/**
 * Validates if a registration token is valid
 * @async
 * @param {String} token 		- Registration token
 * @throws {Error}					- An error if fails
 * @returns	{Object}				- returns an object containing token and expiresAt
 */
exports.validateRegistrationToken = async (token) => {
	const userRegistration = await queries.getUserRegistrationTicket(token)

	// If user registration ticket wasn't found, throw authorization error
	if (!userRegistration)
		throw Boom.unauthorized()

	// If found but expired, remove before from db and throw the error
	if (new Date().getTime() >= new Date(userRegistration.get('expires_at')).getTime()) {
		await queries.deleteRegistrationTicket(token)
		throw Boom.unauthorized()
	}

	return userRegistration
}

/**
 * Creates user registration token
 * @throws {Error}							- An error if db call fails
 * @returns	{Object}						- returns an object containing token and expiresAt
 */
exports.createUserRegistrationToken = () => {
	const buffer = crypto.randomBytes(48)
	const expiresAt = new Date(new Date().getTime() + config.get('users').registrationCode.expiration * 1000)

	return {
		token: buffer.toString('hex'),
		expiresAt: expiresAt,
	}
}

/**
 * Creates user registration ticket and add user basic info
 * @async
 * @param {Object} userDetails			- User details object containing email, fullName and phoneNumber
 * @param {Object} token						- An object containing the token and the expiration date
 * @param {String} ipAddress 				- Caller ip address
 * @param {String} totpSecret 			- Caller ip address
 * @param {Object} invitationTicket	- An invitation ticket. When present, means user was invited
 * @throws {Error}									- An error if db call fails
 * @returns	{Object}								- returns an object containing token and expiresAt
 */
exports.createUserRegistration = async (userDetails, token, ipAddress, totpSecret, invitationTicket) => {

	let encryptedSecret
	try {
		encryptedSecret = cryptoUtils.encrypt(TOTP_KEY, totpSecret)
	} catch (error) {
		throw error
	}

	let full_name = (invitationTicket && !invitationTicket.get('user_id')) ? invitationTicket.get('user_name') : userDetails.fullName
	if (!full_name) {
		full_name = userDetails.fullName || ' '
	}

	await queries.createRegistrationTicket({
		invitation_id: (invitationTicket) ? invitationTicket.get('id') : null,
		email: userDetails.email,
		full_name,
		phone_number: userDetails.phoneNumber,
		ip_address: ipAddress,
		registration_code: token.token,
		expires_at: token.expiresAt,
		totp_secret: encryptedSecret,
	})
}

/**
 * Add organization to user registration
 * @async
 * @param {Object} orgDetails							- User details object containing email, fullName and phoneNumber
 * @param {Object} registrationTicketId		- Registration ticket id
 * @throws {Error}												- An error if db call fails
 * @returns	{Object}											- returns an object containing token and expiresAt
 */
exports.addOrganizationDetailsToRegistration = async (orgDetails, registrationTicketId) => {

	await queries.updateRegistrationTicket({
		organization_name: orgDetails.name,
		organization_vat: orgDetails.vat,
		organization_website: orgDetails.website,
		organization_role: orgDetails.role,
	}, registrationTicketId)
}

/**
 * Finalizes the user registration and deletes the user registration ticket
 * @async
 * @param {Object} securityDetails					- User security details containing password and 2fa data
 * @param {Object} userRegistrationTicket		- User registration ticket object
 * @param {String} organizationId						- Organization id
 * @param {String} invitationTicket					- Invitation ticket
 * @throws {Error}													- An error if db call fails
 * @returns	{User}													- A User model
 */
exports.submitUserRegistration = async (securityDetails, userRegistrationTicket, organizationId, invitationTicket) => {
	try {
		securityDetails.password = await bcrypt.hash(securityDetails.password, 10)
		return await queries.registerUser(userRegistrationTicket, securityDetails, organizationId, invitationTicket)
	} catch (error) {
		log.warn({ error }, 'Failed to register user')
		await removeRegistration(userRegistrationTicket.id, organizationId, null)
		throw Boom.internal('Failed to register user')
	}
}

/**
 * Remove expired registration tickets
 * @async
 * @throws {Error}				- An error if db call fails
 * @returns	{Void}				-
 */
exports.removeExpiredRegistrationTickets = async () => await queries.deleteExpiredRegistrationTickets()

/**
 * Create the organization related to the user registration
 * @async
 * @param {Object} userRegistrationTicket		- User registration ticket object
 * @throws {Error}													- An error if db call fails
 * @returns	{Organization}									- An Organization model
 */
exports.createOrganization = async (userRegistrationTicket) => {
	return await queries.registerOrganization(userRegistrationTicket)
}

/**
 * Removes the data related to a user registration
 * @async
 * @param {String} ticketId									- Registration ticket id
 * @param {String} organizationId						- Organization id linked to the user registration
 * @param {String} userId										- User id linked to the user registration
 * @throws {Error}													- An error if db call fails
 * @returns	{Organization}									- An Organization model
 */
const removeRegistration = async (ticketId, organizationId, userId) => {
	return Bookshelf.knex.transaction(async (trx) => {
		await UserRegistrationTicket.destroy({ id: ticketId }, { transacting: trx })
		await Organization.destroy({ id: organizationId }, { transacting: trx })
		await User.destroy({ id: userId }, { transacting: trx })
	})
}

exports.removeRegistration = removeRegistration
