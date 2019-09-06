const BaseModel = require('./BaseModel')

/**
 * ExternalResource model
 */
class ExternalResource extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'external_resource' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

}

module.exports = ExternalResource
