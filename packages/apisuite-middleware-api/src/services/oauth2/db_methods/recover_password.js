const knex = require('../../../utils/knex')

exports = module.exports = {}

/**
 * Saves recover password token
 * @param		{Number} user_id	-
 * @param		{String} token		-
 * @returns	{Void}						-
 */
exports.save = async (user_id, token) => {

	const now = new Date

	return await knex('password_recovery').insert({
		token: token,
		user_id: user_id,
		created_at: now,
		updated_at: now,
	})

}

/**
 * get recovery info using the recovery token
 * @param		{String} token	-
 * @returns	{Object[]}			-
 */
exports.getByToken = async (token) => {

	return await knex('password_recovery').select().where({ token: token })

}

/**
 * delete recovery info using the recovery token
 * @param		{String} token	-
 * @returns	{Void}					-
 */
exports.deleteByToken = async (token) => {

	return await knex('password_recovery').where({ token: token }).del()

}

