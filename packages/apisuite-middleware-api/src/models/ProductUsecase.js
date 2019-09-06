const BaseModel = require('./BaseModel')

/**
 * Product Usecade model
 */
class ProductUsecade extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'product_usecase' }

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

module.exports = ProductUsecade
