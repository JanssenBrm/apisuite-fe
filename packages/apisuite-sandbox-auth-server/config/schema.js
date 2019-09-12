const schema = {
	env: {
		doc: 'The API environment.',
		format: ['production', 'staging', 'test', 'development'],
		default: 'development',
		env: 'OBSANDBOXAUTH_API_NODE_ENV',
	},
	server: {
		host: {
			doc: 'The IP address to bind.',
			format: 'ipaddress',
			default: '0.0.0.0',
			env: 'OBSANDBOXAUTH_API_IP_ADDRESS',
		},
		port: {
			doc: 'The port to bind.',
			format: 'port',
			default: 3000,
			env: 'OBSANDBOXAUTH_API_PORT',
		},
		routes: {
			cors: {
				origin: {
					doc: 'Server default CORS origin',
					format: Array,
					env: 'OBSANDBOXAUTH_API_DEFAULT_CORS_ORIGINS',
					default: ['*'],
				},
				additionalHeaders: {
					doc: 'Server default CORS headers',
					format: Array,
					env: 'OBSANDBOXAUTH_API_DEFAULT_CORS_HEADERS',
					default: [],
				},
			},
		},
	},
	database: {
		options: {
			host: {
				doc: 'database hostname',
				format: String,
				env: 'OBSANDBOXAUTH_API_DATABASE_HOST',
				default: 'localhost',
			},
			port: {
				doc: 'database connection port',
				format: Number,
				env: 'OBSANDBOXAUTH_API_DATABASE_PORT',
				default: 3306,
			},
			database: {
				doc: 'database schema',
				format: String,
				env: 'OBSANDBOXAUTH_API_DATABASE_SCHEMA',
				default: 'authdb',
			},
			user: {
				doc: 'database user',
				format: String,
				env: 'OBSANDBOXAUTH_API_DATABASE_USER',
				default: 'root',
			},
			password: {
				doc: 'database password',
				format: String,
				env: 'OBSANDBOXAUTH_API_DATABASE_PASSWORD',
				default: 'cloudoki',
			},
		},
		pool: {
			min: {
				doc: 'minimum number of connection with the database',
				format: Number,
				env: 'OBSANDBOXAUTH_API_MODULE_USER_DB_POOL_MIN',
				default: 2,
			},
			max: {
				doc: 'maximum number of connection with the database',
				format: Number,
				env: 'OBSANDBOXAUTH_API_MODULE_USER_DB_POOL_MAX',
				default: 10,
			},
			refreshIdle: {
				doc: 'Specifies whether idle resources at or below the min threshold should be destroyed/re-created',
				format: Boolean,
				env: 'OBSANDBOXAUTH_API_MODULE_USER_DB_POOL_REFRESH_IDLE',
				default: false,
			},
		},
		acquireConnectionTimeout: {
			doc: 'Time in ms to throw a timeout error when acquiring a connection is not possible',
			format: Number,
			env: 'OBSANDBOXAUTH_API_MODULE_USER_DB_CONN_TIMEOUT',
			default: 5000,
		},
	},
	plugins: {
		doc: 'Plugins to load',
		format: Array,
		env: 'OBSANDBOXAUTH_API_ENABLED_PLUGINS',
		default: [
			'inert',
			'vision',
			'../src/plugins/internal/good',
			'hapi-auth-cookie',
			'hapi-auth-bearer-token',
			'../src/plugins/internal/x-request-id',
			'../src/plugins/internal/internationalization',
			'../src/plugins/internal/session',
			'../src/plugins/internal/cache',
			'../src/plugins/internal/authStrategies',
			'../src/plugins/oauth',
			'../src/plugins/organizationContainer',
			'../src/plugins/app',
			'../src/plugins/payment-requests',
		],
	},
	cookie: {
		name: 'sid-apisuite-cookie',
	},
	pino: {
		config: {
			name: {
				doc: 'API logger name',
				format: String,
				default: 'obs-auth-manager',
			},
			level: {
				doc: 'Logger level',
				format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
				env: 'OBSANDBOXAUTH_API_LOG_LEVEL',
				default: 'trace',
			},
			enabled: {
				doc: 'Enable/disable log',
				format: Boolean,
				env: 'OBSANDBOXAUTH_API_LOG_ENABLED',
				default: true,
			},
		},
		pretty: false,
	},
	authOptions: {
		authorizationCode: {
			ttl: 1000 * 60 * 5,
		},
		accessToken: {
			ttl: 1000 * 60 * 60,
		},
		refreshToken: {
			ttl: 1000 * 60 * 60 * 24 * 7,
		},
	},
	kong: {
		gateway: {
			url: {
				doc: 'The Kong Api Gateway base url',
				default: 'http://localhost:3010',
				env: 'OBSANDBOXAUTH_KONG_API_GATEWAY',
			},
		},
	},
	sandbox: {
		imageTag: {
			doc: 'The Kong Api Gateway base url',
			default: '1.4.0.47.develop',
			env: 'OBSANDBOXAUTH_IMAGE_TAG',
		},
	},
	tokenCleaner: {
		interval: {
			doc: 'Interval on which expired tokens are removed',
			default: 1000 * 60 * 60 * 2,
			env: 'OBSANDBOXAUTH_TOKEN_CLEANER_INTERVAL_MS',
		},
	},
	branded: {
		doc: 'Serve branded images and fonts.',
		default: false,
		env: 'OBSANDBOXAUTH_BRANDED',
	},
	certificate: {
		withCert: {
			doc: 'Should use the certificate in the request',
			format: String,
			env: 'OBSANDBOXAUTH_REQUEST_WITH_CERT',
			default: 'true',
		},
		certPath: {
			doc: 'The certificate path',
			format: String,
			env: 'OBSANDBOXAUTH_CERT_PATH',
			default: '',
		},
		keyPath: {
			doc: 'The key path',
			format: String,
			env: 'OBSANDBOXAUTH_CERT_KEY_PATH',
			default: '',
		},
		certPassphrase: {
			doc: 'The certificate passphrase',
			format: String,
			env: 'OBSANDBOXAUTH_CERT_PASSPHRASE',
			default: '',
		},
	},
}

module.exports = schema
