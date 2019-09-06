const BaseModel = require('./BaseModel')

/**
 * Product Field model
 */
class ProductField extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'product_field' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Product Serializer
	 * @returns {Promise}	-
	 */
	serialize() {
		return {
			id: this.get('id'),
			locale: this.get('locale') || 'en-GB',
			key: this.get('key'),
			title: this.get('title'),
			body: this.get('body'),
			target: this.get('target'),
			image: this.get('image'),
			product_id: this.get('product_id'),
			created: this.get('created_at') && this.get('created_at').toISOString ? this.get('created_at').toISOString() : null,
			updated: this.get('updated_at') && this.get('updated_at').toISOString ? this.get('updated_at').toISOString() : null,
		}
	}

	/**
	 * Product relationship
	 * @returns {Promise}	-
	 */
	products() {
		return this.belongsTo(require('./Product'))
	}
}

module.exports = ProductField
