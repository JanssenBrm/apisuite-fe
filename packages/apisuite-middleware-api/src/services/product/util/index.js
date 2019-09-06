const semver = require('semver')
const converter = require('swagger2openapi')
const _ = require('lodash')
const logger = require('../../../utils/logger')
const Ajv = require('ajv')
const ajv = new Ajv({ schemaId: 'id', allErrors: true })
ajv.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'))
const schemav2 = ajv.compile(require('./schema.v20.json'))
// const schemav3 = ajv.compile(require('./schema.v30.json'))

const OPENAPI3_REQUIRED_KEYS = {
	openapi: {
		key: 'openapi',
		type: 'string',
	},
	info: {
		key: 'info',
		type: 'object',
		title: {
			key: 'info.title',
			type: 'string',
		},
		version: {
			key: 'info.version',
			type: 'string',
		},
	},
	paths: {
		key: 'paths',
		type: 'object',
	},
	components: {
		key: 'components.schemas',
		type: 'object',
	},
}

/**
 * Get tnested property
 * @param {Object} obj - Object to search property from
 * @param {String} prop - Property to search in dot notation `a.b.c.d`
 * @returns {Any} - The property value
 */
const getNestedProp = (obj, prop) => {
	return prop.split('.').reduce((ob, p) => {
		return ob ? ob[p] : null
	}, obj)
}

/**
 * Find the property in object
 * @param {Object} obj - Object to search on
 * @param {String} key - Property to search
 * @returns {Object} - The found property
 */
const findProp = (obj, key) => {
	if (_.has(obj, key)) // or just (key in obj)
		return [obj]

	let res = []
	_.forEach(obj, function(v) {
		if (typeof v === 'object' && (v = findProp(v, key)).length)
			res.push.apply(res, v)
	})
	return res
}

/**
 * Check if version is in a valid semantic version format
 * @param {String} version - Version to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
const validateVersion = async(version) => {
	try{
		return await semver.valid(semver.coerce(version)) !== null
	} catch (e) {
		logger.error('[validateVersion] error:', e)
		return false
	}
}

/**
 * Check if the field exist and is valid
 * @param {Object} obj - The object to check for the field
 * @param {String} field - The field to search
 * @param {String} type - The type to validate
 * @returns {Boolean} - True if valid, false otherwise
 */
const validField = (obj, field, type) => {
	let value = getNestedProp(obj, field)
	return typeof value === type
}

/**
 * Validate the servers property in the swagger object
 * @param {Object} servers - The swagger servers object to validate
 * @returns {Array.<String>} - Array of errors
 */
const validateServers = (servers) => {
	let errors = []
	let valid = servers.every((serv) => {
		return serv.hasOwnProperty('url') && typeof serv.url === 'string'
	})

	if (!valid) {
		errors.push({
			message: 'One or more `servers` property is invalid.',
		})
	}

	return errors
}

/**
 * Check if the swagger object is a Open API 3.0 file
 * @param {Object} swagger - The swagger object
 * @returns {Boolean} - True if it is
 */
const checkIfOpenAPI = (swagger) => {
	if(typeof swagger !== 'object') throw Error(`[${typeof swagger}] is not of type object.`)
	return swagger.hasOwnProperty('openapi')
}

/**
 * Validate the swagger object against Open API 3.0
 * @param {Object} swagger - The swagger object
 * @returns {Object} - The swagger with the errors found
 */
const validateOpenAPI3 = async (swagger) => {
	let api = swagger, errors = []

	// check for the required property openapi
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.openapi.key, OPENAPI3_REQUIRED_KEYS.openapi.type)
    || !await validateVersion(getNestedProp(swagger, OPENAPI3_REQUIRED_KEYS.openapi.key))) {
		errors.push({
			message: 'No `openapi` provided or invalid version/type.',
		})
	}

	// check for the required property info
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.info.key, OPENAPI3_REQUIRED_KEYS.info.type)) {
		errors.push({
			message: 'No `info` provided or invalid type.',
		})
	}
	// check for required properties in info object
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.info.title.key, OPENAPI3_REQUIRED_KEYS.info.title.type)) {
		errors.push({
			message: 'No contract `info.title` provided or invalid type.',
		})
	}
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.info.version.key, OPENAPI3_REQUIRED_KEYS.info.version.type)
    || !await validateVersion(getNestedProp(swagger, OPENAPI3_REQUIRED_KEYS.info.version.key))) {
		errors.push({
			message: 'No contract `info.version` provided or invalid version/type.',
		})
	}

	// check for the required property paths
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.paths.key, OPENAPI3_REQUIRED_KEYS.paths.type)) {
		errors.push({
			message: 'No `paths` provided or invalid type.',
		})
	}

	// check for the our required property components schemas
	if (!validField(swagger, OPENAPI3_REQUIRED_KEYS.components.key, OPENAPI3_REQUIRED_KEYS.components.type)) {
		errors.push({
			message: 'No `models` provided or invalid type.',
		})
	}

	// check for the servers property
	if(!swagger.hasOwnProperty('servers') || !swagger.servers.length) {
		errors.push({
			message: 'Environment URI missing.',
		})
	} else {
		let err = validateServers(swagger.servers)
		if (err.length) {
			errors.concat(err)
		}
	}

	if (errors.length) {
		api = {
			message: 'Contract validation failed',
		}
	}

	return {
		api: api,
		errors,
	}
}

/**
 * Validate the swagger object
 * @param {Object} swagger - The swagger object
 * @returns {Object} - The swagger with the errors found
 */
const validateSwagger = async (swagger) => {
	let api = null, errors = []
	if (checkIfOpenAPI(swagger)) {
		const validationRes = await validateOpenAPI3(swagger)
		api = validationRes.api
		errors = validationRes.errors
	} else {
		let valid = schemav2(swagger)
		if (valid) {
			let res = await converter.convertObj(swagger, { verbose: true, lint: true })
			const validationRes = await validateOpenAPI3(res.openapi)
			api = validationRes.api
			errors = validationRes.errors
		} else {
			api = {
				message: 'Contract validation failed',
			}
			errors = [...schemav2.errors]
		}
	}

	return {
		swagger: api,
		errors,
	}
}

module.exports = {
	validateSwagger,
	getNestedProp,
	findProp,
}
