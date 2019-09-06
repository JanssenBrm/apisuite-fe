
exports.up = (knex) => {
	return knex.schema
		.renameTable('app_container', 'organization_container')
		.alterTable('organization_container', (table) => {
			table.dropForeign('app_id', 'app_container_app_id_foreign')
			table.dropColumn('app_id')
			table.integer('organization_id').unsigned().notNullable().unique()
		})
		.alterTable('app', (table) => {
			table.integer('organization_container_id').unsigned().references('organization_container.id').onDelete('CASCADE')
		})
}

exports.down = (knex) => {
	return knex.schema
		.renameTable('organization_container', 'app_container')
		.alterTable('app_container', (table) => {
			table.dropColumn('organization_id')
			table.integer('app_id').unsigned().notNullable().references('app.id').onDelete('CASCADE')
		})
		.alterTable('app', (table) => {
			table.dropForeign('organization_id', 'app_organization_container_id_foreign')
			table.dropColumn('organization_container_id')
		})
}
