const uuid = require('uuid/v4')

exports.up = function (knex) {
	return Promise.all([
		knex('psu').insert([
			{ id: 1, username: '6307622034', name: 'Isaac Newton', password: uuid(), email: 'isaac.newton@test.be', language: 'FR' },
			{ id: 2, username: '1234567890', name: 'Albert Einstein', password: uuid(), email: 'albert.einstein@test.be', language: 'FR' },
			{ id: 3, username: '1111111111', name: 'Marie Curie', password: uuid(), email: 'marie.curie@test.be', language: 'NL' },
			{ id: 4, username: '2222222222', name: 'Thomas Edison', password: uuid(), email: 'thomas.edison@test.be', language: 'NL' },
			{ id: 5, username: '2758907008', name: 'Gustv Hertz', password: uuid(), email: 'gustv.hertz@test.be', language: 'EN' },
			{ id: 6, username: '8754027386', name: 'Niels Bohr', password: uuid(), email: 'niels.bohr@test.be', language: 'FR' },
			{ id: 7, username: '9281508273', name: 'James Franck', password: uuid(), email: 'james.franck@test.be', language: 'FR' },
			{ id: 8, username: '5749358332', name: 'Ernest Lawrence', password: uuid(), email: 'ernest.lawrence@test.be', language: 'NL' },
			{ id: 9, username: '5463678767', name: 'Wolfgang Pauli', password: uuid(), email: 'wolfgang.pauli@test.be', language: 'FR' },
			{ id: 10, username: '7214221252', name: 'Felix Bloch', password: uuid(), email: 'felix.bloch@test.be', language: 'EN' },
			{ id: 11, username: '5169888810', name: 'Max Born', password: uuid(), email: 'max.born@test.be', language: 'FR' },
		]).then(() =>
			knex('postal_address').insert([
				{ id: 1, country: 'BE', psu_id: 1 },
				{ id: 2, country: 'BE', psu_id: 2 },
				{ id: 3, country: 'BE', psu_id: 3 },
				{ id: 4, country: 'BE', psu_id: 4 },
				{ id: 5, country: 'BE', psu_id: 5 },
				{ id: 6, country: 'BE', psu_id: 6 },
				{ id: 7, country: 'BE', psu_id: 7 },
				{ id: 8, country: 'BE', psu_id: 8 },
				{ id: 9, country: 'BE', psu_id: 9 },
				{ id: 10, country: 'BE', psu_id: 10 },
				{ id: 11, country: 'BE', psu_id: 11 },
			]).then(() => knex('address_line').insert([
				{ id: 1, address_line: '1 rue de la DSP2', postal_address_id: 1 },
				{ id: 2, address_line: '1000 Bruxelles', postal_address_id: 1 },

				{ id: 3, address_line: '2 rue de la DSP2', postal_address_id: 2 },
				{ id: 4, address_line: '1000 Bruxelles', postal_address_id: 2 },

				{ id: 5, address_line: '3 rue de la DSP2', postal_address_id: 3 },
				{ id: 6, address_line: '1000 Bruxelles', postal_address_id: 3 },

				{ id: 7, address_line: '4 rue de la DSP2', postal_address_id: 4 },
				{ id: 8, address_line: '1000 Bruxelles', postal_address_id: 4 },

				{ id: 9, address_line: '5 rue de la DSP2', postal_address_id: 5 },
				{ id: 10, address_line: '1000 Bruxelles', postal_address_id: 5 },

				{ id: 11, address_line: '6 rue de la DSP2', postal_address_id: 6 },
				{ id: 12, address_line: '1000 Bruxelles', postal_address_id: 6 },

				{ id: 13, address_line: '7 rue de la DSP2', postal_address_id: 7 },
				{ id: 14, address_line: '1000 Bruxelles', postal_address_id: 7 },

				{ id: 15, address_line: '8 rue de la DSP2', postal_address_id: 8 },
				{ id: 16, address_line: '1000 Bruxelles', postal_address_id: 8 },

				{ id: 17, address_line: '9 rue de la DSP2', postal_address_id: 9 },
				{ id: 18, address_line: '1000 Bruxelles', postal_address_id: 9 },

				{ id: 19, address_line: '10 rue de la DSP2', postal_address_id: 10 },
				{ id: 20, address_line: '1000 Bruxelles', postal_address_id: 10 },

				{ id: 21, address_line: '11 rue de la DSP2', postal_address_id: 11 },
				{ id: 22, address_line: '1000 Bruxelles', postal_address_id: 11 },
			]))
		),
	])
}

exports.down = function (knex) {
	return Promise.all([
		knex('psu')
			.whereBetween('id', [1, 11])
			.del(),
		knex('postal_address')
			.whereBetween('id', [1, 11])
			.del(),
		knex('address_line')
			.whereBetween('id', [1, 22])
			.del(),
	])
}
