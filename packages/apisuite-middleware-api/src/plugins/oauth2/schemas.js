const Joi = require('joi')

const schemas = {}

schemas.tokenRequestSchemas = [

	// Resource Owner Password Credentials Grant Request Schema
	{
		grant_type: Joi.string().valid('password').required(),
		username: Joi.string().required(),
		password: Joi.string().required(),
	},
]


module.exports = schemas
