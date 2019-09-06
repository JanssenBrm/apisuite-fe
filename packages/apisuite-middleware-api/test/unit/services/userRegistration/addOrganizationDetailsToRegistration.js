const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const queries = require('../../../../src/services/userRegistration/persistence')
const userRegistrationService = require('../../../../src/services/userRegistration')

const stubs = {}

describe('(UNIT) services.userRegistration.addOrganizationDetailsToRegistration', async () => {

	let token, orgDetails, error

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	before(async () => {

		token = chance.string({ length: 48 })

		orgDetails = {
			name: chance.company(),
			vat: chance.string({ length: 9 }),
			website: chance.url(),
		}

		stubs.updateRegistrationTicket = stub(queries, 'updateRegistrationTicket')
			.resolves({})

		try {
			await userRegistrationService.addOrganizationDetailsToRegistration(orgDetails, token)
		} catch (err) {
			error = err
		}
	})

	it('Shouldn\'t return an error', async () => {
		expect(error).to.be.undefined()
	})

	it('Should add the organization details to the ticket', async () => {
		expect(stubs.updateRegistrationTicket.calledWithMatch({
			organization_name: orgDetails.name,
			organization_vat: orgDetails.vat,
			organization_website: orgDetails.website,
			organization_role: orgDetails.role,
		}, token)).to.be.true()
	})
})
