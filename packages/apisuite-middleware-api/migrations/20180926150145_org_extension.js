exports.up = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `organization` ADD `description` VARCHAR(255)  NULL  DEFAULT NULL AFTER `website`;'),
		knex.raw('ALTER TABLE `organization` ADD `logo_url` VARCHAR(255)  NULL  DEFAULT NULL AFTER `description`;'),
		knex.raw('ALTER TABLE `organization` ADD `policy_url` VARCHAR(255)  NULL  DEFAULT NULL AFTER `logo_url`;'),
	])
}

exports.down = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `organization` DROP `description`;'),
		knex.raw('ALTER TABLE `organization` DROP `logo_url`;'),
		knex.raw('ALTER TABLE `organization` DROP `policy_url`;'),
	])
}
