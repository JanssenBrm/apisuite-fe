const { afterEach, before, describe, it } = exports.lab = require('lab').script()
const { expect } = require('code')
const { stub } = require('sinon')

// models
const Product = require('../../../../src/models/Product')
const ProductField = require('../../../../src/models/ProductField')
const ApiDoc = require('../../../../src/models/ApiDoc')

// services
const productService = require('../../../../src/services/product')
const apiDocService = require('../../../../src/services/apiDocs')

const stubs = {}

describe('(UNIT) services.product.updateProduct', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Should update and validate product', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error', async () => {
			expect(error).to.be.undefined()
		})

		it('Should return validation results', async () => {
			expect(resp).to.be.an.object()
			expect(resp.api).to.exist()
			expect(resp.api).to.be.an.object()
			expect(resp.api.name).to.exist()
			expect(resp.validation).to.exist()
			expect(resp.validation).to.be.an.array()
			expect(resp.validation.length).to.be.equal(data.apidocs.filter((api) => !api.id).length)
			let hasErrors = resp.validation.some(api => api.errors.length > 0)
			expect(hasErrors).to.be.false()
		})
	})

	describe('Should fail to update, invalid api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update_invalid')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Shouldn\'t return an error', async () => {
			expect(error).to.be.undefined()
		})

		it('Should return validation results', async () => {
			expect(resp).to.be.an.object()
			expect(resp.api).to.exist()
			expect(resp.api).to.be.an.object()
			expect(resp.api.name).to.exist()
			expect(resp.validation).to.exist()
			expect(resp.validation).to.be.an.array()
			expect(resp.validation.length).to.be.equal(data.apidocs.filter((api) => !api.id).length)
			let hasErrors = resp.validation.some(api => api.errors.length > 0)
			expect(hasErrors).to.be.true()
		})
	})

	describe('Should fail to update, update product fails', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.rejects()
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.be.exist()
		})

		it('Should return validation results', async () => {
			expect(resp).to.be.an.undefined()
		})
	})

	describe('Should fail to update, fails to upsert fields', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.rejects()
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})

	describe('Should fail to update, fails to delete fields', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.rejects()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})

	describe('Should fail to update, fails to create api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.rejects()
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})

	describe('Should fail to update, fails to update api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.rejects()
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})

	describe('Should fail to update, fails to delete api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.rejects()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})

	describe('Should fail to update, fails to parse api paths/methods', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_update')

			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({
					id: 1,
					name: data.name,
					base_uri: data.baseUri,
					sandbox_base_uri: data.sandboxBaseUri,
					/**
					 * 
					 * @param {string} field -
					 * @returns {Any} -
					 */
					get: function (field) {
						return this[field]
					},
				})
			stubs.ProductFieldQuery = stub(ProductField, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 }, {id: 3 } ] }) })
			stubs.ProductFieldUpsert = stub(ProductField, 'upsert')
				.resolves({ id: 1 })
			stubs.ProductFieldDestroy = stub(ProductField, 'destroy')
				.resolves()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 3 })
			stubs.ApiDocQuery = stub(ApiDoc, 'query')
				.returns({ count: () => 1, fetchAll: () => ({ toJSON: () => [ {id: 1 }, {id: 2 } ] }), fetch: () => ({ get: () => '1.0.0' }) })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({ get: () => '1.0.0' })
			stubs.ApiDocDestroy = stub(ApiDoc, 'destroy')
				.resolves()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.rejects()

			try {
				resp = await productService.updateProduct(data.id, data)
			} catch (err) {
				error = err
			}
		})

		it('Should return an error', async () => {
			expect(error).to.exist()
		})

		it('Should not return validation results', async () => {
			expect(resp).to.be.undefined()
		})
	})
})
