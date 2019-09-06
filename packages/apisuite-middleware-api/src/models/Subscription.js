const BaseModel = require('./BaseModel')

/**
 * Subscription model
 */
class Subscription extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'subscription' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
	 * Organization relationship
	 * @returns {Promise}	-
	 */
	organization() {
		return this.belongsTo(require('./Organization'))
	}

	/**
	 * Product relationship
	 * @returns {Promise}	-
	 */
	product() {
		return this.belongsTo(require('./Product'))
	}
}

module.exports = Subscription
