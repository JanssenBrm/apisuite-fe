const handlers = require('./handlers')

exports = module.exports = {}

/**
 * hapi plugin with certificates endpoints.
 * @module plugins/certificates
 */

/**
 * Configuration object for organization certificates endpoints
 */
exports.plugin = {

	register: (server) => {

		// Routes
		server.route([
			{
				method: 'GET',
				path: '/admin/organizations/certificates',
				options: handlers.listOrganizationCertificates,
			},
			{
				method: 'GET',
				path: '/admin/organizations/{organizationId}/certificates/{certificateId}',
				options: handlers.getOrganizationCertificate,
			},
			{
				method: 'DELETE',
				path: '/admin/organizations/{organizationId}/certificates/{certificateId}',
				options: handlers.deleteOrganizationCertificateById,
			},
		])
	},
	name: 'appcenter-organization-certificate',
}
