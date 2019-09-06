const BaseModel = require('./BaseModel')
const cryptoUtils = require('../utils/crypto')
const config = require('../config')

/**
 * UserRegistration model
 */
class UserRegistrationTicket extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user_registration_ticket' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
	 * UserInvitationTicket relationship
	 * @returns {Promise}	-
	 */
	invitation() {
		return this.belongsTo(require('./UserInvitationTicket'), 'invitation_id')
	}

	/**
	 * Returns the decrypted secret
	 * @returns {String}	-
	 */
	getDecryptedSecret() {
		return cryptoUtils.decrypt(config.get('twoFactor').totp_encryption_key, this.get('totp_secret'))
	}

	/**
	 * Returns the query to delete a specific registration ticket
	 *
	 * @param {Object}	options		- The where condition
	 * @returns {Promise}					-
	 */
	static deleteOne (options) {
		return this
			.query()
			.where(options)
			.del()
	}

	/**
	 * Returns the query to delete all expired tickets
	 *
	 * @returns {Promise}					-
	 */
	static deleteAllExpired () {
		return this
			.query()
			.where('expires_at', '<', new Date())
			.del()
	}
}

module.exports = UserRegistrationTicket
