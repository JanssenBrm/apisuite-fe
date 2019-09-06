const speakeasy = require('speakeasy')
const cryptoUtils = require('../crypto')
const qrcode = require('qrcode')
const config = require('../../config')

const TOTP_KEY = config.get('twoFactor').totp_encryption_key

exports = module.exports = {}

/** Validates encoding
 * @param {String} encoding 				- encoding
 * @throws {Error} 		 							- An Error if it fails
 * @returns {Void} 									-
 */
const validateEncoding = (encoding) => {
	const supportedEncoding = ['ascii', 'hex', 'base32']

	if (!supportedEncoding.includes(encoding))
		throw new Error('Unsupported encoding. User ascii, hex or base32')
}

/**
 * @param {String} secret   	- The user's TOTP secret
 * @param {String} encoding 	- The encoding of the secret. Can be 'ascii','hex'or 'base32'
 * @param {token}  token    	- The user input token. This is the actual TOTP.
 * @param {String}	method    - The 2fa method.
 * @returns {Boolean} 				- Returns false if the token is invalid. Returns true otherwise.
 */
exports.verifyTOTP = (secret, encoding, token, method = 'authorizationApp') => {
	let descryptedTicket

	try {
		descryptedTicket = cryptoUtils.decrypt(TOTP_KEY, secret)
	} catch (error) {
		throw error
	}

	const opts = {
		secret: descryptedTicket,
		encoding: encoding,
		token: token,
	}

	if (method === 'authorizationSms') {
		opts.step = 60
		opts.window = 2
	}

	return speakeasy.totp.verify(opts)
}


/**
 * @param {String} secret   - A generated secret with the corresponding encoding
 * @param {String} encoding - The encoding of the secret. ['ascii','hex'or 'base32']
 * @param {String} label		- The label of the secret.
 * @param {String} issuer 	- The issuer of the secret. 'appcenter' by default
 * @returns {Boolean} 			- Returns false if the token is invalid. Returns true otherwise.
 */
exports.generateTOTPToken = (secret, encoding, label, issuer = 'appcenter') => {
	return speakeasy.totp({
		secret: secret,
		encoding: encoding,
		label: label,
		issuer: issuer,
		step: 60,
		window: 2,
	})
}

/** Creates user secret for 2FA
 * @param {String} encoding			- the encoding for the secret
 * @throws {Error} 		 					- An Error if it fails
 * @returns {String} 						- The user secret with Base32 encoding
 */
exports.generate2FASecret = (encoding) => {

	validateEncoding(encoding)

	const secretOpts = {
		length: 50,
		symbols: true,
		issuer: 'appcenter',
	}

	return speakeasy.generateSecret(secretOpts)[encoding]
}

/**
 * @async
 * @param {String} email 			- The user email
 * @param {String} secret			- The secret generated for 2FA by speakeasy
 * @param {String} encoding 	- The encoding of the secret
 * @param {String} issuer 		- The issuer
 * @returns {String} 					- Returns a Data URI for the QR Code image
 */
exports.generateQRCode = async (email, secret, encoding, issuer = 'Appcenter') => {
	let decryptedSecret

	try {
		decryptedSecret = cryptoUtils.decrypt(TOTP_KEY, secret)
	} catch (error) {
		throw error
	}

	const url = speakeasy.otpauthURL({
		secret: decryptedSecret,
		label: email,
		issuer: issuer,
		encoding: encoding,
	})

	return await qrcode.toDataURL(url)
}
