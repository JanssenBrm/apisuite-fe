const BaseModel = require('./BaseModel')

/**
 * OrganizationCertificates model
 */
class OrganizationCertificates extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String} 	-
	 */
	get tableName() { return 'organization_certificates' }

	/**
	 *	Returns timestamps setup
	 *	@returns	{String}	-
	 */
	get hasTimestamps() { return true }

	/**
	 * Organization relationship
	 * @returns {Promise}	-
	 */
	organization() {
		return this.belongsTo(require('./Organization'))
	}
}

module.exports = OrganizationCertificates
