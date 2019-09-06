const config = require('../../config')

exports = module.exports = {}

exports.postPaymentRequests = {
	prepare: (rep, next) => {
		const { clientId } = rep.request.auth.artifacts

		rep.link('consentApproval', `${config.get('auth').url}/payment-requests/${rep.entity.paymentRequestResourceId}/consent?client_id=${clientId}`)
		rep._links.self = undefined

		rep.ignore(['paymentRequestResourceId'])

		next()
	},
}

exports.updatePaymentRequestByResourceId = {
	prepare: (rep, next) => {
		const { paymentRequestResourceId } = rep.request.params
		const { clientId } = rep.request.auth.artifacts

		rep.link('consentApproval', `${config.get('auth').url}/payment-requests/${paymentRequestResourceId}/consent?client_id=${clientId}`)
		rep._links.self = undefined

		next()
	},
}
