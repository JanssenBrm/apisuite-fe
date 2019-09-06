exports.up = (knex) => {
	return knex.raw('ALTER TABLE `user` ADD `bio` TEXT  NULL  DEFAULT NULL AFTER `phone_number`;')
}

exports.down = (knex) => {
	return knex.raw('ALTER TABLE `user` DROP `bio`;')
}
