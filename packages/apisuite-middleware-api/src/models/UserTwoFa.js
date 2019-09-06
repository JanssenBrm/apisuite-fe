const BaseModel = require('./BaseModel')
const cryptoUtils = require('../utils/crypto')
const config = require('../config')

/**
 * UserTwoFa model
 */
class UserTwoFa extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user_two_fa' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Returns the decrypted secret
	 * @returns {String}							-
	 */
	getDecryptedSecret () {
		return cryptoUtils.decrypt(config.get('twoFactor').totp_encryption_key, this.get('secret'))
	}

	/**
	 * Encrypt secret
	 *
	 * @param {Object}	secret			- Value to encrypt
	 * @returns {String}						-
	 */
	static encrypt (secret) {
		return cryptoUtils.encrypt(config.get('twoFactor').totp_encryption_key, secret)
	}

	/**
	 * Decrypt secret
	 *
	 * @param {Object}	secret			- Value to decrypt
	 * @returns {String}						-
	 */
	static decrypt (secret) {
		return cryptoUtils.decrypt(config.get('twoFactor').totp_encryption_key, secret)
	}

	/**
	 * User relationship
	 * @returns {Promise}	-
	 */
	user() {
		return this.belongsTo(require('./User'))
	}
}

module.exports = UserTwoFa
