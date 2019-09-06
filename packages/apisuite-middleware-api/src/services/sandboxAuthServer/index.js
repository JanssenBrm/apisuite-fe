const config = require('../../config')
const uuid = require('uuid')
const request = require('./request')
const fs = require('fs')

const Product = require('../../models/Product')
const TestUserAccountType = require('../../models/TestUserAccountType')

const { withCert, certPath, keyPath, certPassphrase } = config.get('certificate')
const agentOptions = withCert && certPath && keyPath && fs.existsSync(certPath) && fs.existsSync(keyPath)
	? ({
		cert: fs.readFileSync(certPath),
		key: fs.readFileSync(keyPath),
		passphrase: certPassphrase,
	})
	: {}

exports = module.exports = {}

/**
 * Module
 * @module services/sandboxAuthServer
 */

/**
 * Create App bound to organization
 *
 * @async
 * @param		{Object}	appData							- The app data object
 * @param		{Array}	productIds						- The app products ids to be subscribed to
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.createApp = async (appData, productIds = []) => {
	let products = []

	for (const productId of productIds) {
		const product = await Product.findOne({ id: productId }, { withRelated: ['brand'] })
		products.push({
			scope: product.get('role'),
			brand: product.related('brand').get('shortname'),
		})
	}

	// remove products without scope since that will break the auth server request
	products = products.filter((prd) => prd.scope)

	return await request.authServer({
		method: 'POST',
		uri: `${config.get('sandboxAuthServer').host}/apps`,
		body: {
			...appData,
			products,
		},
		json: true,
	})
}

/**
 * List organization apps bound to an organization
 *
 * @async
 * @param		{String}	organizationId			- Organization Id
 * @param		{Object}	options							- Request pagination options
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.listApps = async (organizationId, options) => {
	let qs = options || {}
	qs.org_id = organizationId

	return await request.authServer({
		method: 'GET',
		uri: `${config.get('sandboxAuthServer').host}/apps`,
		qs,
		json: true,
	})
}

/**
 * Get a specific organization app
 *
 * @async
 * @param		{String}	appId								- App Id
 * @param		{Object}	appData							- The app data object
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.getApp = async (appId) => {
	return await request.authServer({
		method: 'GET',
		uri: `${config.get('sandboxAuthServer').host}/apps/${appId}`,
		json: true,
	})
}

/**
 * Update app
 *
 * @async
 * @param		{String}	appId								- App Id
 * @param		{Object}	updatedObj					- Updated object
 * @param		{Array}		productIds					- The app products ids to be subscribed to
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.updateApp = async (appId, updatedObj, productIds = []) => {
	let products = []

	for (const productId of productIds) {
		const product = await Product.findOne({ id: productId }, { withRelated: ['brand'], require: false })
		products.push({
			scope: product.get('role'),
			brand: product.related('brand').get('shortname'),
		})
	}

	// remove products without scope since that will break the auth server request
	products = products.filter((prd) => prd.scope)

	return await request.authServer({
		method: 'PUT',
		uri: `${config.get('sandboxAuthServer').host}/apps/${appId}`,
		body: {
			...updatedObj,
			products,
		},
		json: true,
	})
}

/**
 * Deletes an app by id
 *
 * @async
 * @param		{String}	appId								- App Id
 * @throws	{Error}												- An error when request fails
 * @returns	{Void}												-
 */
exports.deleteApp = async (appId) => {
	return await request.authServer({
		method: 'DELETE',
		uri: `${config.get('sandboxAuthServer').host}/apps/${appId}`,
		json: true,
	})
}

/**
 * Get the organization container data
 *
 * @async
 * @param		{String}	organizationId			- Organization Id
 * @param		{Object}	options							- Request pagination options
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.getOrgContainer = async (organizationId, options) => {
	let qs = options || {}
	qs.org_id = organizationId

	return await request.authServer({
		method: 'GET',
		uri: `${config.get('sandboxAuthServer').host}/organization_containers`,
		qs,
		json: true,
	})
}

/**
 * Create organization container bound to organization
 *
 * @param		{Integer}	orgId								- The organization id
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Created app object
 */
exports.createOrganizationContainer = async (orgId) => {
	return await request.authServer({
		method: 'POST',
		uri: `${config.get('sandboxAuthServer').host}/organization_containers`,
		body: {
			organizationId: orgId,
			name: uuid.v4(),
		},
		json: true,
	})
}

/**
 * Retrieves sandbox psus
 *
 * @param		{Object}	containerName				- The container name
 * @param		{Object}	options							- The pagination options
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Psus list with their linked accounts
 */
exports.getPsus = async (containerName, options) => {
	return await request.authServer({
		method: 'GET',
		uri: `${config.get('kong').gateway.url}/admin/psus`,
		headers: {
			'X-Openbank-Organization': containerName,
			'X-Openbank-Stet-Version': '1.4.0.47.develop',
		},
		agentOptions,
		qs: options,
		json: true,
	})
}

/**
 * Calculate the sum of the balances of the closing balance of each account
 *
 * @param {Array} accounts	- The psu details accounts array
 * @returns {Number} 				- The total balance
 */
const getTotalBalance = (accounts) => {
	return accounts.reduce(
		(prev, curr) => {
			const closingBalance = curr.balances[0]
			const { amount } = closingBalance.balanceAmount
			return prev + parseFloat(amount)
		}, 0)
}

/**
 * Retrieves sandbox psu details
 *
 * @param		{Object}	containerName				- The container name
 * @param		{Number}	psuId								- The psu id
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Psu data with its linked accounts and balances
 */
exports.getPsuDetails = async (containerName, psuId) => {
	const psuDetails = await request.authServer({
		method: 'GET',
		uri: `${config.get('kong').gateway.url}/admin/psus/${psuId}`,
		headers: {
			'X-Openbank-Organization': containerName,
			'X-Openbank-Stet-Version': '1.4.0.47.develop',
		},
		agentOptions,
		json: true,
	})

	return {
		...psuDetails,
		totalBalance: getTotalBalance(psuDetails.accounts),
	}
}

/**
 * Updates a sandbox psu details
 *
 * @param		{Object}	containerName				- The container name
 * @param		{Number}	psuId								- The psu id
 * @param		{Number}	payload							- The psu data to update
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Psu data with its linked accounts and balances
 */
exports.updatePSU = async (containerName, psuId, payload) => {
	const psuDetailsUpdated = await request.authServer({
		method: 'PUT',
		uri: `${config.get('kong').gateway.url}/admin/psus/${psuId}`,
		headers: {
			'X-Openbank-Organization': containerName,
			'X-Openbank-Stet-Version': '1.4.0.47.develop',
		},
		agentOptions,
		body: payload,
		json: true,
	})

	return {
		...psuDetailsUpdated,
		totalBalance: getTotalBalance(psuDetailsUpdated.accounts),
	}
}

/**
 * Retrieves sandbox account transactions list
 *
 * @param		{Object}	containerName				- The container name
 * @param		{Number}	accountId						- The account id
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- Psu data with its linked accounts and balances
 */
exports.getAccountTransactions = async (containerName, accountId) => {
	return await request.authServer({
		method: 'GET',
		uri: `${config.get('kong').gateway.url}/admin/accounts/${accountId}/transactions`,
		headers: {
			'X-Openbank-Organization': containerName,
			'X-Openbank-Stet-Version': '1.4.0.47.develop',
		},
		agentOptions,
		json: true,
	})
}

/**
 * Add sandbox PSU
 *
 * @param		{Object}	containerName				- The container name
 * @param		{Object}	psuData							- The PSU data
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- The created PSU with the linked accounts
 */
exports.addPSU = async (containerName, psuData) => {
	return await request.authServer({
		method: 'POST',
		uri: `${config.get('kong').gateway.url}/admin/psus`,
		headers: {
			'X-Openbank-Organization': containerName,
			'X-Openbank-Stet-Version': '1.4.0.47.develop',
		},
		agentOptions,
		body: psuData,
		json: true,
	})
}

/**
 * Get the test user accounts list
 *
 * @param		{Object}	filter							- Filter for the find all
 * @param		{Object}	options							- Options for the find all
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- The list of test user account types
 */
exports.getPsuAccountTypes = async (filter, options) => {
	return await TestUserAccountType.findAll(filter, options)
}

/**
 * Get test user account
 *
 * @param		{Number}	accountTypeId				- The account type id
 * @param		{Object}	options							- Options for the find by id.
 * @throws	{Error}												- An error when request fails
 * @returns	{Object}											- The test user account
 */
exports.getPsuAccountTypeById = async (accountTypeId, options) => {
	return await TestUserAccountType.findById(accountTypeId, options)
}
