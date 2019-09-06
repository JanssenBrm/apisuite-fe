const logger = require('../../utils/logger')
const config = require('../../config')
const paymentService = require('../payment-requests')

exports = module.exports = {}

exports.startPaymentsExecutionScheduler = async () => {
	logger.info('Start pending payments execution scheduler')
	const interval = config.get('tokenPaymentExecution').interval

	setInterval(async () => {
		logger.info('Executing scheduled payments every ' + interval + ' ms')

		await paymentService.executePendingPayments()

		const date = new Date()
		date.setHours(19)
		date.setMinutes(0)
		date.setSeconds(0)
		const nextRun = new Date(date.getTime() + interval)

		logger.info('Scheduled payments were executed. Next payments execution will happen at ' + nextRun)
	}, interval)
}
