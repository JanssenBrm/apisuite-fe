exports.up = function (knex) {
	return knex('psus_accounts').insert([
		{ psu_id: 1, account_resource_id: 1 },
		{ psu_id: 1, account_resource_id: 2 },
		{ psu_id: 2, account_resource_id: 3 },
		{ psu_id: 3, account_resource_id: 4 },
		{ psu_id: 3, account_resource_id: 5 },
		{ psu_id: 3, account_resource_id: 6 },
		{ psu_id: 4, account_resource_id: 7 },
		{ psu_id: 5, account_resource_id: 8 },
		{ psu_id: 5, account_resource_id: 9 },
		{ psu_id: 6, account_resource_id: 10 },
		{ psu_id: 6, account_resource_id: 11 },
		{ psu_id: 7, account_resource_id: 12 },
		{ psu_id: 8, account_resource_id: 13 },
		{ psu_id: 9, account_resource_id: 14 },
		{ psu_id: 9, account_resource_id: 15 },
		{ psu_id: 10, account_resource_id: 16 },
		{ psu_id: 11, account_resource_id: 17 },
		{ psu_id: 11, account_resource_id: 18 },
		{ psu_id: 11, account_resource_id: 19 },
	])
}

exports.down = function (knex) {
	return knex('psus_accounts')
		.where({ 'psu_id': 1, 'account_resource_id': 1 })
		.orWhere({ 'psu_id': 1, 'account_resource_id': 2 })
		.orWhere({ 'psu_id': 2, 'account_resource_id': 3 })
		.orWhere({ 'psu_id': 3, 'account_resource_id': 4 })
		.orWhere({ 'psu_id': 3, 'account_resource_id': 5 })
		.orWhere({ 'psu_id': 3, 'account_resource_id': 6 })
		.orWhere({ 'psu_id': 4, 'account_resource_id': 7 })
		.orWhere({ 'psu_id': 5, 'account_resource_id': 8 })
		.orWhere({ 'psu_id': 5, 'account_resource_id': 9 })
		.orWhere({ 'psu_id': 6, 'account_resource_id': 10 })
		.orWhere({ 'psu_id': 6, 'account_resource_id': 11 })
		.orWhere({ 'psu_id': 7, 'account_resource_id': 12 })
		.orWhere({ 'psu_id': 8, 'account_resource_id': 13 })
		.orWhere({ 'psu_id': 9, 'account_resource_id': 14 })
		.orWhere({ 'psu_id': 9, 'account_resource_id': 15 })
		.orWhere({ 'psu_id': 10, 'account_resource_id': 16 })
		.orWhere({ 'psu_id': 11, 'account_resource_id': 17 })
		.orWhere({ 'psu_id': 11, 'account_resource_id': 18 })
		.orWhere({ 'psu_id': 11, 'account_resource_id': 19 })
		.del()
}
