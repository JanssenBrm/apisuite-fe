const ProductEndpoint = require('../../models/ProductEndpoint')
const EndpointWhitelist = require('../../models/EndpointWhitelist')
const knex = require('../../utils/knex')

exports = module.exports = { }

exports.getEndpoint = async (method, path, apiId) => {

	return await ProductEndpoint.findOne({
		method,
		path,
		api_id: apiId,
	})

}

exports.getAllEndpoints  = async () => {
	return await ProductEndpoint.forge()
		.fetchAll({withRelated: [{
			'apiDoc': (qb) => {
				qb.select('id', 'access_scope', 'product_id')
			},
		}, 'apiDoc.products' ]})
}

exports.getEndpointByPathAndMethod = async (path, method) => {
	return await ProductEndpoint.findOne({
		method,
		path,
	})
}

exports.createEndpoint = async (endpoint) => {

	const payload = {
		method: endpoint.method,
		path: endpoint.path,
		api_id: endpoint.apiId,
	}

	return await ProductEndpoint.create(payload)
}

exports.updateEndpoint = async (endpoint) => {

	const payload = {
		method: endpoint.method,
		path: endpoint.path,
		api_id: endpoint.apiId,
		visibility: endpoint.visibility,
	}

	return await ProductEndpoint.update(payload, {id: endpoint.id})

}

exports.isWhitelisted = async (path, method) => {
	let count = await EndpointWhitelist.query((qb) => {
		qb.where('method', '=', method)
		// eslint-disable-next-line no-useless-escape
		qb.where(knex.raw(`"${path}" rlike concat('^', replace(replace(path, '*', '.\*'), '/', '\/'), '$')`))
	}).count()

	return count > 0
}
