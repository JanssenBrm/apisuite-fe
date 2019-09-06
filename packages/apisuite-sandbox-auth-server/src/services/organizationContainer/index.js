// Models
const OrgContainer = require('../../models/OrgContainer')

exports = module.exports = {}

/**
 * Creates a container bound to an organization
 * @param		{Object}		containerData			- Container data
 * @throws	{Error}												- Error if database query fails
 * @returns	{App}													- Returns the created container
 */
exports.create = (containerData) => {
	return OrgContainer.create(containerData)
}

/**
 * Retrieves the container belonging to a specific org
 * @param		{Integer}	orgId							- Organization id
 * @param		{Object}	opts							- Query options
 * @throws	{Error}											- Error if database query fails
 * @returns	{OrgContainer}							- Returns the container associated with the org
 */
exports.getContainerByOrganization = (orgId, opts) => {
	return OrgContainer.findOne({ organization_id: orgId }, opts)
}
