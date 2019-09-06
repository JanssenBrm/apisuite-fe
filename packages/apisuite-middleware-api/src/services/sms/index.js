const config = require('../../config')
const Boom = require('boom')
const logger = require('../../utils/logger')

const providers = {
	twilio: require('./twilio'),
	ng: require('./ng'),
}

const provider = providers[config.get('sms').provider]

exports = module.exports = { }

/**
 * 
 * @param {String} to - 
 * @param {String} code -
 * @param {String} credentials - 
 * @returns { Void } -
 */
const sendTwoFactorAuthSms = async (to, code, credentials) => {
	

	if (!provider.sendTwoFactorAuthSms) {
		logger.error('Provider does not implement the SMS provider interface. Missing sendTwoFactorAuthSms method.')
		throw Boom.internal('SMS Provider does not implement the correct interface.')
	}

	const message = `Your security code is: ${code}`

	return await provider.sendTwoFactorAuthSms(to, message, credentials)
}

/**
 * @returns { Object } -
 */
const connect = async () => {

	if (provider && provider.connect) {
		try {
			
			return await provider.connect()

		} catch (error) {
			logger.error(error)
			throw Boom.internal(error)
		}
	}

	return null
}

exports.sendTwoFactorAuthSms = sendTwoFactorAuthSms

exports.connect = connect
