const Joi = require('joi')
const Boom = require('boom')
const crypto = require('crypto')

const logger = require('../../utils/logger')
const httpErrors = require('../../utils/swagger/schemas/httpErrors')
const commonHeaders = require('../../utils/swagger/schemas/headers/common')
const hal = require('./hal')
const paymentRequestService = require('../../services/payment-requests')
const accountPersistence = require('../../services/accounts/persistence')
const util = require('./util')

exports = module.exports = {}

/**
 * @memberof module:plugins/payment_requests
 */


/**
 * POST /v1/payment-requests handler
 */
exports.postPaymentRequests = {
	id: 'paymentRequestsPost',
	description: `<h3>Description</h3>
	The following use cases can be applied:
	<ul>
		<li>payment request on behalf of a merchant</li>
		<li>transfer request on behalf of the account's owner</li>
		<li>standing-order request on behalf of the account's owner</li>
	</ul>`,
	notes: ['Payment request initiation (PISP)'],
	tags: ['api', 'PISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'201': {
					description: 'Created',
					headers: {
						'location': Joi.string()
							.description(`URI of the created (and updated if needed) Payment Request. 

							Actually, this link is the URI to be used (cf. § 4.6) for
							retrieving the Payment Request ant its status:
								- GET /payment-requests/{paymentRequestResourceId}
							The parameter {paymentRequestResourceId} is the identifier of
							the Payment Request, as the resource that was created on the
							ASPSP server side.`),
						'X-Request-ID': Joi.string()
							.description('Correlation header to be set in a request and retrieved in the relevant response'),
						'Digest': Joi.string()
							.description('Digest of the body'),
						'Signature': Joi.string()
							.description('http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/) The keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.'),
					},
					schema: Joi.object({
						appliedAuthenticationApproach: Joi.string()
							.valid('REDIRECT', 'DECOUPLED')
							.example('REDIRECT'),
					})
						.description('data forwarded by the ASPSP top the PISP after creation of the Payment Request resource creation'),
				},
				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
		hal: hal.postPaymentRequests,
	},
	validate: {
		headers: commonHeaders,
		payload: Joi.object().keys({
			paymentInformationId: Joi.string()
				.regex(/^([a-zA-Z0-9 /\-?:\\()\\.,'']{1,35})$/)
				.required()
				.example('MyPmtInfId')
				.description('ISO20022 : Reference assigned by a sending party to unambiguously identify the payment information block within the message.'),
			creationDateTime: Joi.string()
				.required()
				.example('2018-03-31T13:25:22.527+02:00')
				.description('ISO20022: Date and time at which a (group of) payment instruction(s) was created by the instructing party.'),
			numberOfTransactions: Joi.number()
				.min(1)
				.required()
				.example(1)
				.description('ISO20022: Number of individual transactions contained in the message. API: Each ASPSP will specify a maximum value for this field taking into accounts its specificities about payment request handling'),
			initiatingParty: util.party
				.required()
				.description('API : Description of a Party which can be either a person or an organization.'),
			paymentTypeInformation: Joi.object().keys({
				instructionPriority: Joi.string()
					.valid('HIGH', 'SEPA')
					.optional(),
				serviceLevel: Joi.string()
					.valid('NURG', 'SEPA')
					.required(),
				localInstrument: Joi.string()
					.valid('INST')
					.optional().allow(null),
				categoryPurpose: Joi.string()
					.valid('CASH', 'DVPM')
					.optional(),
			})
				.required()
				.description('ISO20022: Set of elements used to further specify the type of transaction.'),
			debtor: util.party
				.description('API : Description of a Party which can be either a person or an organization.'),
			debtorAccount: Joi.object().keys({
				iban: Joi.string()
					.regex(/^[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}$/)
					.optional().allow('', null)
					.example('YY64COJH41059545330222956960771321'),
				other: util.commonEntity,
			})
				.optional()
				.description('Unique and unambiguous identification for the account between the account owner and the account servicer.'),
			debtorAgent: Joi.object().keys({
				bicFi: Joi.string()
					.regex(/^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$/)
					.required()
					.example('AAAAAAZ0')
					.description('ISO20022: Code allocated to a financial institution by the ISO 9362 Registration Authority as described in ISO 9362 "Banking - Banking telecommunication messages - Business identification code (BIC)".'),
				clearingSystemMemberId: Joi.object().keys({
					clearingSystemId: Joi.string()
						.max(35)
						.optional().allow('', null)
						.description('ISO20022: Specification of a pre-agreed offering between clearing agents or the channel through which the payment instruction is processed.'),
					memberId: Joi.string()
						.max(35)
						.optional().allow('', null)
						.description('ISO20022: Identification of a member of a clearing system.'),
				}),
				name: Joi.string()
					.max(140)
					.optional().allow('', null)
					.example('Institution')
					.description('Name of the financial institution'),
				postalAddress: util.postalAddress,
			})
				.optional()
				.description('ISO20022: Unique and unambiguous identification of a financial institution, as assigned under an internationally recognised or proprietary identification scheme.'),
			beneficiary: util.beneficiary,
			ultimateCreditor: util.party
				.optional()
				.description('API : Description of a Party which can be either a person or an organization.'),
			purpose: Joi.string()
				.optional()
				.description(`ISO20022: Underlying reason for the payment transaction, as published in
			    an external purpose code list.

			    API: The following values are allowed for Payment  Request
			      - ACCT (Funds moved between 2 accounts of same account holder at the same bank) 
			      - CASH (general cash management instruction) may be used for Transfer Initiation
			      - COMC Transaction is related to a payment of commercial credit or debit.
			      - CPKC General Carpark Charges Transaction is related to carpark charges.
			      - TRPT Transport RoadPricing Transaction is for the payment to top-up pre-paid card and electronic road pricing for the purpose of transportation`)
				.valid('ACCT', 'CASH', 'COMC', 'CPKC', 'TRPT')
				.example('COMC'),
			chargeBearer: Joi.string()
				.optional()
				.description(`ISO20022: Specifies which party/parties will bear the charges associated
			    with the processing of the payment transaction.

			    API: The following values are allowed for Payment  Request
			      - SLEV:  Charges are to be applied following the rules agreed in the service level and/or scheme.`)
				.valid('SLEV')
				.example('SLEV'),
			paymentInformationStatus: Joi.string()
				.optional()
				.description('ISO20022: Specifies the status of the payment information. API: Mandatory. The following values are allowed to provide the status of the Payment Request')
				.valid('ACCP', 'ACSC', 'ACSP', 'ACTC', 'ACWC', 'ACWP', 'PART', 'RCVD', 'PDNG', 'RJCT')
				.example('ACCP'),
			statusReasonInformation: util.statusReasonInformation,
			requestedExecutionDate: Joi.string()
				.optional()
				.description('ISO20022: Date at which the initiating party requests the clearing agent to process the payment.')
				.example('2018-03-31T13:25:22.527+02:00'),
			creditTransferTransaction: Joi.array().items({
				paymentId: Joi.object().keys({
					instructionId: Joi.string()
						// eslint-disable-next-line no-useless-escape
						.regex(/^([a-zA-Z0-9 /\-?:\()\.,']{1,35})$/)
						.description('ISO20022: Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.')
						.example('instruction-id')
						.required(),
					endToEndId: Joi.string()
						// eslint-disable-next-line no-useless-escape
						.regex(/^([a-zA-Z0-9 /\-?:\()\.,']{1,35})$/)
						.description('ISO20022: Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.')
						.example('end-to-end-id')
						.required(),
				})
					.required()
					.description('ISO20022: Set of elements used to reference a payment instruction.'),
				requestedExecutionDate: Joi.string()
					.optional()
					.description('ISO20022: Date at which the initiating party requests the clearing agent to process the payment.')
					.example('2018-03-31T13:25:22.527+02:00'),
				endDate: Joi.string()
					.optional()
					.description('The last applicable day of execution for a given standing order. If not given, the standing order is considered as endless.')
					.example('2018-03-31T13:25:22.527+02:00'),
				executionRule: Joi.string()
					.optional()
					.description('Execution date shifting rule for standing orders This data attribute defines the behaviour when recurring payment dates falls on a weekend or bank holiday. The payment is then executed either the "preceding" or "following" working day. ASPSP might reject the request due to the communicated value, if rules in Online-Banking are not supporting this execution rule.')
					.valid('FWNG', 'PREC')
					.example('FWNG'),
				frequency: Joi.string()
					.optional()
					.description('Frequency rule for standing orders. The following codes from the "EventFrequency7Code" of ISO 20022 are supported.')
					.valid('DAIL', 'WEEK', 'TOWK', 'MNTH', 'TOMN', 'QUTR', 'SEMI', 'YEAR')
					.example('DAIL'),
				instructedAmount: Joi.object()
					.required()
					.keys({
						currency: Joi.string()
							.regex(/^[A-Z]{3,3}$/)
							.required()
							.description('Specifies the currency of the amount. A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 "Codes for the representation of currencies and funds".')
							.example('EUR'),
						amount: Joi.string()
							// eslint-disable-next-line no-useless-escape
							.regex(/^\-{0,1}[0-9]{1,13}(\.[0-9]{0,5}){0,1}$/)
							.required()
							.description('ISO20022: Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.')
							.example('12.34'),
					}),
				beneficiary: util.beneficiary,
				ultimateCreditor: util.party,
				regulatoryReportingCodes: Joi.array()
					.items(Joi.string().optional().allow('', null))
					.optional(),
				remittanceInformation: Joi.array()
					.items(Joi.string())
					.required()
					.description('ISO20022: Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts\' receivable system. API: Only one occurrence is allowed'),
				transactionStatus: Joi.string()
					.optional()
					.valid('RJCT', 'PDNG', 'ACSP', 'ACSC')
					.example('RJCT')
					.description('ISO20022: Specifies the status of the payment information group.'),
				statusReasonInformation: util.statusReasonInformation,
			})
				.description('ISO20022: Payment processes required to transfer cash from the debtor to the creditor. API: Each ASPSP will specify a maxItems value for this field taking into accounts its specificities about payment request handling')
				.required()
				.min(1),
			supplementaryData: Joi.object().keys({
				acceptedAuthenticationApproach: Joi.array()
					.items(Joi.string()
						.valid('REDIRECT', 'DECOUPLED'))
					.optional(),
				scaHint: Joi.string()
					.optional()
					.valid('noScaExemption', 'scaExemption')
					.example('noScaExemption'),
				successfulReportUrl: Joi.string()
					.optional().allow('', null)
					.example('http://myPisp/PaymentSuccess'),
				unsuccessfulReportUrl: Joi.string()
					.optional().allow('', null)
					.example('http://myPisp/PaymentFailure'),
			})
				.required()
				.description(`ISO20022: Additional information that cannot be captured in the structured elements and/or any other specific block.
						API: This structure is used to embed the relevant URLs for returning the status report to the PISP and to specify which authentication approaches are accepted by the PISP and which has been chosen by the ASPSP`),
		})
			.description(`ISO20022: The PaymentRequestResource message is sent by the Creditor
			sending party to the Debtor receiving party, directly or through agents.
			It is used by a Creditor to request movement of funds from the debtor
			account to a creditor.

			API: 

			Information about the creditor (Id, account and agent) might be placed
			either at payment level or at instruction level. Thus multi-beneficiary
			payments can be handled.

			The requested execution date can be placed either at payment level when
			all instructions are requested to be executed at the same date or at
			instruction level.

			The latest case includes:

			- multiple instructions having different requested execution dates

			- standing orders settings`),
		options: {
			allowUnknown: true,
		},
	},
	payload: {
		allow: ['application/json'],
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'pisp',
	},
	pre: [
		{
			assign: 'accountIdentification',
			method: async (request) => {
				if (!request.query.brand) {
					logger.error('Missing brand information.')
					throw Boom.badRequest('The brand information was not found.')
				}

				const { debtorAccount, requestedExecutionDate, paymentTypeInformation, numberOfTransactions, creditTransferTransaction, beneficiary } = request.payload

				if (paymentTypeInformation && paymentTypeInformation.serviceLevel && paymentTypeInformation.serviceLevel !== 'SEPA') {
					logger.error('Only SEPA Single Payment is supported')
					throw Boom.badRequest('Only SEPA Single Payment is supported')
				}

				if (!requestedExecutionDate) {
					logger.error('requestedExecutionDate is missing')
					throw Boom.badRequest('requestedExecutionDate is missing')
				}

				if (new Date(requestedExecutionDate).getTime() > Date.now()) {
					logger.error('Future payments are not supported')
					throw Boom.badRequest('Future payments are not supported')
				}

				if (numberOfTransactions && creditTransferTransaction && (numberOfTransactions !== 1 || numberOfTransactions !== creditTransferTransaction.length)) {
					logger.error('Only 1 transaction is allowed')
					throw Boom.badRequest('Only 1 transaction is allowed')
				}

				const transactionAmountPositive = creditTransferTransaction.every((ctt) => ctt.instructedAmount.amount > 0)
				if (!transactionAmountPositive) {
					logger.error('Amount cannot be negative')
					throw Boom.badRequest('Amount cannot be negative')
				}

				const regexSEPA = RegExp(/^-{0,1}[0-9]{1,9}(\.[0-9]{0,2}){0,1}$/)
				const firstCtt = creditTransferTransaction[0]
				const firstCttAmount = firstCtt.instructedAmount ? firstCtt.instructedAmount.amount : ''
				if (!regexSEPA.test(firstCttAmount)) {
					logger.error('Amount exceeded SEPA Single Payment')
					throw Boom.badRequest('Amount exceeded SEPA Single Payment')
				}
				
				const isCurrencyAccepted = creditTransferTransaction.every(ctt => util.isCurrencyValid(ctt.instructedAmount.currency))
				if (!isCurrencyAccepted) {
					logger.error('Only EUR/USD currency should be accepted for Single SCT Payment')
					throw Boom.badRequest('Only EUR/USD currency should be accepted for Single SCT Payment')
				}

				// When only 1 transaction is allowed, the beneficiary must be at the payment level in the payload
				if (!beneficiary) {
					logger.error('beneficiary must be at payment level for Single Payment')
					throw Boom.badRequest('beneficiary must be at payment level for Single Payment')
				}

				if (!debtorAccount) return null

				const accountIdentification = await accountPersistence.getAccountIdentificationByIban(debtorAccount.iban)

				if (!accountIdentification) {
					logger.error('Debtor account does not exist')
					throw Boom.badRequest('\'iban\' in \'debtorAccount\' not found.')
				}

				return accountIdentification
			},
		},
	],
	handler: async (request, h) => {
		const { payload } = request

		if (!payload.supplementaryData.unsuccessfulReportUrl)
			payload.supplementaryData.unsuccessfulReportUrl = payload.supplementaryData.successfulReportUrl

		payload.brand = request.query.brand

		const paymentCreated = await paymentRequestService.postPaymentRequest(payload)

		const response = h.response({
			...paymentCreated.data,
			paymentRequestResourceId: paymentCreated.resourceId,
		})
		response.header('location', `/v1/payment-requests/${paymentCreated.resourceId}`)
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('PSU-IP-Address', request.headers['psu-ip-address'])
		response.header('PSU-IP-Port', request.headers['psu-ip-port'])
		response.header('PSU-HTTP-Method', request.headers['psu-http-method'])
		response.header('PSU-Date', request.headers['psu-date'])
		response.header('PSU-GEO-Location', request.headers['psu-geo-location'])
		response.header('PSU-User-Agent', request.headers['psu-user-agent'])
		response.header('PSU-Referer', request.headers['psu-referer'])
		response.header('PSU-Accept', request.headers['psu-accept'])
		response.header('PSU-Accept-Charset', request.headers['psu-accept-charset'])
		response.header('PSU-Accept-Encoding', request.headers['psu-accept-encoding'])
		response.header('PSU-Accept-Language', request.headers['psu-accept-language'])
		response.header('PSU-Device-ID', request.headers['psu-device-id'])
		response.header('Digest', `SHA-256=${crypto.createHash('sha256').update(JSON.stringify(response.source)).digest('base64')}`)
		response.header('Signature', request.headers['signature'])
		response.code(201)

		if(response && response.brand) {
			delete response.brand
		}

		return response
	},
}

/**
 * GET /v1/payment-requests/{paymentRequestResourceId} handler
 */
exports.getPaymentRequestByResourceId = {
	id: 'sandbox-api-get-payment-requests-by-resource-id',
	description: `<h3>Description</h3>

	The following use cases can be applied:

	<ul>
		<li>retrieval of a payment request on behalf of a merchant</li>
		<li>retrieval of a transfer request on behalf of the account's owner</li>
		<li>retrieval of a standing-order request on behalf of the account's owner</li>
	</ul>`,
	notes: ['Retrieval of a payment request (PISP)'],
	tags: ['api', 'PISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
					headers: {
						'X-Request-ID': Joi.string()
							.description('Correlation header to be set in a request and retrieved in the relevant response'),
						'Digest': Joi.string()
							.description('Digest of the body'),
						'Signature': Joi.string()
							.description('http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/) The keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.'),
					},
					schema: Joi.object({
						appliedAuthenticationApproach: Joi.string()
							.valid('REDIRECT', 'DECOUPLED')
							.example('REDIRECT'),
					})
						.description('data forwarded by the ASPSP top the PISP after creation of the Payment Request resource creation'),
				},
				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
	},
	validate: {
		headers: commonHeaders,
		params: {
			paymentRequestResourceId: Joi.string(),
		},
		options: {
			allowUnknown: true,
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'pisp',
	},
	pre: [
		{
			assign: 'payment',
			method: async (request) => {
				const payment = await paymentRequestService.getPaymentRequestByResourceId(request.params.paymentRequestResourceId)

				if (!payment) {
					logger.error('Payment not found')
					throw Boom.forbidden()
				}

				return payment
			},
		},
	],
	handler: async (request, h) => {
		const { payment } = request.pre

		const debtorAccount = await accountPersistence.getAccountIdentificationById(payment.get('debtor_account_id'))
		const creditorAccount = await accountPersistence.getAccountIdentificationById(payment.get('creditor_account_id'))
		const creditTransferTransaction = payment.related('creditTransferTransaction').toJSON({
			hidden: ['id', 'endDate', 'executionRule', 'frequency', 'transactionStatus', 'statusReasonInformation', 'requestedExecutionDate'],
		})

		const brand = `${payment.toJSON().brand}`
		if(payment.attributes && payment.attributes.brand) {
			delete payment.attributes.brand
		}

		const response = h.response({
			paymentRequest: {
				...payment.toJSON({
					hidden: ['debtorAccountId', 'creditorAccountId', 'fundsAvailability'],
				}),
				debtorAccount: debtorAccount ? debtorAccount.toJSON() : undefined,
				beneficiary: {
					...payment.toJSON({ hidden: ['beneficiary.id', 'beneficiary.isTrusted'] }).beneficiary,
					creditorAccount,
				},
				creditTransferTransaction,
				statusReasonInformation: payment.toJSON().statusReasonInformation ? payment.toJSON().statusReasonInformation : undefined,
				booking: Boolean(payment.toJSON().booking),
			},
		})
		response.header('X-Request-ID', request.headers['x-request-id'])
		response.header('PSU-IP-Address', request.headers['psu-ip-address'])
		response.header('PSU-IP-Port', request.headers['psu-ip-port'])
		response.header('PSU-HTTP-Method', request.headers['psu-http-method'])
		response.header('PSU-Date', request.headers['psu-date'])
		response.header('PSU-GEO-Location', request.headers['psu-geo-location'])
		response.header('PSU-User-Agent', request.headers['psu-user-agent'])
		response.header('PSU-Referer', request.headers['psu-referer'])
		response.header('PSU-Accept', request.headers['psu-accept'])
		response.header('PSU-Accept-Charset', request.headers['psu-accept-charset'])
		response.header('PSU-Accept-Encoding', request.headers['psu-accept-encoding'])
		response.header('PSU-Accept-Language', request.headers['psu-accept-language'])
		response.header('PSU-Device-ID', request.headers['psu-device-id'])
		response.header('Digest', `SHA-256=${crypto.createHash('sha256').update(JSON.stringify(response.source)).digest('base64')}`)
		response.header('Signature', request.headers['signature'])
		response.header('X-Brand', brand)
		response.code(200)

		return response
	},
}

/**
 * PUT /v1/payment-requests/{paymentRequestResourceId} handler
 */
exports.updatePaymentRequestByResourceId = {
	id: 'paymentRequestPut',
	description: `<h3>Description</h3>

	The PISP sent a Payment/Transfer Request through a POST command.<br>
		The ASPSP registered the Payment/Transfer Request, updated if necessary the relevant identifiers in order to avoid duplicates and returned the location of the updated Request.<br>
		The PISP got the Payment/Transfer Request that might have been updated with the resource identifiers, the status of the Payment/Transfer Request and the status of the subsequent credit transfer.<br>
		The PISP request for the payment cancellation or for some payment instructions cancellation<br>
		No other modification of the Payment/Transfer Request is allowed.`,
	notes: ['Modification of a Payment/Transfer Request (PISP)'],
	tags: ['api', 'PISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'201': {
					description: 'Created',
					headers: {
						'X-Request-ID': Joi.string()
							.description('Correlation header to be set in a request and retrieved in the relevant response'),
						'Digest': Joi.string()
							.description('Digest of the body'),
						'Signature': Joi.string()
							.description('http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/) The keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.'),
					},
					schema: Joi.object({
						appliedAuthenticationApproach: Joi.object()
							.example({
								'appliedAuthenticationApproach': 'REDIRECT',
							}),
					})
						.description('data forwarded by the ASPSP top the PISP after creation of the Payment Request resource creation'),
				},
				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
		hal: hal.updatePaymentRequestByResourceId,
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'pisp',
	},
	validate: {
		headers: commonHeaders,
		params: {
			paymentRequestResourceId: Joi.string(),
		},
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request) => {
		const { params, payload } = request

		const response = await paymentRequestService.updatePaymentRequestByResourceId(params.paymentRequestResourceId, payload)

		if(response && response.brand) {
			delete response.brand
		}

		return response
	},
}

/**
 * POST /v1/payment-requests/{paymentRequestResourceId}/confirmation handler
 */
exports.confirmPaymentRequest = {
	id: 'paymentRequestConfirmationPost',
	description: `<h3>Description</h3>
	The PISP confirms one of the following requests<br>
	<ul>
		<li>payment request on behalf of a merchant</li>
		<li>transfer request on behalf of the account's owner</li>
		<li>standing-order request on behalf of the account's owner</li>
	</ul>
	The ASPSP answers with a status of the relevant request and the subsequent Credit Transfer.`,
	notes: ['Confirmation of a payment request or a modification request (PISP)'],
	tags: ['api', 'PISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'Created',
					headers: {
						'X-Request-ID': Joi.string()
							.description('Correlation header to be set in a request and retrieved in the relevant response'),
						'Digest': Joi.string()
							.description('Digest of the body'),
						'Signature': Joi.string()
							.description('http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/) The keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.'),
					},
					schema: Joi.object({
						appliedAuthenticationApproach: Joi.string()
							.valid('REDIRECT', 'DECOUPLED')
							.example('REDIRECT'),
					})
						.description('data forwarded by the ASPSP top the PISP after creation of the Payment Request resource creation'),
				},
				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
		hal: {
			links: {
				'self': 'v1/payments/paymentReport/MyPmtInfRscId',
				'confirmation': 'v1/payments/paymentReport/MyPmtInfRscId:confirmation',
			},
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'pisp',
	},
	validate: {
		payload: Joi.object({
			psuAuthenticationFactor: Joi.string()
				.optional()
				.description('authentication factor forwarded by the TPP to the ASPSP in order to fulfil the strong customer authentication process')
				.example('JJKJKJ788GKJKJBK'),
		}),
	},
	handler: async (request) => {
		const { params } = request

		const response = await paymentRequestService.confirmPaymentRequest(params.paymentRequestResourceId)

		if(response && response.brand) {
			delete response.brand
		}

		return response
	},
}

/**
 * POST /payment-requests/{paymentRequestResourceId}/consent handler
 */
exports.consentPaymentRequest = {
	id: 'paymentRequestConsentPost',
	description: 'Updates a payment request and confirms a payment',
	notes: ['Updates the debtor account of a payment request, the balances and status'],
	tags: ['api', 'PISP'],
	plugins: {
		'hapi-swagger': {
			responses: {
				'200': {
					description: 'OK',
				},
				'400': httpErrors['400'],
				'401': httpErrors['401'],
				'403': httpErrors['403'],
				'405': httpErrors['405'],
				'406': httpErrors['406'],
				'408': httpErrors['408'],
				'429': httpErrors['429'],
				'500': httpErrors['500'],
				'503': httpErrors['503'],
			},
		},
	},
	auth: {
		strategy: 'bearerToken',
		scope: 'pisp',
	},
	validate: {
		params: {
			paymentRequestResourceId: Joi.string(),
		},
		payload: Joi.object().keys({
			debtorAccount: Joi.object().keys({
				iban: Joi.string()
					.example('YY64COJH41059545330222956960771321'),
			})
				.description('Unique and unambiguous identification for the account between the account owner and the account servicer.'),
		}),
		options: {
			allowUnknown: true,
		},
	},
	handler: async (request) => {
		try {
			const { params, payload } = request
			await paymentRequestService.updatePaymentRequestByResourceId(params.paymentRequestResourceId, payload)

			const response = await paymentRequestService.confirmPaymentRequest(params.paymentRequestResourceId)

			if(response && response.brand) {
				delete response.brand
			}

			return response
		} catch (error) {
			logger.error(error, 'paymentRequestConsentPost')
			throw error
		}
	},
}

