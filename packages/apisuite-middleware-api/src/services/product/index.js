const Product = require('../../models/Product')
const Brand = require('../../models/Brand')
const ApiDoc = require('../../models/ApiDoc')
const apiDocSrvc = require('../../services/apiDocs')

const Boom = require('boom')
const bookshelf = require('../../utils/bookshelf')
const ProductField = require('../../models/ProductField')
const logger = require('../../utils/logger')
const semver = require('semver')

const util = require('./util')

exports = module.exports = {}

/**
 * Module responsible for all product management services.
 * @module services/product
 */

/**
 * Get total of scopes that are in the all the apis
 * @param {Object} apis - The object with all the apis to count the number of scopes
 * @returns {Number} - The total of scopes
 */
const getScopesCount = (apis) => {
	let res = apis.map((api) => {
		let found = util.findProp(api, 'scopes')
		if (found.length) {
			return found.reduce((prev, next) => prev + Object.keys(next.scopes).length, 0)
		}
		return 0
	})
	return res.length ? res.reduce((prev, next) => prev + next) : 0
}

/**
 * Create API product
 * @async
 * @param {Object} data									- Product data
 * @throws {Error}											- An error if fails
 * @returns {Product}										- The created product
 */
exports.createProduct = async (data) => {
	const validationResult = await bookshelf.transaction(async (trx) => {
		let productValidation = [], result = {}
		const productData = {
			name: data.name,
			base_uri: data.baseUri || null,
			sandbox_base_uri: data.sandboxBaseUri || null,
			quarantine: false,
			brand_id: 1,
		}

		// create product
		const product = await Product.create(productData, { transacting: trx })

		if(data.fields && data.fields.length) {
			const businessDocs = data.fields.map((field) => {
				return {
					locale: data.locale || 'en-GB',
					key: field.key,
					image: field.image || null,
					title: field.title || null,
					body: field.body || null,
					target: field.target || null,
					product_id: product.id,
				}
			})

			// create all fields
			for (let field of businessDocs) {
				await ProductField.create(field, { transacting: trx })
			}
		}

		if(data.apidocs && data.apidocs.length) {
			let apiDocs = []
			for (let apiDoc of data.apidocs) {
				let api = {}, doc = {
					swagger: apiDoc.swagger,
					access_scope: apiDoc.accessScope.toLowerCase(),
					sandbox: apiDoc.sandbox || false,
					live: apiDoc.live || false,
					deprecated: false,
					sandbox_source_control_key: apiDoc.sandboxSourceControlKey || null,
					sandbox_source_control_name: apiDoc.sandboxSourceControlName || null,
					product_id: product.id,
				}

				try {
					let swagger = JSON.parse(doc.swagger)
					api = await util.validateSwagger(swagger)
					productValidation.push(api)
				}
				catch(err) {
					logger.error('Swagger Validation:', err)
					throw Boom.badRequest('Contract validation failed')
				}

				if (api.errors && !api.errors.length) {
					// create api doc
					doc.swagger = JSON.stringify(api.swagger)
					let api_doc = await ApiDoc.create({ ...doc, title: api.swagger.info.title, version: api.swagger.info.version }, { transacting: trx })
					apiDocs.push({
						id: api_doc.id,
						version: semver.valid(semver.coerce(api.swagger.info.version)),
					})

					await apiDocSrvc.parseSwagger(api_doc.id, api.swagger, { transacting: trx })

				}
			}

			result = {
				api: {
					name: product.get('name'),
					baseUri: product.get('base_uri'),
					apiCount: productValidation.length,
					scopesCount: getScopesCount(productValidation),
				},
				validation: productValidation,
			}

			// if there's error rollback and return the validation errors
			if (productValidation.some((api) => api.errors.length)) {
				return Promise.reject(result)
			}

			let productVersion = `Sandbox v${apiDocs[0].version}`
			if(apiDocs.length > 1) {
				apiDocs.sort((a, b) => {
					return semver.lt(a.version, b.version) ? 1 : (semver.gt(a.version, b.version) ? -1 : 0)
				})
				// remove the latest version from the list to deprecate
				productVersion = `Sandbox v${apiDocs.shift().version}`
				for(let api of apiDocs) {
					// update api doc deprecated state
					await ApiDoc.update({ deprecated: true }, { id: api.id, transacting: trx })
				}
			}

			await Product.update({ version: productVersion }, { id: product.id, transacting: trx })
		}

		return result
	}).catch((err) => {
		if (Boom.isBoom(err)) {
			throw err
		} else {
			if (err.constructor === Error)
				throw err
			return err
		}
	})

	return validationResult
}

/**
 * Quarantine API product
 * @async
 * @param {Integer} id									- Product id
 * @throws {Error}											- An error if fails
 * @returns {void}
 */
exports.quarantineProduct = async (id) => {
	let product = await Product.findById(id)
	await Product.update({ quarantine: !product.get('quarantine') }, { id })
}


/**
 * Update API product
 * @async
 * @param {Integer} id									- Product id
 * @param {Object} data									- The data to update
 * @throws {Error}											- An error if fails
 * @returns {Product}										- The updated product
 */
exports.updateProduct = async (id, data) => {
	const validationResult = await bookshelf.transaction(async (trx) => {
		let productValidation = [], result = {}
		const productData = {
			name: data.name,
			base_uri: data.baseUri || null,
			sandbox_base_uri: data.sandboxBaseUri || null,
		}

		// update product
		const product = await Product.update(productData, { id , transacting: trx })

		let existingFields = []
		if (data.fields && data.fields.length) {
			// update all fields
			for (let field of data.fields) {
				let f = {
					id: field.id,
					locale: data.locale || 'en-GB',
					key: field.key,
					image: field.image || null,
					title: field.title || null,
					body: field.body || null,
					target: field.target || null,
					product_id: id,
				}


				let found = await ProductField.query('where', 'id', '=', f.id || -1).count()
				if (!f.id || (f.id && found)) {
					let updated = await ProductField.upsert({ id: f.id || -1 }, f, { transacting: trx })
					existingFields.push(updated.id)
				}
			}
		}
		// delete all non existing
		let deletedThisFields = await ProductField.query((qb) => {
			qb.where({ product_id: id })
			qb.where('id', 'not in', existingFields)
		}).fetchAll()
		if (deletedThisFields) {
			for (let field of deletedThisFields.toJSON()) {
				await ProductField.destroy({ id: field.id, transacting: trx })
			}
		}

		let existingApiDocs = []
		if (data.apidocs && data.apidocs.length) {
			let apiDocVersions = []
			for (let apiDoc of data.apidocs) {
				let api = {}, doc = {
					swagger: apiDoc.swagger,
					access_scope: apiDoc.accessScope.toLowerCase(),
					sandbox: apiDoc.sandbox || false,
					live: apiDoc.live || false,
					sandbox_source_control_key: apiDoc.sandboxSourceControlKey || null,
					sandbox_source_control_name: apiDoc.sandboxSourceControlName || null,
					product_id: id,
				}

				if (apiDoc.id) doc.id = apiDoc.id

				if (doc.swagger) {
					try {
						let swagger = JSON.parse(doc.swagger)
						api = await util.validateSwagger(swagger)
						productValidation.push(api)
					}
					catch(err) {
						logger.error('SwaggerParser', err)
						throw Boom.badRequest('Contract validation failed')
					}

					if (api.errors && !api.errors.length) {
						// create api doc
						doc.swagger = JSON.stringify(api.swagger)
						let api_doc = await ApiDoc.create({ ...doc, title: api.swagger.info.title, version: api.swagger.info.version }, { transacting: trx })
						apiDocVersions.push({
							id: api_doc.id,
							version: semver.valid(semver.coerce(api.swagger.info.version)),
						})
						existingApiDocs.push(api_doc.id)
						await apiDocSrvc.parseSwagger(api_doc.id, api.swagger, { transacting: trx })
					}
				} else {
					delete doc.swagger
					// update api doc if exists
					let found = await ApiDoc.query('where', 'id', '=', doc.id || -1).count()
					if (found > 0) {
						let updatedDoc = await ApiDoc.update(doc, { id: doc.id, transacting: trx })
						apiDocVersions.push({
							id: doc.id,
							version: semver.valid(semver.coerce(updatedDoc.get('version'))),
						})
						existingApiDocs.push(doc.id)
					}
				}
			}

			result = {
				api: {
					name: product.get('name'),
					baseUri: product.get('base_uri'),
					apiCount: productValidation.length,
					scopesCount: getScopesCount(productValidation),
				},
				validation: productValidation,
			}

			// if there's error rollback and return the validation errors
			if (productValidation.some((api) => api.errors.length)) {
				return Promise.reject(result)
			}

			let latestVersion = null
			if (product.get('version')) {
				let v = await ApiDoc.query((qb) => {
					qb.where({ product_id: id })
					qb.orderBy('version', 'desc')
					qb.limit(1)
				}).fetch()
				latestVersion = v ? `Sandbox v${v.get('version')}` : null
			}

			let productVersion = apiDocVersions[0] ? `Sandbox v${apiDocVersions[0].version}` : latestVersion
			if(apiDocVersions.length > 1) {
				apiDocVersions.sort((a, b) => {
					return semver.lt(a.version, b.version) ? 1 : (semver.gt(a.version, b.version) ? -1 : 0)
				})
				// remove the latest version from the list to deprecate
				productVersion = `Sandbox v${apiDocVersions.shift().version}`
				for(let api of apiDocVersions) {
					// update api doc deprecated state
					await ApiDoc.update({ deprecated: true }, { id: api.id, transacting: trx })
				}
			}

			await Product.update({ version: productVersion }, { id, transacting: trx })

		}

		// delete apis
		let deleteThisApis = await ApiDoc.query((qb) => {
			qb.where({ product_id: id })
			qb.where('id', 'not in', existingApiDocs)
		}).fetchAll()
		if (deleteThisApis) {
			for (let api of deleteThisApis.toJSON()) {
				await ApiDoc.destroy({ id: api.id, transacting: trx })
			}
		}
 
		return result
	}).catch((err) => {
		if (Boom.isBoom(err)) {
			throw err
		} else {
			if (err.constructor === Error)
				throw err
			return err
		}
	})

	return validationResult
}

/**
 * Delete API product
 * @async
 * @param {Integer} id									- Product id
 * @throws {Error}											- An error if fails
 * @returns {Product}										- Empty product model
 */
exports.deleteProduct = async (id) => {
	// TODO check how the scopes in the auth server relate to the subscriptions
	return await Product.destroy({ id })
}

/**
 * List API products
 * @async
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Array.<Product>}						- A collection of products
 */
exports.listProducts = async (options) => {
	return await Product.query((qb) => {
		qb.innerJoin('api_docs', 'product.id', 'api_docs.product_id')
		qb.where('api_docs.access_scope', '=', 'public')
	}).fetchPage({
		page: options.page,
		pageSize: options.pageSize,
	})
}

/**
 * List products with brands
 * @async
 * @throws {Error}											- An error if fails
 * @returns {Object}										- A collection of product and brands
 */
exports.listProductsWithBrands = async () => {
	let res = await Promise.all([
		Product.query((qb) => {
			qb.innerJoin('api_docs', 'product.id', 'api_docs.product_id')
			qb.where('api_docs.access_scope', '=', 'public')
			qb.where('product.quarantine', '=', false)
			qb.groupBy('api_docs.product_id')
		}).fetchAll(),
		Brand.findAll(),
	])

	return { products: res[0], brands: res[1] }
}

/**
 * Get API product
 * @async
 * @param {Number} productId						- The product id
 * @throws {Error}											- An error if fails
 * @returns {Product}										- The product
 */
exports.getProduct = async (productId) => {
	return await Product.query((qb) => {
		qb.innerJoin('api_docs', 'product.id', 'api_docs.product_id')
		qb.where('api_docs.access_scope', '=', 'public')
		qb.where('product.quarantine', '=', false)
		qb.where('product.id', '=', productId)
		qb.groupBy('api_docs.product_id')
	}).fetch({
		withRelated: ['usecases', 'features', 'brand', 'fields'],
	})
}

exports.getBrand = (query) => {
	return Brand.findOne(query)
}

/**
 * List products for the admin panel
 * @async
 * @param {Object} options							- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {Object}										- A collection of product and brands
 */
exports.listAdminProducts = async (options = {}) => {
	let res = await Product.query((qb) => {
		qb.select('id', 'name', 'quarantine')
	}).fetchPage({
		...options,
		withRelated: [{ 'apidocs': (qb) => {
			qb.select('id', 'title', 'version', 'access_scope', 'live', 'sandbox', 'deprecated', 'product_id')
			qb.orderBy('version', 'desc')
		}}],
	})

	return {
		products: res.toJSON().map((p) => {
			p.apidocs = p.apidocs.map((ad) => {
				ad.attributes.public = ad.get('access_scope') === 'public'
				return ad
			})
			return p
		}),
		pagination: res.pagination,
	}
}

/**
 * Get API product for the admin panel
 * @async
 * @param {Number} productId						- The product id
 * @throws {Error}											- An error if fails
 * @returns {Product}										- The product
 */
exports.getAdminProduct = async (productId) => {
	return await Product.findOne({
		id: productId,
	}, {
		withRelated: ['fields', {
			'apidocs': (qb) => {
				qb.select('id', 'title', 'version', 'access_scope', 'live', 'sandbox', 'deprecated', 'product_id')
				qb.orderBy('version', 'desc')
			},
		}],
	})
}

/**
 * Update a product API state
 * @async
 * @param {Integer} prodId							- Product id
 * @param {Integer} id									- Product API id
 * @param {Object} data									- Pagination options
 * @throws {Error}											- An error if fails
 * @returns {ApiDoc}										- The APIDoc updated
 */
exports.updateAPIState = async (prodId, id, data) => {
	const api = await ApiDoc.where({ id, product_id: prodId }).fetch()
	if (!api) {
		throw Boom.notFound()
	}
	const updateData = {}, result = { id }
	if (data.action === 'public') {
		updateData.access_scope = api.get('access_scope') === 'public' ? 'private' : 'public'
		result[data.action] = updateData.access_scope === 'public'
	} else {
		updateData[data.action] = !api.get(data.action)
		result[data.action] = updateData[data.action]
	}
	try {
		await ApiDoc.update(updateData, { id })
	} catch (e) {
		result[data.action] = !result[data.action]
	}

	return result
}

/**
 * Delete a product API
 * @async
 * @param {Integer} prodId							- Product id
 * @param {Integer} id									- Product API id
 * @throws {Error}											- An error if fails
 * @returns {ApiDoc}										- A empty model
 */
exports.deleteAPI = async (prodId, id) => {
	const api = await ApiDoc.where({ id, product_id: prodId }).fetch()
	if (!api) {
		throw Boom.notFound()
	}
	return await ApiDoc.destroy({ id })
}
