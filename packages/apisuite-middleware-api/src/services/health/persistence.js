const knex = require('../../utils/knex')

exports = module.exports = {}

/**
 * Insert a user into the database
 * @async
 * @param		{string}	email				- email and login username, unique
 * @param		{string}	first_name	- user's first name
 * @param		{string}	last_name		- user's last name
 * @param		{string}	password		- user's password
 * @throws	{error}								- an error if password hash fails or if database query fails
 * @returns	{number[]}						- returns an array containg the id of the created user
 */
exports.test = async () => {
	return await knex('oauth_client').select('id').limit(1)
}
