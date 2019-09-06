exports.up = (knex) => {
	return knex.schema.alterTable('brand', (table) => {
		table.string('shortname').notNullable().default('bnppf')
	}).then(() => {
		Promise.all([
			knex('brand')
				.where({ id: 2 })
				.update({ shortname: 'hb' }),
			knex('brand')
				.where({ id: 3 })
				.update({ shortname: 'fintro' }),
		])
	})
}

exports.down = (knex) => {
	return knex.schema.alterTable('brand', (table) => {
		table.dropColumn('shortname')
	})
}
