
const schema = {
	env: {
		doc: 'The API environment.',
		format: ['production', 'staging', 'test', 'development'],
		default: 'development',
		env: 'SANDBOX_API_NODE_ENV',
	},
	server: {
		host: {
			doc: 'The IP address to bind.',
			format: 'ipaddress',
			default: '0.0.0.0',
			env: 'SANDBOX_API_IP_ADDRESS',
		},
		port: {
			doc: 'The port to bind.',
			format: 'port',
			default: 3000,
			env: 'SANDBOX_API_PORT',
		},
		routes: {
			cors: {
				origin: {
					doc: 'Server default CORS origin',
					format: Array,
					env: 'SANDBOX_API_DEFAULT_CORS_ORIGINS',
					default: ['*'],
				},
				additionalHeaders: {
					doc: 'Server default CORS headers',
					format: Array,
					env: 'SANDBOXAPI_DEFAULT_CORS_HEADERS',
					default: [],
				},
			},
		},
	},
	swagger: {
		scheme: {
			doc: 'The transfer protocol of the API',
			format: ['http', 'https'],
			default: 'http',
			env: 'SANDBOX_API_SWAGGER_SCHEME',
		},
		host: {
			doc: 'The host (name or IP) serving the API including port if any',
			format: String,
			default: 'localhost:3000',
			env: 'SANDBOX_API_SWAGGER_HOST',
		},
	},
	plugins: {
		doc: 'Plugins to load',
		format: Array,
		env: 'SANDBOX_API_ENABLED_PLUGINS',
		default: [
			'inert',
			'vision',
			'halacious',
			'hapi-auth-bearer-token',
			'./plugins/internal/authSchemes',
			'./plugins/internal/authStrategies',
			'./plugins/internal/swagger',
			'./plugins/internal/health',
			'./plugins/accounts',
			'./plugins/payment-requests',
			'./plugins/consents',
			'./plugins/funds-confirmations',
			'./plugins/trusted_beneficiaries',
			'./plugins/psus',
			'./plugins/accreditation',
		],
	},
	database: {
		client: {
			doc: 'The db client',
			format: String,
			default: 'sqlite3',
		},
	},
	pino: {
		name: {
			doc: 'API logger name',
			format: String,
			default: 'sandbox',
		},
		level: {
			doc: 'Logger level',
			format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
			env: 'SANDBOX_API_LOG_LEVEL',
			default: 'trace',
		},
		prettyPrint: {
			doc: 'Pretty output',
			format: Boolean,
			env: 'SANDBOX_API_PRETTY_LOGS',
			default: false,
		},
	},
	auth: {
		url: {
			doc: 'Auth Server base address',
			format: String,
			env: 'SANDBOX_AUTH_SERVER_URL',
			default: 'http://kong-api-gateway-dev:9000',
		},
		introspection: {
			doc: 'Introspection path',
			format: String,
			env: 'SANDBOX_AUTH_SERVER_INTROSPECTION',
			default: '/introspect',
		},
		internal: {
			doc: 'Internal auth path',
			format: String,
			env: 'SANDBOX_AUTH_SERVER_INTERNAL',
			default: '/internal',
		},
	},
	tokenPaymentExecution: {
		interval: {
			doc: 'Interval on which pending payments are executed',
			default: 1000 * 60 * 60 * 24,
			env: 'SANDBOX_TOKEN_PAYMENT_EXECUTION_INTERVAL_MS',
		},
	},
}

module.exports = schema
