const BaseModel = require('./BaseModel')

/**
 * Product Endpoint model
 */
class ProductEndpoint extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'product_endpoint' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * ApiDoc relationship
	 * @returns {Promise}	-
	 */
	apiDoc() {
		return this.belongsTo(require('./ApiDoc'), 'api_id')
	}

	/**
	 * Model Serializer
	 * @returns {Object} -
	 */
	serialize() {
		return {
			id: this.get('id'),
			api: this.related('apiDoc').serialize(),
			path: this.get('path'),
			method: this.get('method'),
			visibility: this.get('visibility'),
			brand: this.get('brand'),
		}
	}
}

module.exports = ProductEndpoint
