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

describe('(UNIT) services.product.createProduct', async () => {

	afterEach(() => {
		// Restore all stubbed methods after each test
		Object.keys(stubs).map(stb => stubs[stb].restore())
	})

	describe('Should create and validate product', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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
			expect(resp.validation.length).to.be.equal(data.apidocs.length)
			let hasErrors = resp.validation.some(api => api.errors.length > 0)
			expect(hasErrors).to.be.false()
		})
	})

	describe('Should fail to create, invalid api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data_invalid')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
			} catch (err) {
				error = err
			}
		})

		it('Should not return an error', async () => {
			expect(error).to.be.undefined()
		})

		it('Should return validation results', async () => {
			expect(resp).to.be.an.object()
			expect(resp.api).to.exist()
			expect(resp.api).to.be.an.object()
			expect(resp.api.name).to.exist()
			expect(resp.validation).to.exist()
			expect(resp.validation).to.be.an.array()
			expect(resp.validation.length).to.be.equal(data.apidocs.length)
			let hasErrors = resp.validation.some(api => api.errors.length > 0)
			expect(hasErrors).to.be.true()
		})
	})

	describe('Should fail to create, fails to create product', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
				.rejects()
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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

	describe('Should fail to create, fails to update product', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.rejects()
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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

	describe('Should fail to create, fails to create product fields', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.rejects()
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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

	describe('Should fail to create, fails to create product api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.rejects()
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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

	describe('Should fail to create, fails to update product api', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.rejects()
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.resolves({})

			try {
				resp = await productService.createProduct(data)
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

	describe('Should fail to create, fails to parse the swagger for the paths', async () => {
		let data, resp, error

		before(async () => {

			data = require('./data/data')

			stubs.ProductCreate = stub(Product, 'create')
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
			stubs.ProductUpdate = stub(Product, 'update')
				.resolves({})
			stubs.ProductFieldCreate = stub(ProductField, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocCreate = stub(ApiDoc, 'create')
				.resolves({ id: 1 })
			stubs.ApiDocUpdate = stub(ApiDoc, 'update')
				.resolves({})
			stubs.ApiDocSrvParseSwagger = stub(apiDocService, 'parseSwagger')
				.rejects()

			try {
				resp = await productService.createProduct(data)
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

})
