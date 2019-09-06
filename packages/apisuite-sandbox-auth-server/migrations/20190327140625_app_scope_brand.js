
exports.up = function (knex) {
	return knex.schema.alterTable('app_scope', (table) => {
		table.string('brand').notNullable().default('bnppf')
	})
}

exports.down = function (knex) {
	return knex.schema.alterTable('app_scope', (table) => {
		table.dropColumn('brand')
	})
}
