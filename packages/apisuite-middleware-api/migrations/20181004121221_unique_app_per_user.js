exports.up = (knex) => {
	return Promise.all([
		knex.raw('ALTER TABLE `app` DROP INDEX `app_name_unique`;'),
		knex.raw('ALTER TABLE `app` ADD UNIQUE `app_user_unique`(`name`, `user_id`);'),
		knex.raw('ALTER TABLE `app` DROP `access_token`;'),
	])
}

exports.down = () => { return new Promise((resolve) => resolve()) }
