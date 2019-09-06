const Bookshelf = require('../../utils/bookshelf')
const Boom = require('boom')
const log = require('../../utils/logger')

const PaymentRequestResource = require('../../models/PaymentRequestResource')
const PartyIdentification = require('../../models/PartyIdentification')
const GenericIdentification = require('../../models/GenericIdentification')
const PostalAddress = require('../../models/PostalAddress')
const AddressLine = require('../../models/AddressLine')
const PaymentTypeInformation = require('../../models/PaymentTypeInformation')
const SupplementaryData = require('../../models/SupplementaryData')
const AcceptedAuthenticationApproach = require('../../models/AcceptedAuthenticationApproach')
const Beneficiary = require('../../models/Beneficiary')
const AccountIdentification = require('../../models/AccountIdentification')
const CreditTransferTransaction = require('../../models/CreditTransferTransaction')
const PaymentIdentification = require('../../models/PaymentIdentification')
const AmountType = require('../../models/AmountType')
const RemittanceInformation = require('../../models/RemittanceInformation')

exports = module.exports = {}

/**
 * 
 * @param {*} trx -
 * @param {*} paymentInformationId -
 * @param {*} numberOfTransactions -
 * @param {*} purpose -
 * @param {*} chargeBearer -
 * @param {*} paymentInformationStatus -
 * @param {*} creationDateTime -
 * @param {*} requestedExecutionDate -
 * @param {*} debtorAccountId -
 * @param {*} creditorAccountId -
 * @param {String} brand -
 * @returns {Object} - 
 */
const createPaymentRequestResource = async (trx, paymentInformationId, numberOfTransactions, purpose, chargeBearer, paymentInformationStatus, creationDateTime, requestedExecutionDate, debtorAccountId, creditorAccountId, brand) => {
	const paymentRequest = {
		payment_information_id: paymentInformationId,
		number_of_transactions: numberOfTransactions,
		purpose,
		charge_bearer: chargeBearer,
		payment_information_status: paymentInformationStatus,
		booking: true,
		created_at: creationDateTime,
		requested_execution_date: requestedExecutionDate || creationDateTime,
		debtor_account_id: debtorAccountId,
		creditor_account_id: creditorAccountId,
		brand,
	}
	return await PaymentRequestResource.create(paymentRequest, { transacting: trx })
}

/**
 * 
 * @param {*} trx -
 * @param {*} paymentId -
 * @param {*} instructionPriority - 
 * @param {*} serviceLevel -
 * @param {*} localInstrument -
 * @param {*} categoryPurpose -
 * @returns { Object } -
 */
const createPaymentTypeInformation = async (trx, paymentId, instructionPriority, serviceLevel, localInstrument, categoryPurpose) => {
	const paymentTypeInformation = {
		instruction_priority: instructionPriority,
		service_level: serviceLevel,
		local_instrument: localInstrument,
		category_purpose: categoryPurpose,
		payment_request_resource_id: paymentId,
	}
	return await PaymentTypeInformation.create(paymentTypeInformation, { transacting: trx })
}

/**
 * 
 * @param {*} trx -
 * @param {*} relationId -
 * @param {*} pi -
 * @param {*} party -
 * @returns { Object } -
 */
const createPartyIdentification = async (trx, relationId, pi, party) => {
	if (!pi) return

	// Reject when the party idenfication has both organisationId and privateId
	if (pi.organisationId && pi.privateId) {
		log.error(`Only 1 GenericIdentification is allowed for '${party}'`)
		throw Boom.badRequest(`Only 1 GenericIdentification is allowed for '${party}'`)
	}

	// Save PartyIdentification
	const piResp = await PartyIdentification.create({
		name: pi.name,
		initiating_party_id: party === 'initiatingParty' ? relationId : null,
		debtor_id: party === 'debtor' ? relationId : null,
		ultimate_creditor_id: party === 'ultimateCreditor' ? relationId : null,
		creditor_id: party === 'creditor' ? relationId : null,
	}, { transacting: trx })

	// Save GenericIdentification
	const piId = pi.organisationId || pi.privateId
	if (piId) {
		await GenericIdentification.create({
			organisation_id: pi.organisationId && piResp.get('id'),
			private_id: pi.privateId && piResp.get('id'),
			identification: piId.identification,
			scheme_name: piId.schemeName,
			issuer: piId.issuer,
		}, { transacting: trx })
	}

	if (!pi.postalAddress) return

	const piPostalAddress = pi.postalAddress
	// Save PostalAddress
	const piPostalAddressResp = await PostalAddress.create({
		country: piPostalAddress.country,
		party_identification_id: piResp.get('id'),
	}, { transacting: trx })
	// Save AddressLine(s)
	for (const line of piPostalAddress.addressLine) {
		await AddressLine.create({
			address_line: line,
			postal_address_id: piPostalAddressResp.get('id'),
		}, { transacting: trx })
	}
}

/**
 * 
 * @param {*} trx -
 * @param {*} paymentRequestId -
 * @param {*} scaHint -
 * @param {*} acceptedAuthenticationApproach -
 * @param {*} successfulReportUrl -
 * @param {*} unsuccessfulReportUrl -
 * @returns {Object} -
 */
const createSupplementaryData = async (trx, paymentRequestId, scaHint, acceptedAuthenticationApproach, successfulReportUrl, unsuccessfulReportUrl) => {
	// Save SupplementaryData
	const supplementaryDataResp = await SupplementaryData.create({
		sca_hint: scaHint,
		successful_report_url: successfulReportUrl,
		unsuccessful_report_url: unsuccessfulReportUrl,
		payment_request_resource_id: paymentRequestId,
	}, { transacting: trx })
	// Save AcceptedAuthenticationApproach
	for (const approach of acceptedAuthenticationApproach) {
		await AcceptedAuthenticationApproach.create({
			accepted_authentication_approach: approach,
			supplementary_data_id: supplementaryDataResp.get('id'),
		}, { transacting: trx })
	}
}

/**
 * 
 * @param {*} trx -
 * @param {*} paymentRequestId - 
 * @param {*} creditor -
 * @param {*} creditorAccount -
 * @param {*} isTrusted -
 * @returns {Object} -
 */
const createBeneficiary = async (trx, paymentRequestId, creditor, creditorAccount, isTrusted) => {
	try {
		// Retrieve AccountIdentification
		let accountId
		if (creditorAccount) {
			accountId = await AccountIdentification.findOne({ iban: creditorAccount.iban }, { require: false, transacting: trx })
		}

		// Save Beneficiary
		const beneficiaryResp = await Beneficiary.create({
			is_trusted: isTrusted,
			creditor_account_id: accountId && accountId.get('id'),
			payment_request_resource_id: paymentRequestId,
		}, { transacting: trx })
		// Save PartyIdentification
		await createPartyIdentification(trx, beneficiaryResp.get('id'), creditor, 'creditor')
	} catch (err) {
		log.error('createBeneficiary: invalid iban')
		throw Boom.badRequest()
	}
}

/**
 * 
 * @param {*} trx -
 * @param {*} paymentRequestId -
 * @param {*} creditTransferTransaction -
 * @returns { Object } -
 */
const createCreditTransferTransaction = async (trx, paymentRequestId, creditTransferTransaction) => {
	for (const transaction of creditTransferTransaction) {
		const { paymentId, requestedExecutionDate, instructedAmount, remittanceInformation } = transaction
		const executionRule = 'FWNG'
		const transactionStatus = 'PDNG'

		// Save CreditTransferTransaction
		const cttResp = await CreditTransferTransaction.create({
			requested_execution_date: requestedExecutionDate,
			end_date: requestedExecutionDate,
			execution_rule: executionRule,
			remittance_information: remittanceInformation,
			transaction_status: transactionStatus,
			payment_request_resource_id: paymentRequestId,
		}, { transacting: trx })
		// Save PaymentIdentification
		const { instructionId, endToEndId } = paymentId
		await PaymentIdentification.create({
			instruction_id: instructionId,
			end_to_end_id: endToEndId,
			credit_transfer_transaction_id: cttResp.get('id'),
		}, { transacting: trx })
		// Save AmountType
		const { currency, amount } = instructedAmount
		await AmountType.create({
			currency,
			amount,
			credit_transfer_transaction_id: cttResp.get('id'),
		}, { transacting: trx })
		// Save RemittanceInformation
		for (const line of remittanceInformation) {
			await RemittanceInformation.create({
				remittance_line: line,
				credit_transfer_transaction_id: cttResp.get('id'),
			}, { transacting: trx })
		}
	}
}

exports.postPaymentRequest = async (payload) => {
	return await Bookshelf.transaction(async trx => {
		// Retrieve the debtor account if exists
		const { debtorAccount } = payload
		let debtorAccountId
		if (debtorAccount) {
			const debtorAccountResp = await AccountIdentification.findOne({ iban: debtorAccount.iban }, { transacting: trx })
			debtorAccountId = debtorAccountResp.get('id')
		}
		// Retrieve the creditor account if exists, create otherwise
		let creditorAccountId
		const { creditor, creditorAccount, beneficiary } = payload
		const creditorToSave = (beneficiary && beneficiary.creditor) || creditor
		const creditorAccountToSave = (beneficiary && beneficiary.creditorAccount) || creditorAccount
		if (creditorAccountToSave) {
			let creditorAccountResp = await AccountIdentification.findOne({ iban: creditorAccountToSave.iban }, { require: false, transacting: trx })
			if (!creditorAccountResp) {
				creditorAccountResp = await AccountIdentification.create({ iban: creditorAccountToSave.iban }, { transacting: trx })
			}
			creditorAccountId = creditorAccountResp.get('id')
		}

		// Save initial PaymentRequestResource
		const { paymentInformationId, numberOfTransactions, purpose, chargeBearer, creationDateTime, requestedExecutionDate, brand } = payload
		let paymentInformationStatus = PaymentRequestResource.status().ACTC // AcceptedTechnicalValidation: initial status to set on requesting a payment

		const paymentRequestResp = await createPaymentRequestResource(trx, paymentInformationId, numberOfTransactions, purpose, chargeBearer, paymentInformationStatus, creationDateTime, requestedExecutionDate, debtorAccountId, creditorAccountId, brand)

		// Save the Beneficiary
		const isTrusted = false
		await createBeneficiary(trx, paymentRequestResp.get('id'), creditorToSave, creditorAccountToSave, isTrusted)

		// Save PaymentTypeInformation
		const { instructionPriority, serviceLevel, localInstrument, categoryPurpose } = payload.paymentTypeInformation
		await createPaymentTypeInformation(trx, paymentRequestResp.get('id'), instructionPriority, serviceLevel, localInstrument, categoryPurpose)

		// Save the different PartyIdentification
		const { initiatingParty, debtor, ultimateCreditor } = payload
		await createPartyIdentification(trx, paymentRequestResp.get('id'), initiatingParty, 'initiatingParty')
		await createPartyIdentification(trx, paymentRequestResp.get('id'), debtor, 'debtor')
		await createPartyIdentification(trx, paymentRequestResp.get('id'), ultimateCreditor, 'ultimateCreditor')

		// Save the CreditTransferTransaction
		const { creditTransferTransaction } = payload
		await createCreditTransferTransaction(trx, paymentRequestResp.get('id'), creditTransferTransaction)

		// Save the SupplementaryData
		const { acceptedAuthenticationApproach, scaHint, successfulReportUrl, unsuccessfulReportUrl } = payload.supplementaryData
		await createSupplementaryData(trx, paymentRequestResp.get('id'), scaHint, acceptedAuthenticationApproach, successfulReportUrl, unsuccessfulReportUrl)

		// Returns the first given Authentication Approach. TODO: update to the right logic
		return {
			resourceId: paymentRequestResp.get('id'),
			data: {
				appliedAuthenticationApproach: AcceptedAuthenticationApproach.approaches().REDIRECT,
			},
		}
	})
}

exports.getPaymentRequestByResourceId = async (paymentRequestResourceId) => {
	return await PaymentRequestResource.findOne(
		{ id: paymentRequestResourceId },
		{
			require: false,
			withRelated: [
				'initiatingParty', 'initiatingParty.postalAddress.addressLine', 'initiatingParty.organisationId', 'initiatingParty.privateId',
				'debtor', 'debtor.postalAddress.addressLine', 'debtor.organisationId', 'debtor.privateId',
				'ultimateCreditor', 'ultimateCreditor.postalAddress.addressLine', 'ultimateCreditor.organisationId', 'ultimateCreditor.privateId',
				'paymentTypeInformation',
				'prrBeneficiary.creditor', 'prrBeneficiary.creditor.postalAddress.addressLine', 'prrBeneficiary.creditor.organisationId', 'prrBeneficiary.creditor.privateId',
				'creditTransferTransaction', 'creditTransferTransaction.paymentId', 'creditTransferTransaction.instructedAmount', 'creditTransferTransaction.cttRemittanceInformation',
				'supplementaryData.acceptedAuthenticationApproach',
			],
		})
}

exports.getSupplementaryDataByResourceId = async (paymentRequestResourceId) => {
	// Retrieve the SupplementaryData
	const sd = await SupplementaryData
		.findOne({ payment_request_resource_id: paymentRequestResourceId })
	const acceptedAuthenticationApproach = await AcceptedAuthenticationApproach
		.findAll({ supplementary_data_id: sd.get('id') })
	return {
		...sd.toJSON(),
		acceptedAuthenticationApproach: acceptedAuthenticationApproach.toJSON(),
	}
}

exports.updatePaymentRequestResourceById = async (paymentRequestResourceId, paymentRequest) => {
	return await PaymentRequestResource.update(paymentRequest, { id: paymentRequestResourceId })
}

exports.getPRCreditTransferTransations = async (paymentRequestResourceId) => {
	return await CreditTransferTransaction.findAll({ payment_request_resource_id: paymentRequestResourceId }, { withRelated: ['instructedAmount', 'cttRemittanceInformation'] })
}

exports.updateCreditTransferTransactionById = async (prId, id, creditTransferTransaction) => {
	try {
		return await CreditTransferTransaction.update(creditTransferTransaction, { id, payment_request_resource_id: prId })
	} catch (err) {
		throw Boom.forbidden()
	}
}

exports.getPaymentRequests = async (query) => {
	return await PaymentRequestResource
		.query(query)
		.fetchAll(
			{
				require: false,
				withRelated: [
					'initiatingParty', 'initiatingParty.postalAddress.addressLine', 'initiatingParty.organisationId', 'initiatingParty.privateId',
					'debtor', 'debtor.postalAddress.addressLine', 'debtor.organisationId', 'debtor.privateId',
					'ultimateCreditor', 'ultimateCreditor.postalAddress.addressLine', 'ultimateCreditor.organisationId', 'ultimateCreditor.privateId',
					'paymentTypeInformation',
					'prrBeneficiary.creditor', 'prrBeneficiary.creditor.postalAddress.addressLine', 'prrBeneficiary.creditor.organisationId', 'prrBeneficiary.creditor.privateId',
					'creditTransferTransaction', 'creditTransferTransaction.paymentId', 'creditTransferTransaction.instructedAmount', 'creditTransferTransaction.cttRemittanceInformation',
					'supplementaryData.acceptedAuthenticationApproach',
				],
			})
}
