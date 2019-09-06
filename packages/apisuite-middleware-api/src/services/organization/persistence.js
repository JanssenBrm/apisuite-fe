
// Models
const Organization = require('../../models/Organization')

exports = module.exports = {}

exports.getOrganizationByName = (name) => {
	return Organization
		.findOne({ name }, { require: false })
}

exports.removeUserFromOrganization = async (userId, organizationId) => {
	const organization = await Organization
		.forge({id: organizationId})
		.fetch()

	await organization.users().detach([userId])
}
