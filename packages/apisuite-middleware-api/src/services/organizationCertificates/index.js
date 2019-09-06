const boom = require('boom')
const Organization = require('../../models/Organization')
const OrganizationCertificates = require('../../models/OrganizationCertificates')
const certUtil = require('../../utils/certificate')

exports = module.exports = {}

/**
 * Module responsible for all certificates services.
 * @module services/certificate
 */

exports.getOrganizationCertificates = async (organizationId) => {
	const organizationCertificates = await Organization.findOne({ id: organizationId }, {
		withRelated: [{
			'certificates': (qb) => {
				qb.column('id', 'expiration_date', 'organization_id')
				qb.orderBy('created_at', 'desc')
			},
		}],
		require: false,
	})
	return organizationCertificates.related('certificates')
}

exports.addOrganizationCertificate = async (organizationId, certificate, opts) => {
	let valid = certUtil.validateCertificate(certificate)
	if (!valid) {
		throw boom.badRequest('Certificate has expired.')
	}
	let cert = certUtil.getParsedCertificate(certificate)

	return await OrganizationCertificates.create({
		cert: certificate,
		expiration_date: cert.validity.notAfter,
		algorithm: 'RS256',
		organization_id: organizationId,
	}, opts)
}

exports.getOrganizationCertificate = async (query) => {
	return await OrganizationCertificates.findOne(query, { require: false })
}

exports.listOrganizationsCertificates = async (page, pageSize) => {
	return await Organization.query(function (qb) {
		qb.innerJoin('organization_certificates', 'organization_certificates.organization_id', 'organization.id')
	}).fetchPage({
		page,
		pageSize,
		withRelated: [{
			'certificates': (qb) => {
				qb.column('id', 'expiration_date', 'organization_id')
				qb.orderBy('created_at', 'desc')
			},
		}],
	})
}

exports.deleteOrganizationCertificate = async (certId, orgId) => {
	return await OrganizationCertificates.destroy({ id: certId, organization_id: orgId, require: false })
}
