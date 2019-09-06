const appService = require('../app')
const persistence = require('./persistence')
const boom = require('boom')
const logger = require('../../utils/logger')

exports = module.exports = {}

/**
 * @param {String} clientId -
 * @returns { String } -
 */
const getContainer = async (clientId) => {

	const appContainer = await appService.findAppContainerByClientId(clientId)

	if (!appContainer) {
		throw boom.badData('container not found')
	}

	const container = appContainer.name

	if (!container) {
		throw boom.badData('container cannot be null')
	}

	return container
}

exports.validatePsu = async (uid, pwd, container) => {
	logger.debug('Validating PSU')
	const result = await  persistence.validatePsu(uid, pwd, container)
	logger.debug('PSU was validated')
	return result
}

exports.createAccreditation = async (clientId, clientSecret, userId, scope) => {
	logger.debug('[create accreditation]')
	logger.debug('Retrieving sandbox container where the accreditation will be created')
	const container = await getContainer(clientId)
	logger.debug(`Container was found: ${container}`)

	logger.debug('Creating accreditation on the container')
	const result = await persistence.createAccreditation(clientId, clientSecret, userId, scope, container)
	logger.debug('Accreditation created on the container')
	return result

}

exports.getAccounts = async (clientId, token) => {

	const container = await getContainer(clientId)

	const result = await persistence.getAccounts(token, container)

	return result
}

exports.getPsuAccounts = async (clientId, token) => {

	const container = await getContainer(clientId)

	const result = await persistence.getPsuAccounts(token, container)

	return result
}
