exports.up = (knex) => {
	return knex.schema.raw('ALTER TABLE `organization` CHANGE `name` `name` VARCHAR(255) NULL DEFAULT NULL')
}

exports.down = (knex) => {
	return Promise.all([
		knex.schema.raw('UPDATE `organization` SET `name` = \'\' WHERE `organization`.`name` IS NULL'),
		knex.schema.raw('ALTER TABLE `organization` CHANGE `name` `name` VARCHAR(255) NOT NULL  DEFAULT \'\''),
	])
}
