const crypto = require('crypto')
const uuid = require('uuid')

exports = module.exports = {}

/**
 * Generates a client id
 *
 * @throws	{Error}						- Error if fails ot generate randomBytes
 * @returns	{String}					- Returns the generated client id
 */
exports.generateClientId = () => {
	return uuid.v4()
}

/**
 * Generates a client secret
 *
 * @throws	{Error}						- Error if fails ot generate randomBytes
 * @returns	{String}					- Returns the generated client secret
 */
exports.generateClientSecret = () => {
	return crypto
		.randomBytes(48)
		.toString('hex')
}
