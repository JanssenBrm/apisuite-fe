
exports.up = function (knex) {
	return knex('product').insert([
		{
			id: 1,
			name: 'BNP Paribas Fortis STET API',
			description: 'The PSD2 compliant STET API’s of BNP Paribas Fortis enable PSD2 Certified Third Parties to seamlessly connect with our AISP and PISP features. \nWe warmly invite the general Fintech public to dive into our STET API’s as well!',
			version: '1.4.0.47',
		},
		{
			id: 2,
			name: 'Hello Bank! STET API',
			description: 'The PSD2 compliant STET API’s of Hello Bank! enable PSD2 Certified Third Parties to seamlessly connect with our AISP and PISP features. \nWe warmly invite the general Fintech public to dive into our STET API’s as well!',
			version: '1.4.0.47',
		},
		{
			id: 3,
			name: 'Fintro STET API',
			description: 'The PSD2 compliant STET API’s of Fintro enable PSD2 Certified Third Parties to seamlessly connect with our AISP and PISP features. \nWe warmly invite the general Fintech public to dive into our STET API’s as well!',
			version: '1.4.0.47',
		},
	])
}

exports.down = function (knex) {
	return Promise.all([
		knex('product').del(),
	])
}
