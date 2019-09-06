const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const orgService = require('../../../../src/services/organization')
const orgPersistence = require('../../../../src/services/organization/persistence')

const stubs = {}

describe('(UNIT) services.organization.removeUserFromOrg', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Returns nothing if user is removed from organization', async () => {

		let error, userId,organizationId, result

		before(async () => {

			userId = 1
			organizationId = 1

			stubs.removeUserFromOrganization = stub(orgPersistence, 'removeUserFromOrganization')
				.resolves()

			try {
				result = await orgService.removeUserFromOrganization(userId,organizationId)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error',  () => {
			expect(error).to.be.undefined()
		})

		it('Should return true',  () => {
			expect(stubs.removeUserFromOrganization.calledWith(userId,organizationId)).to.be.true()
		})

		it('Should return undefined',  () => {
			expect(result).to.be.undefined()
		})

	})

	describe('Throws Internal Server Error if user is not removed from organization', async () => {

		let error, userId, organizationId

		before(async () => {

			userId = 1
			organizationId = 1

			stubs.removeUserFromOrganization = stub(orgPersistence, 'removeUserFromOrganization')
				.throws()

			try {
				await orgService.removeUserFromOrganization(userId, organizationId)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error',  () => {
			expect(error).not.to.be.undefined()
		})

		it('Should return true',  () => {
			expect(stubs.removeUserFromOrganization.calledWith(userId,organizationId)).to.be.true()
		})


	})

})
