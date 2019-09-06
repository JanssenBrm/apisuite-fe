const PSU = require('../../models/PSU')

exports = module.exports = {}

exports.getPsuByUsername = async (username) => {
	const psus = await new PSU({ username: username }).fetch()
	return psus.toJSON()
}

exports.getPSUs = async (options) => {
	return await PSU.fetchPage({
		page: options.page,
		pageSize: options.pageSize,
		withRelated: ['postalAddress', 'postalAddress.addressLine', 'accounts.accountId'],
	})
}


exports.getPSUAccounts = async (psuId) => {
	const psu = await new PSU({ id: psuId }).fetch({ withRelated: ['accounts', 'accounts.accountId', 'accounts.balances', 'accounts.balances.balanceAmount'] })
	return psu.related('accounts').toJSON()
}

exports.getPSU = async (psuId) => {
	return await new PSU({ id: psuId }).fetch({
		withRelated: [
			'postalAddress', 'postalAddress.addressLine', 'accounts.accountId',
			'accounts', 'accounts.accountId',
			'accounts.balances', 'accounts.balances.balanceAmount',
		],
	})
}

exports.updatePSU = (psuId, psuData) => {
	return PSU.update({
		name: psuData.name,
		password: psuData.password,
		email: psuData.email,
		avatar_url: psuData.avatarUrl,
	}, { id: psuId })
}
