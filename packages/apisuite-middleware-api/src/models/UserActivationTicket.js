const BaseModel = require('./BaseModel')

/**
 * UserActivation model
 */
class UserActivationTicket extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'user_activation_ticket' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }
}

module.exports = UserActivationTicket
