const config = require('../../../config')
const Wreck = require('wreck')
const logger = require('../../../utils/logger')
const Boom = require('boom')


exports = module.exports = {}
/**
 * @returns {Object} -
 */
const connect = async () => {

	
	const { api, accountId, accountPwd } = config.get('ng')
	
	const loginUrl = `${api}/account/login/?username=${accountId}&password=${accountPwd}`

	const result = await Wreck.get(loginUrl)

	if (result.res.statusCode !== 200) {
		logger.error('Failed to connect to NG Communications SMS gateway')
		return {
			error: 'Failed to connect to NG Communications SMS gateway',
		}
	}

	const { token, expiration } = JSON.parse(result.payload.toString())

	return {
		token,
		expiration,
	}

}

/**
 * Sends the 2FA code over sms to a specific phone number
 * @async
 * @param		{String}		to			- phone number
 * @param		{String}		code		- code to send
 * @param 	{Object} 		smsCredentials - SMS Gateway credentials, OPTIONAL
 * @throws	{Error}							- an error if delivery fails
 * @returns	{Void}							-
 */
exports.sendTwoFactorAuthSms = async (to, code, smsCredentials) => {

	const testNumber = config.get('ng').testNumber

	if (to === testNumber) {
		return {
			'status':'OK',
			'status_code':'C01',
			'status_text':'SMS Queued',
			'messageid':'1234567890',
		}
	}
	
	if (!smsCredentials) smsCredentials = await connect()

	if (new Date() > smsCredentials.expiration) smsCredentials = await connect()

	const { token } = smsCredentials

	const api = config.get('ng').api
	const senderId = config.get('ng').senderId
	

	const result = await Wreck.get(`${api}/data/sms/queue/?auth=${token}&senderid=${senderId}&recipient=${to}&message=${encodeURIComponent(code)}`)

	const payload = JSON.parse(result.payload.toString())

	if (payload.status === 'ERR') throw Boom.badData(payload.status_text)

	return payload
}

exports.connect = connect
