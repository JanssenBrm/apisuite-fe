const Promise = require('bluebird')
const ApiDoc = require('../../models/ApiDoc')
const Product = require('../../models/Product')
const Brand = require('../../models/Brand')
const Boom = require('boom')

const logger = require('../../utils/logger')
const ProductEndpoint = require('../../models/ProductEndpoint')

const persistence = require('./persistence')

exports = module.exports = {}

/**
 * Module responsible for all the api documentation.
 * @module services/apiDocs
 */

/**
 * Verify the brand and product relation
 * @async
 * @param {String} brandName			- The brand name
 * @param {Number} productId			- The Product id
 * @returns {Boolean}							- If the products matches the brand
 */
exports.checkBrand = async (brandName, productId) => {
	let res = await Promise.all([
		Product.findOne({
			id: productId,
		}),
		Brand.findOne({
			name: brandName,
		}),
	])

	let product = res[0] && res[0].toJSON ? res[0].toJSON() : res[0]
	let brand = res[1] && res[1].toJSON ? res[1].toJSON() : res[1]

	return product.brand_id === brand.id
}

/**
 * Get the API documentation
 * @async
 * @param {Number} productId			- The Product id
 * @param {String} role						- The API role
 * @param {String} version				- The API version
 * @throws {Error}								- An error if fails
 * @returns {ApiDoc|null}							- The API documentation model
 */
exports.getApiDoc = async (productId, role, version) => {
	return await ApiDoc.findOne({
		product_id: productId,
		role,
		version,
	}, {
		required: false,
	})
}

/**
 * Parses the methods to persist the endpoints for each method
 * @param { Number } apiId  - ApiDoc Id
 * @param {Object} metadata			- Metadata of the swagger
 * @param {Array} methods				- HTTP methods of the swagger
 * @param {Object} paths				- Paths of the swagger
 * @param {String} path					- Current path
 * @returns {void}							-
 */
const parseMethods = async (apiId, metadata, methods, paths, path) => {
	logger.info('Parsing incoming methods')

	const regex = /(?={).*?(})/g
	const pathToSave = `${metadata.baseUrl}${path.replace(regex, '*')}`

	return await Promise.each(methods, async method => {

		const endpointToSave = {
			version: metadata.version,
			apiId,
			method,
			pathToSave,
		}
		
		const result = await saveProductEndpoint(endpointToSave)

		return result
	})
	
}

/**
 * Parses the paths to persist the endpoints
 * @param { Number } apiId  - Api Doc Id
 * @param {Object} metadata			- Metadata of the swagger
 * @param {Array} paths					- Paths of the swagger
 * @param {Object} options			- Options for Bookshelf/knex
 * @returns {void}							-
 */
const parsePaths = async (apiId, metadata, paths, options = {}) => {
	logger.info('Parsing incoming paths')
	
	const keys = Object.keys(paths)

	const promises = []

	keys.forEach(key => {
		const methods = Object.keys(paths[key])
		const regex = /(?={).*?(})/g
		const pathToSave = `${metadata.baseUrl}${key.replace(regex, '*')}`

		methods.forEach(m => {
			
			const payload = {
				method: m,
				path: pathToSave,
				api_id: apiId,
			}

			promises.push(ProductEndpoint.create(payload, { ...options }))
		})
	})

	return Promise.all(promises)
}

/**
 * Parses the methods to persist the endpoints for each method
 * @param {Object} endpoint		  - endpoint payload
 * @returns {void}							-
 */
const saveProductEndpoint = async (endpoint) => {
	return await persistence.createEndpoint(endpoint)
}

/**
 * @param {String} path - 
 * @param {String} method -
 * @param {String} brand -
 * @param {Object} endpoints -
 * @returns {Object} - 
 */
const matcher = (path, method, brand = 'bnpparibasfortis', endpoints) => {
	let routes = {}
	
	endpoints.toJSON().forEach(route => {
		const apiDoc = route.api
		const product = apiDoc.products
		
		const key = route.path + '_' + route.method + '_' + route.brand 

		if (routes[key]) {

			if(routes[key].apiId < apiDoc.id) {
				routes[key] = 
					{ 
						quarantine: product.quarantine,
						visibility: apiDoc.accessScope,
						method: route.method,
						brand: route.brand,
						apiId: apiDoc.id,
					}
			}
		} else {
			routes[key] = 
					{ 
						quarantine: product.quarantine,
						visibility: apiDoc.accessScope,
						method: route.method,
						brand: route.brand,
						apiId: apiDoc.id,
					}
		}
	})

	routes = Object.keys(routes)
		.sort((a,b)=> b.length - a.length)
		.map((path) => {
			return {
				path: path,
				matcher: new RegExp('^' + path.replace(/\*/g, '([\\w-]+)') + '$'),
				visibility: routes[path].visibility,
				quarantine: routes[path].quarantine,
				method: routes[path].method,
				brand: routes[path].brand,
			}
		})
	
	for (let i = 0, l = routes.length; i < l; i++) {
		const source = path + '_' + method + '_' + brand
		const match = source.match(routes[i].matcher)		
		if (match) {
			return routes[i]
		}
	}
}

exports.matcher = matcher

exports.parsePaths = async (apiId, metadata, paths) => {
	return await parsePaths(apiId, metadata, paths)
}

exports.parseMethods = async (apiId, metadata, methods, paths, path) => {
	return await parseMethods(apiId, metadata, methods, paths, path)
}

exports.parseSwagger = async (apiId, payload, options = {}) => {
	logger.info('Parsing incoming swagger')

	const { servers ,paths, info } = payload

	if (!servers) throw Boom.badRequest('Payload missing servers property')
	if (!paths) throw Boom.badRequest('Payload missing paths property')
	if (!info) throw Boom.badRequest('Payload missing info property')

	const baseUrlExists = servers && servers.length > 0 && servers[0].url
	let baseUrl


	if (baseUrlExists) 
		baseUrl = servers[0].url
	else if(payload.basePath) {
		baseUrl = payload.basePath
	} else {
		baseUrl = ''
	}
		


	const meta = { 
		...info,
		baseUrl,
	}

	return await parsePaths(apiId, meta, paths, options)

}

exports.findProductEndpointStatus = async (path, method, brand) => {

	if(await persistence.isWhitelisted(path, method)) {
		return { visibility: 'public', quarantine: false, brand }
	}

	const allEndpoints = await persistence.getAllEndpoints()

	const match = matcher(path, method, brand, allEndpoints)
	
	if (match) 
		return { visibility: match.visibility, quarantine: match.quarantine, brand: match.brand }
}
