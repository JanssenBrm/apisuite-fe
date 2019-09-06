exports.up = function (knex) {
	return knex.schema.createTable('testuser_account_type', function (table) {
		table.increments('id').primary()
		table.string('type').notNullable()
		table.string('currency').notNullable()
		table.string('brand').notNullable()
		table.timestamps()
	}).then(function () {
		return knex('testuser_account_type').insert([{
			type: 'BNP Paribas Fortis EUR Account',
			currency: 'EUR',
			brand: 'bnppf',
		},
		{
			type: 'Fintro EUR Account',
			currency: 'EUR',
			brand: 'fintro',
		},
		{
			type: 'Hello Bank! EUR Account',
			currency: 'EUR',
			brand: 'hb',
		},
		{
			type: 'BNP Paribas Fortis USD Account',
			currency: 'USD',
			brand: 'bnppf',
		},
		{
			type: 'Fintro USD Account',
			currency: 'USD',
			brand: 'fintro',
		},
		{
			type: 'Hello Bank! USD Account',
			currency: 'USD',
			brand: 'hb',
		}])
	})
}

exports.down = function (knex) {
	return knex.schema.dropTableIfExists('testuser_account_type')
}
