const twilioClient = require('./twilio')
const config = require('../../../config')

module.exports = {}

/**
 * Sends the 2FA code over sms to a specific phone number
 * @async
 * @param		{String}		to			- phone number
 * @param		{String}		code		- code to send
 * @throws	{Error}							- an error if delivery fails
 * @returns	{Void}							-
 */
module.exports.sendTwoFactorAuthSms = async (to, code) => {
	return await twilioClient.messages.create({
		body: code,
		to,
		from: config.get('twilio').number,
	})
}
