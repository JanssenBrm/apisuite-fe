const BaseModel = require('./BaseModel')

/**
 * OrgContainer model
 */
class OrgContainer extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'organization_container' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
 	 * Model Serializer
	 * @returns	{Object}	- Serialized Model
 	 */
	serialize() {
		return {
			id: this.get('id'),
			name: this.get('name'),
			organizationId: this.get('organization_id'),
		}
	}

	/**
	 * App relationship
	 * @returns {Promise}	-
	 */
	apps() {
		return this.hasMany(require('./App'))
	}

}

module.exports = OrgContainer
