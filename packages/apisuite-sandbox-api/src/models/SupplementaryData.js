const BaseModel = require('./BaseModel')

/**
 * SupplementaryData model
 */
class SupplementaryData extends BaseModel {

	/**
	 * Returns table name
	 * @returns	{String}			- table name
	 */
	get tableName() { return 'supplementary_data' }

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
		const serializedObj = {}

		if (this.get('sca_hint')) {
			serializedObj.scaHint = this.get('sca_hint')
		}
		if (this.related('acceptedAuthenticationApproach')) {
			serializedObj.acceptedAuthenticationApproach = this.related('acceptedAuthenticationApproach').serialize()
		}
		if (this.get('successful_report_url')) {
			serializedObj.successfulReportUrl = this.get('successful_report_url')
		}
		if (this.get('unsuccessful_report_url')) {
			serializedObj.unsuccessfulReportUrl = this.get('unsuccessful_report_url')
		}

		return serializedObj
	}

	/**
	 * AcceptedAuthenticationApproach relationship
	 * @returns {Promise}	-
	 */
	acceptedAuthenticationApproach() {
		return this.hasMany(require('./AcceptedAuthenticationApproach'), 'supplementary_data_id', 'id')
	}

	/**
	 * PaymentRequestResource relationship
	 * @returns {Promise}	-
	 */
	supplementaryData() {
		return this.belongsTo(require('./PaymentRequestResource'))
	}
}

module.exports = SupplementaryData
