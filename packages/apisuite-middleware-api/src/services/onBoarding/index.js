const crypto = require('crypto')
const OnboardingToken = require('../../models/OnboardingToken')
const bookshelf = require('../../utils/bookshelf')

const User = require('../../models/User')
// const Organization = require('../../models/Organization')
const sandboxAuthServer = require('../../services/sandboxAuthServer')
const productServices = require('../../services/product')
const config = require('../../config')

exports = module.exports = {}

exports.generateToken = async (user) => {
	const token = crypto
		.randomBytes(64)
		.toString('hex')

	const expiresIn = new Date((Math.floor(Date.now() / 1000) + config.get('oauth2').token_expiresIn) * 1000)

	// Update if user has one or create if user doesnt have any
	await OnboardingToken.upsert({ user_id: user.id	},
		{
			token,
			expiration_date: expiresIn,
			user_id: user.id,
		})

	return { token, expiresIn }
}

/**
 * Validates an onboarding bearer token
 *
 * @async
 * @param		{String}	token			- Token to validate
 * @throws	{Error}							-	Throws an error if token is not found or is expired
 * @returns	{OauthAccessToken}	- Returns an onBoardingToken model
 */
exports.validateBearerToken = async (token) => {

	// If not found, will be thrown
	let foundToken = await OnboardingToken.findOne({ token }, {
		withRelated: ['user'],
	})

	// Check if token is expired
	if (new Date() > foundToken.get('expiration_date'))
		throw new Error('Token is expired')

	return { token: foundToken }
}

exports.onBoardUser = async (obData, organization) => {

	// retrieve all products
	const products = await productServices.listProducts({
		page: 1,
		pageSize: 20,
	})

	// If new user invite him

	return bookshelf.transaction(async (trx) => {

		// Create User
		let user = await User.create({
			email: obData.client_contacts.mail,
			full_name: obData.client_contacts.firstName + ' ' + obData.client_contacts.lastName,
			phone_number: obData.client_contacts.phone,
		}, { transacting: trx })

		// attach org to user
		await user.organizations().attach({ organization_id: organization.get('id'), role: 'ADMIN' }, { transacting: trx })

		const organizationProducts = organization.related('products')
		
		// subscribe all products
		for (let prod of products.toJSON()) {
			await organizationProducts.create(prod, { transacting: trx })
		}

		await sandboxAuthServer.createOrganizationContainer(organization.id)

		// create app
		const app = await sandboxAuthServer.createApp({
			name: obData.client_name,
			description: obData.client_description || null,
			ownerId: user.id,
			organizationId: organization.id,
			redirectURLs: obData.redirect_uris,
		}, products.map(p => p.id))

		// store cert
		// need @Delio help
	
		return { user, organization, app }
	})
}
