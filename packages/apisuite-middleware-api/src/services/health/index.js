const persistence = require('./persistence')

exports = module.exports = {}

/**
 * Module responsbile for test database connection
 * @module services/health
 */

/**
 * Test database connection
 * @async
 * @returns	{Void}	-
 */
exports.test = async () => {
	await persistence.test()
}
