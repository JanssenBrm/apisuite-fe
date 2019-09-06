const BaseModel = require('./BaseModel')

/**
 * AppScope model
 */
class AppScope extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'app_scope' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return false }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			brand: this.get('brand'),
			appId: this.get('app_id'),
			scopeId: this.get('scope_id'),
			scope: this.related('scope').serialize(),
			app: this.related('app').serialize(),
		}
	}


	/**
	 * Scope relationship
	 * @returns {Promise}	-
	 */
	scope() {
		return this.belongsTo(require('./Scope'))
	}

	/**
	 * Scope relationship
	 * @returns {Promise}	-
	 */
	app() {
		return this.belongsTo(require('./App'))
	}
}

module.exports = AppScope
