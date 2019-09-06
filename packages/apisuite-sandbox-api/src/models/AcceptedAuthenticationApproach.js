const BaseModel = require('./BaseModel')

/**
 * AcceptedAuthenticationApproach model
 */
class AcceptedAuthenticationApproach extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'accepted_authentication_approach' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Returns the accepted approaches
	 * @returns	{Object}	-
	 */
	static approaches() {
		return {
			REDIRECT: 'REDIRECT',
			DECOUPLED: 'DECOUPLED',
		}
	}

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return this.get('accepted_authentication_approach')
	}

	/**
	 * SupplementaryData relationship
	 * @returns {Promise}	-
	 */
	acceptedAuthenticationApproach() {
		return this.belongsTo(require('./SupplementaryData'))
	}
}

module.exports = AcceptedAuthenticationApproach
