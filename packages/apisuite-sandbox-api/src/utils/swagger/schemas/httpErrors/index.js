const httpError = require('./errorSchema')

module.exports = {

	'400': {
		description: 'Invalid status value',
		schema: httpError,
	},
	
	'401': { 
		description: 'Unauthorized, authentication failure.',
		schema: httpError,
	},

	'403': { 
		description: 'Forbidden, authentication successful but access to resource is not allowed.',
		schema: httpError,
	},
	
	'405': { 
		description: 'Method Not Allowed',
		schema: httpError,
	},

	'406': { 
		description: 'Not Acceptable',
		schema: httpError,
	},

	'408': { 
		description: 'Request Timeout',
		schema: httpError,
	},

	'429': { 
		description: 'Too many requests',
		schema: httpError,
	},

	'500': { 
		description: 'Internal server error',
		schema: httpError,
	},

	'503': { 
		description: 'Service unavailable',
		schema: httpError,
	},
}
