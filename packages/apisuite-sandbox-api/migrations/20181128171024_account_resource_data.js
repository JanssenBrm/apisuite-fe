exports.up = function (knex) {
	return knex('account_resource').insert([
		{ id: 1, bic_fi: 'GEBABBEB', name: 'Isaac Newton - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'Co-Account Holder' },
		{ id: 2, bic_fi: 'GEBABBEB', name: 'Isaac Newton - HB', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - HB', currency: 'EUR', psu_status: 'Co-Account Holder' },

		{ id: 3, bic_fi: 'GEBABBEB', name: 'Albert Einstein - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 4, bic_fi: 'GEBABBEB', name: 'Marie Curie - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 5, bic_fi: 'GEBABBEB', name: 'Marie Curie - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 6, bic_fi: 'GEBABBEB', name: 'Marie Curie - HB', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - HB', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 7, bic_fi: 'GEBABBEB', name: 'Thomas Edison - HB', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - HB', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 8, bic_fi: 'GEBABBEB', name: 'Gustv Hertz - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 9, bic_fi: 'GEBABBEB', name: 'Gustv Hertz - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 10, bic_fi: 'GEBABBEB', name: 'Niels Bohr - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 11, bic_fi: 'GEBABBEB', name: 'Niels Bohr - HB', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - HB', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 12, bic_fi: 'GEBABBEB', name: 'James Franck - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 13, bic_fi: 'GEBABBEB', name: 'Ernest Lawrence - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 14, bic_fi: 'GEBABBEB', name: 'Wolfgang Pauli - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 15, bic_fi: 'GEBABBEB', name: 'Wolfgang Pauli - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 16, bic_fi: 'GEBABBEB', name: 'Felix Bloch - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },

		{ id: 17, bic_fi: 'GEBABBEB', name: 'Max Born - BNPPF', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - BNPPF', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 18, bic_fi: 'GEBABBEB', name: 'Max Born - FINTRO', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - FINTRO', currency: 'EUR', psu_status: 'AccountHolder' },
		{ id: 19, bic_fi: 'GEBABBEB', name: 'Max Born - HB', usage: 'PRIV', cash_account_type: 'CACC', product: 'CUR - HB', currency: 'EUR', psu_status: 'AccountHolder' },
	]).then(() =>
		Promise.all([
			knex('account_identification').insert([
				{ id: 1, iban: 'BE42424242424242', account_resource_id: 1 },
				{ id: 2, iban: 'BE42424242424243', account_resource_id: 2 },

				{ id: 3, iban: 'BE12345678901234', account_resource_id: 3 },

				{ id: 4, iban: 'BE11111111111111', account_resource_id: 4 },
				{ id: 5, iban: 'BE11111111111112', account_resource_id: 5 },
				{ id: 6, iban: 'BE11111111111113', account_resource_id: 6 },

				{ id: 7, iban: 'BE22222222222222', account_resource_id: 7 },

				{ id: 8, iban: 'BE97825781680596', account_resource_id: 8 },
				{ id: 9, iban: 'BE97825781680597', account_resource_id: 9 },

				{ id: 10, iban: 'BE04209913971303', account_resource_id: 10 },
				{ id: 11, iban: 'BE04209913971304', account_resource_id: 11 },

				{ id: 12, iban: 'BE72413001145682', account_resource_id: 12 },

				{ id: 13, iban: 'BE39103704972449', account_resource_id: 13 },

				{ id: 14, iban: 'BE66740143979990', account_resource_id: 14 },
				{ id: 15, iban: 'BE66740143979991', account_resource_id: 15 },

				{ id: 16, iban: 'BE79476744738439', account_resource_id: 16 },

				{ id: 17, iban: 'BE42142298183350', account_resource_id: 17 },
				{ id: 18, iban: 'BE42142298183351', account_resource_id: 18 },
				{ id: 19, iban: 'BE42142298183352', account_resource_id: 19 },
			]),
			knex('balance_resource').insert([
				{ id: 1, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 1 },
				{ id: 2, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 1 },
				{ id: 3, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 2 },
				{ id: 4, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 2 },

				{ id: 5, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 3 },
				{ id: 6, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 3 },

				{ id: 7, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 4 },
				{ id: 8, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 4 },
				{ id: 9, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 5 },
				{ id: 10, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 5 },
				{ id: 11, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 6 },
				{ id: 12, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 6 },

				{ id: 13, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 7 },
				{ id: 14, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 7 },

				{ id: 15, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 8 },
				{ id: 16, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 8 },
				{ id: 17, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 9 },
				{ id: 18, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 9 },

				{ id: 19, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 10 },
				{ id: 20, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 10 },
				{ id: 21, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 11 },
				{ id: 22, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 11 },

				{ id: 23, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 12 },
				{ id: 24, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 12 },

				{ id: 25, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 13 },
				{ id: 26, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 13 },

				{ id: 27, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 14 },
				{ id: 28, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 14 },
				{ id: 29, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 15 },
				{ id: 30, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 15 },

				{ id: 31, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 16 },
				{ id: 32, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 16 },

				{ id: 33, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 17 },
				{ id: 34, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 17 },
				{ id: 35, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 18 },
				{ id: 36, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 18 },
				{ id: 37, name: 'Closing balance', balance_type: 'CLBD', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 19 },
				{ id: 38, name: 'Operational Balance', balance_type: 'OTHR', last_change_date_time: '2019-03-26T14:54:37', reference_date: '2019-03-26', last_committed_transaction: '2019032620190326190000', account_resource_id: 19 },
			]).then(() =>
				knex('amount_type').insert([
					{ id: 1, currency: 'EUR', amount: '100.00', balance_resource_id: 1 },
					{ id: 2, currency: 'EUR', amount: '100.00', balance_resource_id: 2 },
					{ id: 3, currency: 'EUR', amount: '100.00', balance_resource_id: 3 },
					{ id: 4, currency: 'EUR', amount: '100.00', balance_resource_id: 4 },
					{ id: 5, currency: 'EUR', amount: '100.00', balance_resource_id: 5 },
					{ id: 6, currency: 'EUR', amount: '100.00', balance_resource_id: 6 },
					{ id: 7, currency: 'EUR', amount: '100.00', balance_resource_id: 7 },
					{ id: 8, currency: 'EUR', amount: '100.00', balance_resource_id: 8 },
					{ id: 9, currency: 'EUR', amount: '100.00', balance_resource_id: 9 },
					{ id: 10, currency: 'EUR', amount: '100.00', balance_resource_id: 10 },
					{ id: 11, currency: 'EUR', amount: '100.00', balance_resource_id: 11 },
					{ id: 12, currency: 'EUR', amount: '100.00', balance_resource_id: 12 },
					{ id: 13, currency: 'EUR', amount: '100.00', balance_resource_id: 13 },
					{ id: 14, currency: 'EUR', amount: '100.00', balance_resource_id: 14 },
					{ id: 15, currency: 'EUR', amount: '100.00', balance_resource_id: 15 },
					{ id: 16, currency: 'EUR', amount: '100.00', balance_resource_id: 16 },
					{ id: 17, currency: 'EUR', amount: '100.00', balance_resource_id: 17 },
					{ id: 18, currency: 'EUR', amount: '100.00', balance_resource_id: 18 },
					{ id: 19, currency: 'EUR', amount: '100.00', balance_resource_id: 19 },
					{ id: 20, currency: 'EUR', amount: '100.00', balance_resource_id: 20 },
					{ id: 21, currency: 'EUR', amount: '100.00', balance_resource_id: 21 },
					{ id: 22, currency: 'EUR', amount: '100.00', balance_resource_id: 22 },
					{ id: 23, currency: 'EUR', amount: '100.00', balance_resource_id: 23 },
					{ id: 24, currency: 'EUR', amount: '100.00', balance_resource_id: 24 },
					{ id: 25, currency: 'EUR', amount: '100.00', balance_resource_id: 25 },
					{ id: 26, currency: 'EUR', amount: '100.00', balance_resource_id: 26 },
					{ id: 27, currency: 'EUR', amount: '100.00', balance_resource_id: 27 },
					{ id: 28, currency: 'EUR', amount: '100.00', balance_resource_id: 28 },
					{ id: 29, currency: 'EUR', amount: '100.00', balance_resource_id: 29 },
					{ id: 30, currency: 'EUR', amount: '100.00', balance_resource_id: 30 },
					{ id: 31, currency: 'EUR', amount: '100.00', balance_resource_id: 31 },
					{ id: 32, currency: 'EUR', amount: '100.00', balance_resource_id: 32 },
					{ id: 33, currency: 'EUR', amount: '100.00', balance_resource_id: 33 },
					{ id: 34, currency: 'EUR', amount: '100.00', balance_resource_id: 34 },
					{ id: 35, currency: 'EUR', amount: '100.00', balance_resource_id: 35 },
					{ id: 36, currency: 'EUR', amount: '100.00', balance_resource_id: 36 },
					{ id: 37, currency: 'EUR', amount: '100.00', balance_resource_id: 37 },
					{ id: 38, currency: 'EUR', amount: '100.00', balance_resource_id: 38 },
				])),
		]))
}

exports.down = function (knex) {
	return Promise.all([
		knex('account_resource')
			.whereBetween('id', [1, 19])
			.del(),
		knex('account_identification')
			.whereBetween('id', [1, 19])
			.del(),
		knex('balance_resource')
			.whereBetween('id', [1, 38])
			.del(),
		knex('amount_type')
			.whereBetween('id', [1, 38])
			.del(),
	])
}
