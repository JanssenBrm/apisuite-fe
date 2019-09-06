
exports.up = (knex) => {
	return knex.schema
		.createTable('brand', (table) => {
			table.increments('id').primary()
			table.string('name')
			table.string('logo')
		})
		.alterTable('product', (table) => {
			table.integer('brand_id').unsigned().references('brand.id')
		})
		.then(() => {
			return knex('product')
				.update({ version: 'Sandbox v1.4.0.47' })
				.then(() => {

					// Create brands
					return Promise.all([
						knex('brand')
							.insert({
								name: 'BNP Paribas Fortis',
								logo: 'logo.svg',
							}),
						knex('brand')
							.insert({
								name: 'Hello Bank!',
								logo: 'hellobank_logo.svg',
							}),
						knex('brand')
							.insert({
								name: 'Fintro' ,
								logo: 'fintro_logo.svg',
							}),
					])
						.then((brands) => {
							return Promise.all([
								knex('product')
									.where({ longname: 'Payment Initiation – BNP Paribas Fortis Accounts' })
									.update({ brand_id: brands[0] }),

								knex('product')
									.where({ longname: 'Account Information – BNP Paribas Fortis Accounts' })
									.update({ brand_id: brands[0] }),

								knex('product')
									.where({ longname: 'Payment Initiation – Hello Bank! Accounts' })
									.update({ brand_id: brands[1] }),

								knex('product')
									.where({ longname: 'Account Information – Hello Bank! Accounts' })
									.update({ brand_id: brands[1] }),

								knex('product')
									.where({ longname: 'Payment Initiation – Fintro Accounts' })
									.update({ brand_id: brands[2] }),

								knex('product')
									.where({ longname: 'Account Information – Fintro Accounts' })
									.update({ brand_id: brands[2] }),

							])
						})
				})
		})
}

exports.down = (knex) => {
	return knex.schema.alterTable('product', (table) => {
		table.dropForeign('brand_id')
		table.dropColumn('brand_id')
	}).then(() => {
		return knex.schema.dropTableIfExists('brand')
	}).then(() => {
		return knex('product')
			.update({ version: '' })
	})
}
