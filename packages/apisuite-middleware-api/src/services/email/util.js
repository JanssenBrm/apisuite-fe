const nodemailer = require('nodemailer')
const sgMail = require('@sendgrid/mail')
const config = require('../../config')
const log = require('../../utils/logger')

const useSentiaSMTP = config.get('sentiaSMTP').useSentia

let transporter

if(useSentiaSMTP) {
	log.info('Setting and verifying Sentia SMTP as email service.')

	const sentiaSMTPConfiguration = {
		host: config.get('sentiaSMTP').host,
		port: config.get('sentiaSMTP').port,
		tls: {
			rejectUnauthorized: false,
		},
	}

	transporter = nodemailer.createTransport(sentiaSMTPConfiguration)

	// verify so we can make sure the transporter is working when checking the logs
	transporter.verify().then(() => {
		log.info('Email transporter is configured and ready to send messages.')
	}).catch(err => {
		log.error('Failed to verify email transporter configuration.', err, sentiaSMTPConfiguration)
	})
} else {
	log.info('Setting up Sendgrid as email service.')
	sgMail.setApiKey(config.get('sendgrid').apiKey)
}
/**
 * Send the email
 *
 * @param {Object} message Object with the message options
 * @param {String} message.from The sender email address
 * @param {String} message.to The email of the receiver
 * @param {String} message.subject The subject line
 * @param {String} message.text The plain text email body
 * @param {String} message.html The html email body
 *
 * @returns {Promise} Returns a promise with the result from sending the email
 */
module.exports.send = (message) => {
	if(!useSentiaSMTP) return sgMail.send(message)
	return transporter.sendMail(message).catch(err => {
		log.error('Error sending Email:', err)
		return err
	})
}
