const paymentService = require('../../services/payment')
const appService = require('../../services/app')
const logger = require('../../utils/logger')
const config = require('../../../config')

exports = module.exports = {}

const brandMapper = {
	'bnp;bnppf;bnpparibasfortis': 'bnppf_logo.svg',
	'fintro': 'fintro_logo.svg',
	'hb;hellobank': 'hellobank_logo.svg',
}

exports.getBrand = async (brand, clientId, paymentRequestResourceId, token) => {
	if (!config.get('branded')) {
		return 'logo.svg'
	}

	if (brand) {
		const brandLogo = Object.keys(brandMapper).filter((brands) => {
			return brands.split(';').indexOf(brand) > -1
		})
		return brandLogo.length ? brandMapper[brandLogo[0]] : null
	}

	const container = await appService.findAppContainerByClientId(clientId)

	if (!container) return null

	let paymentRequest
	try {
		paymentRequest = await paymentService.getPayment(container.name, paymentRequestResourceId, token)
		await paymentService.checkPaymentValidity(clientId, token, paymentRequest)
	} catch (error) {
		logger.error(error)
		return null
	}

	const brandPR = paymentRequest.headers['x-brand']
	const brandLogo = Object.keys(brandMapper).filter((brands) => {
		return brands.split(';').indexOf(brandPR) > -1
	})

	return brandLogo.length ? brandMapper[brandLogo[0]] : null
}
