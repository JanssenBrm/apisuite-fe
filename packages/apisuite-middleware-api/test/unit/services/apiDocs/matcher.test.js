const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')

const apiDocsSrvc = require('../../../../src/services/apiDocs')

const stubs = { }

const allEndpoints = {
	toJSON : () => {
		return [
			{
				path: '/test',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test',
				method: 'POST',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test/*',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test/*',
				method: 'PUT',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams/*',
				method: 'PUT',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams/*',
				method: 'POST',
				brand: 'bnpparibasfortis',
				api: {
					products: {toJSON : () => { return { quarantine: false }}},
					access_scope: 'PUBLIC',
				},
			},
		]
	},
}


describe('(UNIT) services.apiDocs.matcher', async () => {


	afterEach (async () => {
		Object.keys(stubs).map(stub => stubs[stub].restore())
	})
	
	describe('Successfuly match /test route with GET method', () => {
		const path = '/test'
		const method = 'GET'
		const brand = 'bnpparibasfortis'
		let res, err
		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand ,allEndpoints)
			} catch (error) {
				// console.log(error)
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})

		it('Response path should be /test_GET', () => {
			expect(res.path).to.equals('/test_GET_bnpparibasfortis')
		})
		
	})

	describe('Successfuly match /test route with POST method', () => {
		
		let res, err
		
		const path = '/test'
		const method = 'POST'
		const brand = 'bnpparibasfortis'
		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand, allEndpoints)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})


		it('Response path should be /test_POST', () => {
			expect(res.path).to.equals('/test_POST_bnpparibasfortis')
		})
		

	})

	describe('Successfuly match /test/* (alphanumeric parameter) route with GET method', () => {
		
		let res, err
		
		const path = '/test/1abc2a'
		const method = 'GET'
		const brand = 'bnpparibasfortis'

		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand, allEndpoints)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})


		it('Response path should be /test/*_GET', () => {
			expect(res.path).to.equals('/test/*_GET_bnpparibasfortis')
		})
		

	})

	describe('Successfuly match /test2/*/teams (alphanumeric parameter) route with GET method', () => {
		
		let res, err
		
		const path = '/test2/1abc2a/teams'
		const method = 'GET'
		const brand = 'bnpparibasfortis'
		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand, allEndpoints)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})


		it('Response path should be /test2/*/teams_GET', () => {
			expect(res.path).to.equals('/test2/*/teams_GET_bnpparibasfortis')
		})
		

	})

	describe('Successfuly match /test2/*/teams/* (alphanumeric parameter) route with PUT method', () => {
		
		let res, err
		
		const path = '/test2/1abc2a/teams/a32cb'
		const method = 'PUT'
		const brand = 'bnpparibasfortis'
		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand, allEndpoints)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})


		it('Response path should be /test2/*/teams/*_PUT', () => {
			expect(res.path).to.equals('/test2/*/teams/*_PUT_bnpparibasfortis')
		})
		

	})

	describe('Successfuly match /test2/*/teams/* (alphanumeric parameter) route with POST method', () => {
		
		let res, err
		
		const path = '/test2/1abc2a/teams/a32cb'
		const method = 'POST'
		const brand = 'bnpparibasfortis'
		before(() => {
			

			try {
				res = apiDocsSrvc.matcher(path, method, brand, allEndpoints)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should not be undefined', () => {
			expect(res).not.to.be.undefined()
		})


		it('Response path should be /test2/*/teams/*_POST', () => {
			expect(res.path).to.equals('/test2/*/teams/*_POST_bnpparibasfortis')
		})
		

	})
})
