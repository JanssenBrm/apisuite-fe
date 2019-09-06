exports.up = function (knex) {
	return knex('operation').insert([
		{ id: 1, operation: 'Balances' },
		{ id: 2, operation: 'Transactions' },
		{ id: 3, operation: 'AmountCoverage' },
		{ id: 4, operation: 'TransferInitiation' },
	])
}

exports.down = function (knex) {
	return knex('operation')
		.whereBetween('id', [1, 4])
		.del()
}
