/**
 * THIS FILE IS COMMENTED AND PART OF THE SOURCE CONTROL.
 * USE THIS TO MAKE DEVELOPMENT TESTING AND DEBUGGING AGAINST 
 * A REAL DATABASE
 */


///*
const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
// const { stub } = require('sinon')
// const _ = require('lodash')

const activityLogSrvc = require('../../../../src/services/activityLog')
const userSrvc = require('../../../../src/services/user')

const stubs = {}



describe.skip('() activityLog', async () => {

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})


	describe('Successfuly adds an activity log entry', async () => {
		let error

		

		before(async () => {
		
			const additional_info = {
				id: 100,
				email: 'some_user_just_created@example.com',
			}
			const entry = {
				user_id: 31,
				organization_id: 31,
				action: 'USER_CREATION',
				category: 'some_category',
				additional_info: JSON.stringify(additional_info),
			}

			try {
			
				await activityLogSrvc.createActivityLog(entry)
			
			} catch (err) {
				error = err
			}

		})

		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
		})
	
	})


	describe('Fails adding an activity log entry', async () => {
		let error

		

		before(async () => {
		
			const additional_info = {
				id: 100,
				email: 'some_user_just_created@example.com',
			}
			const entry = {
				user_id: 31,
				organization_id: 31,
				action: 'USER_CREATION_______',
				additional_info: JSON.stringify(additional_info),
			}

			try {
			
				await activityLogSrvc.createActivityLog(entry)
			
			} catch (err) {
				error = err
			}

		})

		it('Shouldn\'t return an error', () => {
			// console.log('======================')
			expect(error).not.to.be.undefined()
		})
	
	})


	describe('retrives allowed actions from user roles', async () => {
		let error

		before(async () => {
		
	
			try {
			
				await userSrvc.getActionsAvailableForUserRoles(31,31)
			
			} catch (err) {
				error = err
			}

		})

		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
		})
	
	})

	describe('retrives an activity log list', async () => {
		let error

		before(async () => {
		
	
			try {
			
				const today = new Date()
				const yesterday = today.setDate(today.getDate() - 1)

				await activityLogSrvc.listOrganizationActivityLogs(31,null,'some_category', {from: new Date(yesterday), to: new Date()}, ['USER_CREATION'])
			
			} catch (err) {
				error = err
			}

		})

		it('Shouldn\'t return an error', () => {
			// console.log('RES', res)
			expect(error).to.be.undefined()
		})
	
	})
})
//*/
