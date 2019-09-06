
exports.up = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `user` CHANGE `first_name` `full_name` VARCHAR(255) NOT NULL;'),
		knex.raw('ALTER TABLE `user` DROP `last_name`;'),
	])
}

exports.down = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `user` CHANGE `full_name` `first_name` VARCHAR(255) NOT NULL;'),
		knex.raw('ALTER TABLE `user` ADD `last_name` VARCHAR(255) NOT NULL AFTER `first_name`;'),
	])
}
