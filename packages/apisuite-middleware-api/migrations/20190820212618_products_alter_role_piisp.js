
exports.up = function (knex) {
	return knex.schema.raw('ALTER TABLE `product` CHANGE COLUMN `role` `role` VARCHAR(255) NULL DEFAULT NULL')
		.then(() => {
			return knex.schema.raw('ALTER TABLE `api_docs` CHANGE COLUMN `role` `role` VARCHAR(255) NULL DEFAULT NULL')
		})
}

exports.down = function () {
	// do nothing
}
