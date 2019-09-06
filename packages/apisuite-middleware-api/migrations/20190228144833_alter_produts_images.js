const path = 'themes/bnpp/images/'

exports.up = function(knex) {
	return knex.raw(`UPDATE product SET product.image = REPLACE(image, '${path}', '')`)
}

exports.down = function(knex) {
	return knex.raw(`UPDATE product SET product.image = CONCAT('${path}', image)`)
}
