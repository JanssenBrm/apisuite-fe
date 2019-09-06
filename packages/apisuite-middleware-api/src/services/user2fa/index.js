const boom = require('boom')
const speakeasy = require('speakeasy')
const qrcode = require('qrcode')
const ShortUniqueId = require('short-unique-id')
const userPersistence = require('../../services/user/persistence')
const cryptoUtils = require('../../utils/crypto')
const config = require('../../config')
const uuid = require('uuid')

const UserTwoFa = require('../../models/UserTwoFa')
const TwoFaToken = require('../../models/TwoFaToken')

const TOTP_KEY = config.get('twoFactor').totp_encryption_key

exports = module.exports = {}

/**
 * Module responsbile for all the 2 factor authentication services.
 * @module services/user2fa
 */



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
 * Generates a totp code
 *
 * @param {String} secret   - A generated secret with the corresponding encoding
 * @param {String} encoding - The encoding of the secret. ['ascii','hex'or 'base32']
 * @param {String} label		- The label of the secret.
 * @param {String} issuer 	- The issuer of the secret. 'appcenter' by default
 * @returns {Boolean} 			- Returns false if the token is invalid. Returns true otherwise.
 */
const generateTOTPToken = (secret, encoding, label, issuer = 'appcenter') => {
	return speakeasy.totp({
		secret: secret,
		encoding: encoding,
		label: label,
		issuer: issuer,
		step: 60,
		window: 2,
	})
}

exports.generateTOTPToken = generateTOTPToken

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

/** Creates user secret for 2FA
 * @param {String} encoding			- the encoding for the secret
 * @throws {Error} 		 					- An Error if it fails
 * @returns {String} 						- The user secret with Base32 encoding
 */
const generate2FASecret = (encoding) => {

	validateEncoding(encoding)

	const secretOpts = {
		length: 50,
		symbols: true,
		issuer: 'appcenter',
	}

	return speakeasy.generateSecret(secretOpts)[encoding]
}

exports.generate2FASecret = generate2FASecret

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

/**
 * Retrieves user 2fa details
 *
 * @async
 * @param {String} userId 			- User id
 * @param {Object} options 			- Options object
 * @throws {Error}							- An error if fails
 * @returns	{UserTwoFa}					- returns UserTwoFa model
 */
exports.getUser2faData = async (userId, options) => {
	return await UserTwoFa.findOne({ user_id: userId }, options)
}

/**
 * Updates 2fa data
 *
 * @param {Integer} tfaId 	- The 2fa row id
 * @param {Object} data   	- Data to update
 * @returns {UserTwoFa} 					-
 */
exports.update2faData = async (tfaId, data) => {
	return await UserTwoFa.update(data, { id: tfaId })
}

/**
 * Generates a formatted uuid
 * @returns {String} a uuid with the format: IX2pm-iUks5
 */
const formattedUUID = () => {
	const uid = new ShortUniqueId()
	return `${uid.randomUUID(5)}-${uid.randomUUID(5)}`
}

exports.formattedUUID = formattedUUID

/**
 * Generates a list of recovery codes for a user given his id
 * @async
 * @param 	{Number} 		userID	- user id
 * @returns {Object}						- codes
 */
exports.generateUserRecoveryCodes = async (userID) => {
	const retrievedCodes = await getUserRecoveryCodes(userID)
	if (retrievedCodes.codes.length > 0) {
		return retrievedCodes
	}

	const codes = Array(20).fill('').map(formattedUUID)
	codes.map(async code => {
		await userPersistence.createUserRecoveryCode(userID, code)
	})
	return {
		codes,
	}
}

/**
 * Retrieves a list of recovery codes for a user given his id
 * @async
 * @param 	{Number} 		userID	- user id
 * @returns {Object}						- codes
 */
const getUserRecoveryCodes = async (userID) => {
	const retrievedCodes = await userPersistence.getRecoveryCodesByUserID(userID)
	return {
		codes: retrievedCodes.map(c => c.code),
	}
}

exports.getUserRecoveryCodes = getUserRecoveryCodes

/**
 * Verify the validity of a recovery code sent by the user
 * @async
 * @param 	{Number} 		userID			- user id
 * @param 	{String} 		code		- code sent by the user
 * @returns {Object}								- returns unauthorized if the code sent is invalid
 */
exports.verifyRecoveryCode = async (userID, code) => {
	const codes = await userPersistence.getRecoveryCodesByUserID(userID)
	let codeFoundID = null
	codes.map(c => {
		if (code === c.code) {
			codeFoundID = c.id
		}
	})
	if (!codeFoundID) {
		throw boom.unauthorized()
	}
	await userPersistence.removeRecoveryCodeByID(codeFoundID)
}

/**
 * Generates a token to require 2fa validation
 *
 * @param		{Number}	userId	- The user id
 * @param		{String}	scope		- The token scopes: a string coma separated
 * @throws	{Error}						-	Throws an error if db insert fails
 * @returns	{String} 					- Returns the created token
 */
exports.generate2FAToken = async (userId, scope) => {
	const token = uuid.v4()
	await TwoFaToken.create({ token, user_id: userId, scope })

	return token
}
