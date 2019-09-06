const bookshelf = require('../../utils/bookshelf')

const sandboxAuthServer = require('../../services/sandboxAuthServer')
const productServices = require('../../services/product')
const orgSrvc = require('../../services/organization')
const certServ = require('../../services/organizationCertificates')
const userInvitationSrvc = require('../../services/userInvitation')

const certUtil = require('../../utils/certificate')
const util = require('./util')
const config = require('../../config')

exports = module.exports = {}

exports.onBoardUser = async (ownerId, user, org, certificate, obData) => {

	const retVal = {}

	const organization = await orgSrvc.getOrganization({ id: org.id })

	// retrieve all products
	const products = await productServices.listProducts({
		page: 1,
		pageSize: 200,
	})

	return bookshelf.transaction(async (trx) => {

		// If there is no certificate attached to the organizatiton, add it
		if (!org.certificates || !org.certificates.length) {
			const cert = certUtil.base64ToCert(certificate)

			// first send to sentia - stop flow if it fails
			if (config.get('certificate').withCert) {
				await util.sendCertToSentia(cert)
			}

			retVal.cert = await certServ.addOrganizationCertificate(org.id, cert, { transacting: trx })
		}

		// Create invitation ticket
		retVal.invitationTicket = await userInvitationSrvc.createInvitationTicket({
			email: obData.clientContacts.email,
			organization_id: org.id,
			user_id: user ? user.id || user.get('id') : null,
			role_id: 1,
			onboarding: true,
		}, { transacting: trx })


		// update organization
		if (obData.tppContacts && obData.tppContacts.website) {

			const orgData = {}
			orgData.website = obData.tppContacts.website

			// Update organization details
			await orgSrvc.updateOrganization(org.id, orgData, { transacting: trx })
		}

		// attach org to user
		//await retVal.user.organizations().attach({ organization_id: org.id, role: obData.clientContacts.contactType }, { transacting: trx })

		const organizationProducts = organization.related('products')

		// subscribe all products
		for (let prod of products.toJSON()) {
			await organizationProducts.create({ id: prod.id || prod.get('id') }, { transacting: trx })
		}

		// create app
		retVal.app = await sandboxAuthServer.createApp({
			name: obData.clientName,
			description: obData.clientDescription || null,
			ownerId,
			organizationId: org.id,
			redirectURLs: obData.redirectUris,
		}, products.map(p => p.id))

		return retVal
	})
}


