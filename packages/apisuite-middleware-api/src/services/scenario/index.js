const Wreck = require('wreck')
const Boom = require('boom')
const qs = require('qs')
const logger = require('../../utils/logger')
const scenarioUrl = require('../../config').get('appcenter').scenario

exports = module.exports = {}

exports.scenarioGetAll = async (page, pageSize) => {
	const url = `${scenarioUrl}/scenarios?page=${page}&pageSize=${pageSize}`
	const result = await Wreck.get(url)

	try {
		return JSON.parse(result.payload.toString())
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}

exports.scenarioGetFiltered = async (options) => {
	const queryParams = qs.stringify(options)
	const url = `${scenarioUrl}/scenarios?${queryParams}`

	const result = await Wreck.get(url)

	try {
		return JSON.parse(result.payload.toString())
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}

exports.scenarioGetOne = async (id) => {
	const url = `${scenarioUrl}/scenarios/${id}`
	const result = await Wreck.get(url)

	return JSON.parse(result.payload.toString())
}

exports.scenarioCreate = async (payload) => {
	const result = await Wreck.post(`${scenarioUrl}/scenarios`, {
		payload: payload,
	}).catch((result) => {
		throw result
	})

	return JSON.parse(result.payload.toString())
}

exports.scenarioUpdate = async (id, payload) => {
	const url = `${scenarioUrl}/scenarios/${id}`
	const result = await Wreck.put(url, {
		payload: payload,
	})

	return JSON.parse(result.payload.toString())
}

exports.scenarioDelete = async (id) => {
	const url = `${scenarioUrl}/scenarios/${id}`
	const result = await Wreck.delete(url)

	try {
		return result.payload
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}

exports.endpointGetAll = async (page, pageSize, apiName, version) => {
	const queryParams = qs.stringify({ page, pageSize, apiName, version }, { allowDots: true })
	const url = `${scenarioUrl}/endpoints?${queryParams}`
	const result = await Wreck.get(url)

	try {
		return JSON.parse(result.payload.toString())
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}

exports.endpointGetApis = async () => {
	const url = `${scenarioUrl}/apis`
	const result = await Wreck.get(url)

	try {
		return JSON.parse(result.payload.toString())
	} catch (error) {
		logger.error(error)
		throw Boom.internal(error)
	}
}
