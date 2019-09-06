/**
 * THIS FILE IS COMMENTED AND PART OF THE SOURCE CONTROL.
 * USE THIS TO MAKE DEVELOPMENT TESTING AND DEBUGGING AGAINST 
 * A REAL DATABASE
 */


/*
const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
const _ = require('lodash')
const userService = require('../../../../src/services/user')
const persistence = require('../../../../src/services/user/persistence')
const UserOrganizationRole = require('../../../../src/models/UserOrganizationRole')
const stubs = {}

describe('(UNIT) services.user.rbac', async () => {

	afterEach(async () => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
		
		await UserOrganizationRole.where('id', '!=', '0')
		.destroy({require: false})
	})


	describe('Successfuly adds a role', async () => {
		let res,error

		before(async () => {
			await UserOrganizationRole.where('id', '!=', '0')
			.destroy({require: false})

			try {
			
				res = await userService.addUserOrganizationRole(1,1,10)
			
			} catch (err) {
				error = err
			}

		})

		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
		})

		it('Should return a user organization role', () => {
			expect(res.toJSON()).not.to.be.undefined()
		})

	})

	describe('Successfuly gets all user roles', async () => {
		let res,error

		before(async () => {

			await userService.addUserOrganizationRole(1,1,10)

			try {
				res = await userService.getAllUserOrganizationRoles(1)
	
			} catch (err) {
				error = err
			}
		})
	
		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
			
		})
	
		it('Should return a list of roles', () => {
			expect(res.toJSON().length).to.be.greaterThan(0)
		})
	})
	
	describe('Successfuly gets user roles on an organization', async () => {
		let res,error

		before(async () => {

			await userService.addUserOrganizationRole(1,1,10)

			try {
				res = await userService.getUserOrganizationRoles(1,1)
	
			} catch (err) {
				error = err
			}
		})
	
		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
			
		})
	
		it('Should return a list of roles', () => {
			expect(res.toJSON().length).to.be.greaterThan(0)
		})
	})

	describe('Successfuly update user role on an organization', async () => {
		let res,error

		before(async () => {

			const role = await userService.addUserOrganizationRole(1,1,10)
			const userRoleOrganizationId = role.get('id')
			
			try {
				res = await userService.updateUserOrganizationRole(userRoleOrganizationId,12)
	
			} catch (err) {
				error = err
			}
		})
	
		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
			
		})
	
		it('Should return the updated user organization role', () => {
			expect(res.toJSON().roleId).to.be.equal(12)
		})
	})
	

	describe('Successfuly deletes user role on an organization', async () => {
		let res,error

		before(async () => {

			const role = await userService.addUserOrganizationRole(1,1,10)
			const userRoleOrganizationId = role.get('id')

			try {
				res = await userService.removeUserOrganizationRole(userRoleOrganizationId)
	
			} catch (err) {
				error = err
			}
		})
	
		it('Shouldn\'t return an error', () => {
			expect(error).to.be.undefined()
		})

	})

})
*/
