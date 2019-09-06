const BaseModel = require('./BaseModel')

/**
 * Endpoint Whitelist model
 */
class EndpointWhitelist extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'endpoint_whitelist' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Model Serializer
	 * @returns {Object} -
	 */
	serialize() {
		return {
			id: this.get('id'),
			method: this.get('method'),
			path: this.get('path'),
		}
	}
}

module.exports = EndpointWhitelist
