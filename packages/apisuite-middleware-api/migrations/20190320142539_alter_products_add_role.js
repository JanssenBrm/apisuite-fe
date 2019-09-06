
exports.up = function(knex, Promise) {
	return knex.schema.alterTable('product', (table) => {
		table.enum('role', ['aisp', 'pisp']).after('image')
	}).then(() => {
		return knex.transaction((trx) => {
			return trx.select('id', 'name').from('product').then((products) => {
				return Promise.map(products, (product) => {
					return trx('product')
						.where({ id: product.id })
						.update({ role: product.name && product.name.indexOf('Account') > -1 ? 'aisp' : 'pisp' })
				})
			})
		})
	})
}

exports.down = function(knex) {
	return knex.schema.alterTable('product', (table) => {
		table.dropColumn('role')
	})
}
