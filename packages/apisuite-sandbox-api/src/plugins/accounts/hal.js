exports = module.exports = {}

exports.getAccounts = {
	prepare: (rep, next) => {
		const { page } = rep.request.query
		// const { page, pageSize } = rep.request.query
		// const { totalAccounts } = rep.entity.pagination

		// const pageCount = parseInt(((totalAccounts - 1) / pageSize) + 1)

		// rep.link('first', '/v1/accounts')
		// rep.link('last', `/v1/accounts?page=${pageCount}`)

		// if (page < pageCount) {
		// 	rep.link('next', `/v1/accounts?page=${page + 1}`)
		// }
		// if (page > 1) {
		// 	rep.link('prev', `/v1/accounts?page=${page - 1}`)
		// }
		rep._links.self.href = `/v1/accounts?index=${page}`

		rep.ignore(['pagination'])

		next()
	},
}


exports.getAccountBalances = {
	prepare: (rep, next) => {
		rep.link('parent-list', '/v1/accounts')
		rep.link('transactions', `/v1/accounts/${rep.request.params.accountResourceId}/transactions`)

		next()
	},
}


exports.getAccountTransactions = {
	prepare: (rep, next) => {
		const { page, pageCount } = rep.entity.pagination
		const { accountResourceId } = rep.request.params

		rep.link('parent-list', '/v1/accounts')
		rep.link('balances', `/v1/accounts/${accountResourceId}/balances`)

		if (page < pageCount) {
			rep.link('next', `/v1/accounts/${accountResourceId}/transactions?page=${page + 1}`)
		}
		if (page > 1) {
			rep.link('prev', `/v1/accounts/${accountResourceId}/transactions?page=${page - 1}`)
		}
		rep.ignore(['pagination'])

		next()
	},
}
