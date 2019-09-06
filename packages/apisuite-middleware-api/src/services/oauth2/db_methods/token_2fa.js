const knex = require('../../../utils/knex')

exports = module.exports = {}

/**
 * Saves 2FA token
 * @param		{Number} user_id	-
 * @param		{String} token		-
 * @returns	{Void}						-
 */
exports.save = async (user_id, token) => {

	const now = new Date

	return await knex('two_fa_token').insert({
		token: token,
		user_id: user_id,
		created_at: now,
		updated_at: now,
	})

}

/**
 *
 * @param		{String} token	-
 * @returns	{Object[]}			-
 */
exports.getByToken = async (token) => {

	return await knex('two_fa_token').select().where({ token: token })

}

/**
 *
 * @param		{String} token	-
 * @returns	{Void}					-
 */
exports.deleteByToken = async (token) => {

	return await knex('two_fa_token').where({ token: token }).del()

}

