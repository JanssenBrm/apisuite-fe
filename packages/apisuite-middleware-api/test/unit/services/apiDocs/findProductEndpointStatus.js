const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

const apiDocsSrvc = require('../../../../src/services/apiDocs')
const persistence = require('../../../../src/services/apiDocs/persistence')

const stubs = { }

const allEndpoints = {
	toJSON : () => {
		return [
			{
				path: '/test',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test',
				method: 'POST',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test/*',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test/*',
				method: 'PUT',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams',
				method: 'GET',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams/*',
				method: 'PUT',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
			{
				path: '/test2/*/teams/*',
				method: 'POST',
				brand: 'bnpparibasfortis',
				api: {
					products: { quarantine: false },
					accessScope: 'PUBLIC',
				},
			},
		]
	},
}


describe('(UNIT) services.apiDocs.findProductEndpointStatus', async () => {


	afterEach (async () => {
		Object.keys(stubs).map(stub => stubs[stub].restore())
	})

	describe('Successfuly match /test2/*/teams (alphanumeric parameter) route with GET method', () => {
		
		let res, err
		
		const path = '/test2/1abc2a/teams'
		const method = 'GET'
		const brand = 'bnpparibasfortis'

		before(async () => {

			stubs.isWhitelisted = stub( persistence , 'isWhitelisted' )
				.resolves(false)
			stubs.getAllEndpoints = stub( persistence , 'getAllEndpoints' )
				.resolves(allEndpoints)

			try {
				res = await apiDocsSrvc.findProductEndpointStatus(path, method, brand)
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


		it('Response should be Quarantined False', () => {
			expect(res.quarantine).to.be.equal(false)
		})
    
		it('Response should return visibility PUBLIC', () => {
			expect(res.visibility).to.be.equal('PUBLIC')
		})
	})

	describe('Return empty response if the route is not matched', () => {
		
		let res, err
		
		const path = '/nonexistent/route'
		const method = 'GET'
		// const brand = 'bnpparibasfortis'
		before(async () => {

			stubs.isWhitelisted = stub( persistence , 'isWhitelisted' )
				.resolves(false)
			stubs.getAllEndpoints = stub( persistence , 'getAllEndpoints')
				.resolves(allEndpoints)

			try {
				res = await apiDocsSrvc.findProductEndpointStatus(path, method)
			} catch (error) {
				err = error
			}
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

		it('Response should be undefined', () => {
			expect(res).to.be.undefined()
		})

	})
})
