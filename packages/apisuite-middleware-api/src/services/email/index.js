const config = require('../../config')
const fs = require('fs')
const path = require('path')
const handlebars = require('handlebars')
const mailerUtil = require('./util')
const fromEmail = config.get('contact').from
const uriResolver = require('url')

exports = module.exports = {}

/**
 * Module responsbile sending emails.
 * @module services/email
 */

/**
 * Sends an email to the user for password recovery
 * @async
 * @param		{String}	userEmail		- email and login username, unique
 * @param		{String}	recoveryToken 	- token used to recover the password
 * @throws		{Error}						- an error if send email fails
 * @returns		{Void}						-
 */
exports.sendRecoverPassword = async (userEmail, recoveryToken) => {

	const url = config.get('appcenter').url
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`

	const title = 'Open Banking password recovery'
	const message = 'This is the Open Banking password recovery email. If you did not trigger the password recovery, please contact us.'
	const actionText = 'Click to recover your password'
	const actionLink = `${uriResolver.resolve(url, `/recovery?token=${recoveryToken}`)}`

	const data = { year: new Date().getFullYear(), title, message, actionText, actionLink, url }
	const source = fs.readFileSync(path.join(__dirname, folder, 'email_template.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(data)

	const msg = {
		to: userEmail,
		from: fromEmail,
		subject: 'Open Banking password recovery',
		html,
	}

	await mailerUtil.send(msg)

}

/**
 * Sends an email to the user for account activation
 * @async
 * @param		{String}	userEmail		- email and login username, unique
 * @param		{String}	activationCode 	- token used to recover the password
 * @throws		{Error}						- an error if send email fails
 * @returns	{	Void}						-
 */
exports.sendUserAccountActivationCode = async (userEmail, activationCode) => {

	const apiUrl = config.get('appcenter').api
	const url = config.get('appcenter').url
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`


	const title = 'Account confirmation'
	const message = `You are receiving this email to confirm your registration on the ${!config.get('branded') ? 'BANK' : 'BNP Paribas Fortis'} Open Banking Portal. Please activate your account by clicking the link below. If you have not recently registered on the Open Banking Portal, please contact us.`
	const actionText = 'Click to activate your account'
	const actionLink = `${uriResolver.resolve(apiUrl, `/users/confirmation_ticket?ac=${activationCode}`)}`

	const data = { year: new Date().getFullYear(), title, message, actionText, actionLink, url }
	const source = fs.readFileSync(path.join(__dirname, folder, 'email_template.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(data)

	const msg = {
		to: userEmail,
		from: fromEmail,
		subject: 'Open Banking account activation',
		html,
	}

	await mailerUtil.send(msg)

}

/**
 * Get the email to send support tickets to
 * @param {Object} ticketPayload - The ticket payload data
 * @returns {String} - The email to send to
 */
const getSupportEmail = (ticketPayload) => {
	let supportEmail = config.get('support').email
	if(ticketPayload.type === 'incident' && ticketPayload.environment !== 'sandbox') {
		supportEmail = config.get('support').tpemail
	}
	return supportEmail
}

/**
 * Sends an email to the support team
 * @async
 * @param		{Object}	ticketPayload	- the ticket payload information
 * @throws	{Error}	- an error if send email fails
 * @returns	{Void}	-
 */
exports.sendSupportTicket = async (ticketPayload) => {
	const supportEmail = getSupportEmail(ticketPayload)
	const url = config.get('appcenter').url
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`

	ticketPayload.url = url
	ticketPayload.year = new Date().getFullYear()
	const source = fs.readFileSync(path.join(__dirname, folder, 'ticket_template.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(ticketPayload)

	const msg = {
		to: supportEmail,
		from: ticketPayload.email,
		subject: ticketPayload.subject,
		html,
	}

	await mailerUtil.send(msg)
}

/**
 * Sends the newsletter email to the open banking mailbox
 * @async
 * @param		{Object}	newsletterPayload	- the newsletter payload information
 * @throws	{Error}	- an error if send email fails
 * @returns	{	Void}	-
 */
exports.sendNewsletter = async (newsletterPayload) => {
	const newsletterEmail = config.get('newsletter').email
	const url = config.get('appcenter').url
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`
	newsletterPayload.url = url
	const source = fs.readFileSync(path.join(__dirname, folder, 'email_template.hbs'))
	const template = handlebars.compile(source.toString())

	const title = 'Newsletter Subscription'
	const message = `The user ${newsletterPayload.email} wants to subscribe to the newsletter.`

	const data = { year: new Date().getFullYear(), title, message, url }
	const html = template(data)

	const msg = {
		to: newsletterEmail,
		from: newsletterPayload.email,
		subject: 'Newsletter Subscription from the portal',
		html,
	}
	await mailerUtil.send(msg)
}

/**
 * Sends an email to the admin to approve the organization
 * @async
 * @param		{Array}	org	- the user organization
 * @throws	{Error}	- an error if send email fails
 * @returns	{	Void}	-
 */
exports.notifyAdminToApproveOrganization = async (org) => {
	const url = config.get('appcenter').url
	const adminURL = config.get('appcenter').admin
	const adminEmail = config.get('admin').email
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`

	const title = 'New Organization'
	const message = `A new user just registered in the app. You have the following organization '${org.name}' to approve.`
	const actionText = 'Click to go to the admin dashboard'
	const actionLink = adminURL

	const data = { year: new Date().getFullYear(), title, message, actionText, actionLink, url }
	const source = fs.readFileSync(path.join(__dirname, folder, 'email_template.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(data)

	const msg = {
		to: adminEmail,
		from: fromEmail,
		subject: 'New Organization',
		html,
	}

	await mailerUtil.send(msg)
}

/**
 * Sends an email to the user to notify the organization approval
 * @async
 * @param		{Object}	user - the user
 * @param		{Object}	org - the organization
 * @throws	{Error}	- an error if send email fails
 * @returns	{	Void}	-
 */
exports.notifyUserOfOrganizationApproval = async (user, org) => {

	const url = config.get('appcenter').url
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`

	const title = 'Organization Approved'
	const message = `You are receiving this email to inform you that your organization '${org.name}' on the ${!config.get('branded') ? 'BANK' : 'BNP Paribas Fortis'} Open Banking Portal has been approved.`
	const actionText = 'Click to go to your dashboard'
	const actionLink = `${uriResolver.resolve(url, '/dashboard')}`

	const data = { year: new Date().getFullYear(), title, message, actionText, actionLink, url }
	const source = fs.readFileSync(path.join(__dirname, folder, 'email_template.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(data)

	const msg = {
		to: user.email,
		from: fromEmail,
		subject: 'Organization Approved',
		html,
	}

	await mailerUtil.send(msg)
}

/**
 * Sends an email to the user to notify he was invited to a team/org
 * @async
 * @param		{Object}	invitationCode 	- the invitation code
 * @param		{Object}	email 					- the target user email
 * @param		{Object}	org 						- the organization
 * @throws	{Error}										- an error if send email fails
 * @returns	{Void}										-
 */
exports.sendUserInvitationLink = async (invitationCode, email) => {

	const title = 'You have been invited to a new team.'
	const message = `You are receiving this email to inform you have been invited to a new team on the ${!config.get('branded') ? 'BANK' : 'BNP Paribas Fortis'} Open Banking Portal.`
	const actionText = 'Click to accept'
	const folder = `templates${!config.get('branded') ? '_unbranded' : ''}`
	const actionLink = `${uriResolver.resolve(config.get('appcenter').url, '/signup?ticket=' + invitationCode)}`

	const data = { year: new Date().getFullYear(), title, message, actionText, actionLink, url: config.get('appcenter').url }
	const source = fs.readFileSync(path.join(__dirname, folder, 'user_invite.hbs'))
	const template = handlebars.compile(source.toString())
	const html = template(data)

	const msg = {
		to: email,
		from: fromEmail,
		subject: 'Team Invitation',
		html,
	}

	await mailerUtil.send(msg)
}
