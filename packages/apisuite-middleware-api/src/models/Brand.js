const BaseModel = require('./BaseModel')

/**
 * Brand model
 */
class Brand extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'brand' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
	 * Product relationship
	 * @returns {Promise}	-
	 */
	products() {
		return this.hasMany(require('./Product'))
	}
}

module.exports = Brand
