const Boom = require('boom')

const log = require('../../utils/logger')
const Organization = require('../../models/Organization')
const Product = require('../../models/Product')

exports = module.exports = {}

/**
 * Module responsbile for all user registration services.
 * @module services/productSubscription
 */

/**
 * List organizations subscriptions
 * @async
 * @param {Int} orgId 									- Organization id
 * @throws {Error}											- An error if fails
 * @returns {Array.<Product>}						- A collection of organization product subscriptions
 */
exports.listOrganizationProducts = async (orgId) => {
	const organization = await Organization.findOne({ id: orgId }, { withRelated: ['products'] })
	return organization.related('products')
}

/**
 * Subscribes to products for an organization
 * @async
 * @param {Int} orgId 									- Organization id
 * @param {Int} productIds 							- List of product ids to add
 * @throws {Error}											- An error if fails
 * @returns {void}											-
 */
exports.addProductsToOrganization = async (orgId, productIds) => {
	const organization = await Organization.findOne({ id: orgId }, { withRelated: ['products'] })
	const organizationProducts = organization.related('products')

	for (const productId of productIds) {
		const product = await Product.findOne({ id: productId }, { require: false })

		if (!product) {
			log.warn(`product with id=${productId} does not exist`)
		}

		const subscriptionExists = organizationProducts.toJSON().filter(product => product.id == productId).length > 0

		if (product && !subscriptionExists) {
			await organizationProducts.create(product)
				.catch((error) => {
					log.error({ error }, `failed to create product subscription ${productId}`)
					throw Boom.internal()
				})
		}
	}

	return organizationProducts
}
