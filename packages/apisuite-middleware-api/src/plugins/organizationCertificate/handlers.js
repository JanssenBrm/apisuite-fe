const Boom = require('boom')
const Joi = require('joi')

const certServ = require('../../services/organizationCertificates')
const orgSrvc = require('../../services/organization')
const certUtil = require('../../utils/certificate')


exports = module.exports = {}

/**
 * @memberof module:plugins/organization
 */

/**
 * Used to test certificate upload without wizard endpoint
 * POST /organizations/{organizationId}/certificates
 */
/*
exports.addOrganizationCertificate = {
	id: 'appcenter-organization-add-certificate',
	description: 'Add certificate to organization',
	notes: ['Adds new a certificate if none is present.'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		failAction: async (request, h, err) => {
			log.error(err.message, 'ValidationError')
			throw Boom.badRequest('Invalid request payload input')
		},
		headers: {
			'request-ctx-cert': Joi.string().required(),
		},
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
		},
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'appcenterToken',
	},
	handler: async (request, h) => {
		try {
			let certificates = await certServ.getOrganizationCertificates(request.params.organizationId)
			let certs = certificates && certificates.toJSON ? certificates.toJSON() : certificates

			if (certs && certs.length) {
				return Boom.badRequest('There\'s a certificate already uploaded.')
			}

			const cert = certUtil.base64ToCert(request.headers['request-ctx-cert'])
			let certificate = await certServ.addOrganizationCertificate(request.params.organizationId, cert)

			return h.response(certificate).code(201)
		} catch (error) {
			log.error(error)
			throw Boom.internal(error.message)
		}
	},
}
*/

/**
 * GET /admin/organizations/certificates
 */
exports.listOrganizationCertificates = {
	id: 'appcenter-admin-list-organizations-certificates',
	description: 'Returns a list of organizations certificates',
	notes: ['Returns organization certtificates'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		query: {
			page: Joi.number().integer()
				.min(1)
				.default(1),
			pageSize: Joi.number().integer()
				.positive()
				.default(20),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {
		const { page, pageSize } = request.query

		const organizationCertificates = await certServ.listOrganizationsCertificates(page, pageSize)

		if (!organizationCertificates) {
			Boom.notFound('No organizations found.')
		}

		return {
			pagination: organizationCertificates.pagination,
			organizations: organizationCertificates.models.map((m) => {
				return { ...m.toJSON(), certificates: m.related('certificates').toJSON().map((cert) => ({ ...cert, expired: new Date() > new Date(cert.expiration_date) }) ) }
			}),
		}
	},
}

/**
 * GET /admin/organizations/{organizationId}/certificates/{certificateId}
 */
exports.getOrganizationCertificate = {
	id: 'appcenter-admin-get-organization-certificate',
	description: 'Returns an organization certificate',
	notes: ['Returns a certificate from an organization'],
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'200': { 'description': 'Ok' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
			certificateId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request) => {

		let certificate = await certServ.getOrganizationCertificate({ id: request.params.certificateId, organization_id: request.params.organizationId })

		if (!certificate) {
			return Boom.notFound('This certificate doesn\'t belong to the organization.')
		}

		let org = await orgSrvc.getOrganization({ id: request.params.organizationId })

		return {
			cert: certUtil.getParsedCertificate(certificate.toJSON().cert),
			org: org.toJSON(),
		}

	},
}

/**
 * DELETE /admin/organizations/{organizationId}/certificates/{certificateId}
 */
exports.deleteOrganizationCertificateById = {
	id: 'appcenter-admin-delete-organization-certificate',
	description: 'Delete an organization certificate',
	tags: ['api'],
	plugins: {
		'hapi-swagger': {
			'responses': {
				'204': { 'description': 'No Content' },
				'400': { 'description': 'Bad Request' },
				'404': { 'description': 'Not Found' },
				'500': { 'description': 'Internal Server Error' },
			},
		},
	},
	validate: {
		params: {
			organizationId: Joi.number().integer()
				.positive()
				.required(),
			certificateId: Joi.number().integer()
				.positive()
				.required(),
		},
	},
	auth: {
		strategy: 'appcenterToken',
		scope: 'admin',
	},
	handler: async (request, h) => {
		let certificate = await certServ.getOrganizationCertificate({ id: request.params.certificateId, organization_id: request.params.organizationId })

		if (!certificate) {
			return Boom.notFound('The certificate doesn\'t exist.')
		}

		// TODO: delete the cert on the WAF
		// let serial = certUtil.getParsedCertificate(certificate).serialNumber
		// let serial = forge.pki.certificateFromPem(certificate.cert).serialNumber // this is the call to parse it if the cert column is returned
		// serial = serial.replace(/..\B/g, '$&:') // this is the format needed for the WAF
		// log.info('+++ SERIAL TO DELETE ON WAF: ' + serial)
		// call to the waf delete script / rest call here

		let delCert = await certServ.deleteOrganizationCertificate(request.params.certificateId, request.params.organizationId)
		return h.response(delCert).code(204)
	},
}
