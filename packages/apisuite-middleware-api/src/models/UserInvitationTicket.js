const BaseModel = require('./BaseModel')

/**
 * UserInvitation model
 */
class UserInvitationTicket extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user_invitation_ticket' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Users relationship
	 * @returns {Promise}	-
	 */
	user() {
		return this.belongsTo(require('./User'))
	}

	/**
	 * Organization relationship
	 * @returns {Promise}	-
	 */
	organization() {
		return this.belongsTo(require('./Organization'))
	}
}

module.exports = UserInvitationTicket
