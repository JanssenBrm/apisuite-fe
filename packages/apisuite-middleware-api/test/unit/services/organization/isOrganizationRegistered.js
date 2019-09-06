const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')

const orgService = require('../../../../src/services/organization')
const orgPersistence = require('../../../../src/services/organization/persistence')

const stubs = {}

describe.skip('(UNIT) services.organization.isOrganizationRegistered', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Organization exists', async () => {

		let error, name, result

		before(async () => {
			name = chance.company()

			stubs.getOrganizationByName = stub(orgPersistence, 'getOrganizationByName')
				.resolves([{ name }])

			try {
				result = await orgService.isOrganizationRegistered(name)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error', async () => {
			expect(error).to.be.undefined()
		})

		it('Should search for the organization', async () => {
			expect(stubs.getOrganizationByName.calledWith(name)).to.be.true()
		})

		it('Should return true', async () => {
			expect(result).to.equal(true)
		})

	})

	describe('Organization doesn\'t exist', async () => {

		let error, name, result

		before(async () => {
			name = chance.company()

			stubs.getOrganizationByName = stub(orgPersistence, 'getOrganizationByName')
				.resolves()

			try {
				result = await orgService.isOrganizationRegistered(name)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error', async () => {
			expect(error).to.be.undefined()
		})

		it('Should search for the organization', async () => {
			expect(stubs.getOrganizationByName.calledWith(name)).to.be.true()
		})

		it('Should return false', async () => {
			expect(result).to.equal(false)
		})

	})
})
