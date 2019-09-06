const BaseModel = require('./BaseModel')

/**
 * Product Feature model
 */
class ProductFeature extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'product_feature' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Product relationship
	 * @returns {Promise}	-
	 */
	products() {
		return this.belongsTo(require('./Product'))
	}
}

module.exports = ProductFeature
