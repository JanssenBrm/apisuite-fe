const Joi = require('joi')

module.exports = {
	'authorization': Joi.string()
		.required()
		.description('Access token to be passed as a header'),
	'psu-ip-address': Joi.string()
		.optional()
		.description('IP address used by the PSU\'s terminal when connecting to the TPP'),
	'psu-ip-port': Joi.string()
		.optional()
		.description('IP port used by the PSU\'s terminal when connecting to the TPP'),
	'psu-http-method': Joi.string()
		.optional()
		.description('Http method for the most relevant PSU\'s terminal request to the TTP'),
	'psu-date': Joi.string()
		.optional()
		.description('Timestamp of the most relevant PSU\'s terminal request to the TTP'),
	'psu-geo-location': Joi.string()
		.optional()
		.description('Geographical location of the PSU as provided by the PSU mobile terminal if any to the TPP'),
	'psu-user-agent': Joi.string()
		.optional()
		.description('"User-Agent" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-referer': Joi.string()
		.optional()
		.description('"Referer" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-accept': Joi.string()
		.optional()
		.description('"Accept" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-accept-charset': Joi.string()
		.optional()
		.description('"Accept-Charset" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-accept-encoding': Joi.string()
		.optional()
		.description('"Accept-Encoding" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-accept-language': Joi.string()
		.optional()
		.description('"Accept-Language" header field sent by the PSU terminal when connecting to the TPP'),
	'psu-device-id': Joi.string()
		.optional()
		.description('UUID (Universally Unique Identifier) for a device, which is used by the PSU, if available'),
	'digest': Joi.string()
		.optional()
		.description('Digest of the body'),
	'signature': Joi.string()
		.required()
		.description('http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/)'),
	'x-request-id': Joi.string()
		.required()
		.description('Correlation header to be set in a request and retrieved in the relevant response'),
}
