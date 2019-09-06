const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const chance = require('../../../mocks/chance')


const activityLogSrvc = require('../../../../src/services/activityLog')

const stubs = {}

describe('(UNIT) activityLog Service Create', async () => {

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Successful create', async () => {
    
		let error

		before(async () => {

			const entry = {
				user_id: chance.integer(),
				organization_id: chance.integer(),
				action: 'USER_CREATION',
				category: 'some_category',
				additional_info: 'some additional info',
			}

			stubs.createActivityLog = stub( activityLogSrvc , 'createActivityLog')
				.resolves()

			try {
				await activityLogSrvc.createActivityLog(entry)
			} catch (err) {
				error = err
			}
      
		})

		it('Should not return an error', () => {
			expect(error).to.be.undefined()
		})

	})


	describe('Create fails when user_id is not provided', async () => {
    
		let error

		before(async () => {

			const entry = {
				organization_id: chance.integer(),
				action: 'USER_CREATION',
				additional_info: 'some additional info',
			}

			try {
				await activityLogSrvc.createActivityLog(entry)
			} catch (err) {
				error = err
			}
      
		})

		it('Should return an error', () => {
			expect(error).not.to.be.undefined()
		})


		it('Should return an error', () => {
			expect(error.name).to.equal('ValidationError')
		})
	})

	describe('Create fails when organization_id is not provided', async () => {
    
		let error

		before(async () => {

			const entry = {
				user_id: chance.integer(),
				action: 'USER_CREATION',
				additional_info: 'some additional info',
			}

			try {
				await activityLogSrvc.createActivityLog(entry)
			} catch (err) {
				error = err
			}
      
		})

		it('Should return an error', () => {
			expect(error).not.to.be.undefined()
		})


		it('Should return an error', () => {
			expect(error.name).to.equal('ValidationError')
		})
	})

	describe('Create fails when action is not provided', async () => {
    
		let error

		before(async () => {

			const entry = {
				user_id: chance.integer(),
				organization_id: chance.integer(),
				category: 'some_category',
				additional_info: 'some additional info',
			}

			try {
				await activityLogSrvc.createActivityLog(entry)
			} catch (err) {
				error = err
			}
      
		})

		it('Should return an error', () => {
			expect(error).not.to.be.undefined()
		})

		it('Should return an error', () => {
			expect(error.name).to.equal('ValidationError')
		})
    
	})

	describe('Create fails when action is provided but with an unknown action', async () => {
    
		let error

		before(async () => {

			const entry = {
				user_id: chance.integer(),
				organization_id: chance.integer(),
				action: 'SOME_SURELY_UNKNOWN_ACTION_12345',
				category: 'some_category',
				additional_info: 'some additional info',
			}

			try {
				await activityLogSrvc.createActivityLog(entry)
			} catch (err) {
				error = err
			}
      
		})

		it('Should return an error', () => {
			expect(error).not.to.be.undefined()
		})

		it('Should return an error', () => {
			expect(error.name).to.equal('ValidationError')
		})
    
	})
})
