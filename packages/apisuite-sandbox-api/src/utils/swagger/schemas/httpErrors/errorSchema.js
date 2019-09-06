const Joi = require('joi')

module.exports = Joi.object({
	timestamp: Joi.string()
		.description('Current timestamp')
		.example('2018-03-30T16:06:27.499+0000'),
	status: Joi.number().integer()
		.min(400)
		.max(599)
		.required()
		.description('HTTP error code')
		.example(400),
	error: Joi.string()
		.max(140)
		.description('HTTP error text')
		.example('Bad Request'),
	message: Joi.string()
		.max(140)
		.required()
		.description('HTTP textual reason phrase')
		.example('Missing request header \'Digest\' for method parameter of type String'),
	path: Joi.string()
		.max(140)
		.description('Relevant path that was used')
		.example('/v1/accounts'),
})
