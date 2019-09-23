exports = module.exports = {}

const axios = require('axios')
const fs = require('fs')
const config = require('../../../config')
const https = require('https')
const logger = require('../../utils/logger')

const apiGateway = config.get('kong').gateway.url
const imageTag = config.get('sandbox').imageTag

const uuid = require('uuid/v4')
const Boom = require('boom')

const { withCert, certPath, keyPath, certPassphrase } = config.get('certificate')
const agentOptions = withCert && certPath && keyPath && fs.existsSync(certPath) && fs.existsSync(keyPath)
	? ({
		cert: fs.readFileSync(certPath),
		key: fs.readFileSync(keyPath),
		passphrase: certPassphrase,
	})
	: {}

exports.validatePsu = async (uid, pwd, container) => {
	// this has to hit a sandbox endpoint and grab the psu by its uid/username/email or whatever

	// use Wreck to access the sandbox and grab the PSU
	// Should register this auth server as an App and Consumer in Kong
	// Get a kong access token to be able to access the sandbox endpoint
	// make a POST request to:
	// https://kong-api-gateway:9943/psu
	// with a payload of:
	// {username: uid, password: password, container: container}
	// should return authenticated psu


	const psuInstance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version': imageTag,
		},
	})

	const psuRequest = await psuInstance.post(`${apiGateway}/auth/psu`, {
		username: uid,
		password: pwd,
	})

	if (!psuRequest.data) {
		throw new Error('psu not found')
	}

	return psuRequest.data

}

exports.createAccreditation = async (clientId, clientSecret, userId, scope, container) => {
	logger.debug(`Container base url: ${apiGateway}`)

	let accInstance
	accInstance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version': imageTag,
			'X-Client-Id': clientId,
			'X-Client-Secret': clientSecret,
			'X-Client-Scope': 'internal',
			'X-User-Id': userId,
		},
	})

	logger.debug(`Sending POST request to ${apiGateway}/accreditation with the scope of ${scope}`)
	const accRequest = await accInstance.post(`${apiGateway}/accreditation`, {
		scope: scope,
	})

	if (accRequest.status !== 201 && accRequest.status !== 200) {
		logger.error(`Accredtiation creation failed with error code ${accRequest.status}`)
		throw new Error('Accreditation creation failed')
	}

	logger.debug('Accreditation created successfuly')
	return accRequest.data
}

exports.getAccounts = async (token, container) => {
	let accInstance

	accInstance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version' : imageTag,
			'Authorization': `Bearer ${token}`,
			'X-Request-Id': uuid(),
			'Signature': uuid(),
		},
	})

	const accRequest = await accInstance.get(`${apiGateway}/v1/accounts`)

	if (accRequest.status !== 200) {
		throw Boom.forbidden('Could not retrieve accounts for this PSU')
	}

	return accRequest.data
}


exports.getPsuAccounts = async (token, container) => {
	let accInstance

	accInstance = axios.create({
		httpsAgent: new https.Agent({
			rejectUnauthorized: false,
			...agentOptions,
		}),
		headers: {
			'X-APISuite-Organization': container,
			'X-APISuite-Stet-Version' : imageTag,
			'Authorization': `Bearer ${token}`,
			'X-Request-Id': uuid(),
			'Signature': uuid(),
		},
	})

	const accRequest = await accInstance.get(`${apiGateway}/admin/psus/accounts`)

	if (accRequest.status !== 200) {
		throw Boom.forbidden('Could not retrieve accounts for this PSU')
	}
	return accRequest.data
}
