const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')
// const chance = require('../../../mocks/chance')

const apiDocsSrvc = require('../../../../src/services/apiDocs')
const persistence = require('../../../../src/services/apiDocs/persistence')
const productEndpointModel = require('../../../../src/models/ProductEndpoint')

const stubs = { }

// const allEndpoints = {
// 	toJSON : () => {
// 		return [
// 			{
// 				path: '/test',
// 				method: 'GET',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test',
// 				method: 'POST',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test/*',
// 				method: 'GET',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test/*',
// 				method: 'PUT',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test2/*/teams',
// 				method: 'GET',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test2/*/teams/*',
// 				method: 'PUT',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 			{
// 				path: '/test2/*/teams/*',
// 				method: 'POST',
// 				apiDoc: {
// 					toJSON : () => {
// 						return {
// 							products: {toJSON : () => { return { quarantine: false }}},
// 							access_scope: 'PUBLIC',
// 						}
// 					},
// 				},
// 			},
// 		]
// 	},
// }

const contract = {
	servers: [
		{
			url: '/v1',
		},
	],
	paths: {
		'/accounts': {
			get: {},
		},
		'/accounts/{accountResourceId}/balances': {
			get: {},
			post:{},
		},
	},
	version: '1',
	title: 'some api',
	description: 'some description',
	contact: {
		name: 'test',
		url: 'https://www.example.com/contact',
		email: 'contact@example.com',
	},
	license: {
		name: 'MIT',
	},
	baseUrl: '/v1',
}

describe('(UNIT) services.apiDocs.parsePaths', async () => {


	afterEach (async () => {
		Object.keys(stubs).map(stub => stubs[stub].restore())
	})
	
	describe('Parse Path given swagger contract and CREATE product endpoint', () => {
		
		let err//, res

		before(async () => {
			
			const productId = 1
			const meta = contract
			const paths = contract.paths


			stubs.getEndpoint = stub(persistence, 'getEndpoint')
				.resolves()

			stubs.createEndpoint = stub(persistence, 'createEndpoint')
				.resolves()
			
			stubs.create = stub(productEndpointModel, 'create')
				.resolves()

			try {
				await apiDocsSrvc.parsePaths(productId, meta, paths)
			} catch (error) {
				// console.log(error)
				err = error
			}
			
		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

	})
})
