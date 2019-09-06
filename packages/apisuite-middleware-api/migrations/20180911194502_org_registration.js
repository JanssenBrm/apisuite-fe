
exports.up = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `user_registration_ticket` ADD `organization_name` VARCHAR(255)  NULL  DEFAULT NULL AFTER `github_id`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` ADD `organization_vat` VARCHAR(255)  NULL  DEFAULT NULL AFTER `organization_name`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` ADD `organization_website` VARCHAR(255)  NULL  DEFAULT NULL AFTER `organization_vat`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` ADD `organization_role` VARCHAR(255)  NULL  DEFAULT NULL AFTER `organization_website`;'),
	])
}

exports.down = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `user_registration_ticket` DROP `organization_name`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` DROP `organization_vat`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` DROP `organization_website`;'),
		knex.raw('ALTER TABLE `user_registration_ticket` DROP `organization_role`;'),
	])
}
