const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
// const { stub } = require('sinon')

// const apiDocsSrvc = require('../../../../src/services/apiDocs')
// const persistence = require('../../../../src/services/apiDocs/persistence')

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


describe('(UNIT) services.apiDocs.parseMethods', async () => {


	afterEach (async () => {
		Object.keys(stubs).map(stub => stubs[stub].restore())
	})

	describe('Parse Methods given swagger contract', () => {
		
		let err//, res

		before(async () => {
    

		})

		it('Should not throw an error', () => {
			expect(err).to.be.undefined()
		})

	})

})
