
const schema = {
	env: {
		doc: 'The API environment.',
		format: ['production', 'staging', 'test', 'development'],
		default: 'development',
		env: 'APPCENTER_API_NODE_ENV',
	},
	appcenter: {
		url: {
			doc: 'Appcenter frontend url',
			format: String,
			default: 'https://frontend.develop.openbankportal.be',
			env: 'APPCENTER_URL',
		},
		api: {
			doc: 'Appcenter api url',
			format: String,
			default: 'https://api.develop.openbankportal.be',
			env: 'APPCENTER_API_URL',
		},
		admin: {
			doc: 'Appcenter admin url',
			format: String,
			default: 'https://admin.develop.openbankportal.be/',
			env: 'APPCENTER_ADMIN_URL',
		},
		scenario: {
			doc: 'App center scenario url',
			format: String,
			default: 'https://scenario-manager.develop.openbankportal.be',
			env: 'APPCENTER_SCENARIO_URL',
		},
	},
	allowedOrigins: {
		restrict: {
			doc: 'Appcenter restrict allowed origins',
			format: Boolean,
			default: true,
			env: 'OPENBANK_MIDDLEWARE_API_RESTRICT_ORIGIN',
		},
	},
	sandboxAuthServer: {
		host: {
			doc: 'Openbank sandbox auth server api url',
			format: String,
			default: 'https://auth.develop.openbankportal.be',
			env: 'OPENBANK_MIDDLEWARE_API_SANDBOX_AUTH_API_HOST',
		},
		clientId: {
			doc: 'Openbank sandbox auth server, middleware client id',
			format: String,
			default: '',
			env: 'OPENBANK_MIDDLEWARE_API_SANDBOX_AUTH_CLIENT_ID',
		},
		clientSecret: {
			doc: 'Openbank sandbox auth server, middleware client secret',
			format: String,
			default: '',
			env: 'OPENBANK_MIDDLEWARE_API_SANDBOX_AUTH_CLIENT_SECRET',
		},
	},
	server: {
		host: {
			doc: 'The IP address to bind.',
			format: 'ipaddress',
			default: '0.0.0.0',
			env: 'APPCENTER_API_IP_ADDRESS',
		},
		port: {
			doc: 'The port to bind.',
			format: 'port',
			default: 3000,
			env: 'APPCENTER_API_PORT',
		},
		routes: {
			cors: {
				origin: {
					doc: 'Server default CORS origin',
					format: Array,
					env: 'APPCENTER_API_DEFAULT_CORS_ORIGINS',
					default: [],
				},
				additionalHeaders: {
					doc: 'Server default CORS headers',
					format: Array,
					env: 'APPCENTER_API_DEFAULT_CORS_HEADERS',
					default: [],
				},
			},
			security: {
				hsts: {
					doc: 'True if to include HSTS headers',
					format: Boolean,
					default: true,
					env: 'APPCENTER_API_HSTS_ENABLED',
				},
			},
		},
		cache: [
			{
				name: 'memCache',
				engine: require('catbox-memory'),
				partition: 'cache',
			},
		],
	},
	swagger: {
		scheme: {
			doc: 'The transfer protocol of the API',
			format: ['http', 'https'],
			default: 'http',
			env: 'APPCENTER_API_SWAGGER_SCHEME',
		},
		host: {
			doc: 'The host (name or IP) serving the API including port if any',
			format: String,
			default: 'localhost:3000',
			env: 'APPCENTER_API_SWAGGER_HOST',
		},
	},
	support: {
		email: {
			doc: 'The email to send the support tickets to.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_SUPPORT_API_EMAIL',
			default: 'openbanking@bnpparibasfortis.com',
		},
		tpemail: {
			doc: 'The email to send the tp support tickets to.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_SUPPORT_API_TP_EMAIL',
			default: 'tpsupport@bnpparibasfortis.com',
		},
	},
	contact: {
		from: {
			doc: 'The email to use in the `from` field when sending emails.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_CONTACT_FROM_EMAIL',
			default: 'openbanking@bnpparibasfortis.com',
		},
	},
	admin: {
		email: {
			doc: 'The email to send admin notifications to.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_ADMIN_NOTIFY_EMAIL',
			default: 'openbanking@bnpparibasfortis.com',
		},
	},
	newsletter: {
		email: {
			doc: 'The email to send the newsletter to.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_NEWSLETTER_API_EMAIL',
			default: 'openbanking@bnpparibasfortis.com',
		},
	},
	plugins: {
		doc: 'Plugins to load',
		format: Array,
		env: 'APPCENTER_API_ENABLED_PLUGINS',
		default: [
			'inert',
			'vision',
			'bell',
			'hapi-auth-bearer-token',
			'./plugins/internal/cache',
			'./plugins/internal/authStrategies',
			'./plugins/internal/swagger',
			'./plugins/internal/good',
			'./plugins/internal/jsdoc',
			'./plugins/internal/lab',
			'./plugins/internal/translations',
			'./plugins/internal/rbac',
			'./plugins/health',
			'./plugins/userRegistration',
			'./plugins/user',
			'./plugins/organization',
			'./plugins/organizationSandboxApp',
			'./plugins/sandboxAdmin',
			'./plugins/oauth2',
			'./plugins/productSubscription',
			'./plugins/product',
			'./plugins/scenario',
			'./plugins/support',
			'./plugins/newsletter',
			'./plugins/apiDocs',
			'./plugins/organizationCertificate',
			'./plugins/userInvitation',
			'./plugins/thirdParty',
			'./plugins/rbac',
			'./plugins/externalResources',
			'./plugins/activityLog',
			'./plugins/notification',
		],
	},
	oauth2: {
		token_expiresIn: {
			doc: 'The time in seconds to expire the token',
			format: Number,
			env: 'OAUTH2_TOKEN_EXPIRATION',
			default: 60 * 60, // in seconds
		},
		code_expiresIn: {
			doc: 'The time in minutes to expire the code',
			format: Number,
			env: 'OAUTH2_CODE_EXPIRATION',
			default: 5 * 60, // 5 minutes
		},
		refreshToken_expiresIn: {
			doc: 'The time in minutes to expire the refresh token',
			format: Number,
			env: 'OAUTH2__REFRESH_TOKEN_EXPIRATION',
			default: 52560000, // 100 years
		},
		db_timeToCheckExpiredTokens: {
			doc: 'The time in minutes to check database for expired tokens',
			format: Number,
			env: 'OAUTH2_DB_CHECK_TOKENS',
			default: 60 * 60, // 60 minutes
		},
		debug: {
			doc: 'debug',
			format: Boolean,
			env: 'OAUTH2_DEBUG',
			default: true,
		},
		passphrase: {
			doc: 'The passphrase for the certificates',
			format: String,
			env: 'OAUTH2_CERTS_PASSPHRASE',
			default: '53kr37',
		},
		session: {
			maxAge: {
				doc: 'The maximum age in milliseconds of the session.',
				format: Number,
				env: 'OAUTH2_SESSION_MAX_AGE',
				default: 3600000 * 24 * 7 * 52, // 1 year
			},
			secret: {
				doc: 'The session secret',
				format: String,
				env: 'OAUTH2_SESSION_SECRET',
				default: '53kre7 TH@7 mUZt bE ch4Ng3D',
			},
		},
	},
	users: {
		activationCode: {
			expiration: {
				doc: 'Activation code expiration time in days',
				format: 'int',
				env: 'APPCENTER_USERS_ACTIVATION_EXPIRATION_DAYS',
				default: 10,
			},
		},
		registrationCode: {
			expiration: {
				doc: 'Registration code expiration time in seconds',
				format: 'int',
				env: 'APPCENTER_USERS_REGISTRATION_EXPIRATION_SECONDS',
				default: 3600,
			},
		},
	},
	database: {
		options: {
			host: {
				doc: 'database hostname',
				format: String,
				env: 'APPCENTER_API_DATABASE_HOST',
				default: 'localhost',
			},
			port: {
				doc: 'database connection port',
				format: Number,
				env: 'APPCENTER_API_DATABASE_PORT',
				default: 3306,
			},
			database: {
				doc: 'database schema',
				format: String,
				env: 'APPCENTER_API_DATABASE_SCHEMA',
				default: 'appcenter',
			},
			user: {
				doc: 'database user',
				format: String,
				env: 'APPCENTER_API_DATABASE_USER',
				default: 'root',
			},
			password: {
				doc: 'database password',
				format: String,
				env: 'APPCENTER_API_DATABASE_PASSWORD',
				default: 'cloudoki',
			},
		},
		pool: {
			min: {
				doc: 'minimum number of connection with the database',
				format: Number,
				env: 'APPCENTER_API_MODULE_USER_DB_POOL_MIN',
				default: 2,
			},
			max: {
				doc: 'maximum number of connection with the database',
				format: Number,
				env: 'APPCENTER_API_MODULE_USER_DB_POOL_MAX',
				default: 10,
			},
			refreshIdle: {
				doc: 'Specifies whether idle resources at or below the min threshold should be destroyed/re-created',
				format: Boolean,
				env: 'APPCENTER_API_MODULE_USER_DB_POOL_REFRESH_IDLE',
				default: false,
			},
		},
		acquireConnectionTimeout: {
			doc: 'Time in ms to throw a timeout error when acquiring a connection is not possible',
			format: Number,
			env: 'APPCENTER_API_MODULE_USER_DB_CONN_TIMEOUT',
			default: 5000,
		},
	},
	logger: {
		name: {
			doc: 'API logger name',
			format: String,
			default: 'appcenter-api',
		},
		level: {
			doc: 'Logger level',
			format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
			env: 'APPCENTER_API_LOG_LEVEL',
			default: 'trace',
		},
	},
	sendgrid: {
		apiKey: {
			doc: 'Sendgrid API key',
			format: String,
			env: 'APPCENTER_API_SENDGRID_KEY',
		},
	},
	sentiaSMTP: {
		host: {
			doc: 'Sentia SMTP host',
			format: String,
			env: 'APPCENTER_API_SENTIA_SMTP_HOST',
			default: '127.0.0.1',
		},
		port: {
			doc: 'Sentia SMTP port',
			format: Number,
			env: 'APPCENTER_API_SENTIA_SMTP_PORT',
			default: '25',
		},
		useSentia: {
			doc: 'Should use sentia smtp as email service',
			format: Boolean,
			env: 'APPCENTER_API_USE_SENTIA',
			default: true,
		},
	},
	twilio: {
		accountSid: {
			doc: 'Twilio account Sid',
			format: String,
			env: 'APPCENTER_API_TWILIO_ACCOUNT_SID',
			default: 'ACe300c87e3d5d1bd107db887ac1555452',
		},
		authToken: {
			doc: 'Twilio auth token',
			format: String,
			env: 'APPCENTER_API_TWILIO_AUTH_TOKEN',
			default: '4d1faa7962eef3918490af76b27be9b5',
		},
		number: {
			doc: 'Twilio number',
			format: String,
			env: 'APPCENTER_API_TWILIO_NUMBER',
			default: '+15005550006',
		},
	},
	ng: {
		accountId: {
			doc: 'NG Communications user id',
			format: String,
			env: 'APPCENTER_API_NG_ACCOUNT_ID',
			default: '',
		},
		accountPwd: {
			doc: 'NG Communications pwd',
			format: String,
			env: 'APPCENTER_API_NG_ACCOUNT_PWD',
			default: '',
		},
		api: {
			doc: 'NG Communications auth url',
			format: String,
			env: 'APPCENTER_API_NG_AUTH_URL',
			default: 'https://api.ngcommunications.com',
		},
		senderId: {
			doc: 'NG Communications sender id',
			format: String,
			env: 'APPCENTER_API_NG_SENDER_ID',
			default: 'openbank-sender-id',
		},
		testNumber: {
			doc: 'The Number to be used for testing purposes. Applies only to NGCommunications',
			format: String,
			env: 'APPCENTER_API_SMS_TEST_NUMBER',
			default: '+15005550006',
		},
	},
	sms: {
		provider: {
			doc: 'The Provider to use to send sms. can be ng or twilio',
			format: String,
			env: 'APPCENTER_API_SMS_PROVIDER',
			default: 'twilio',
		},
	},
	twoFactor: {
		totp_encryption_key: {
			format: String,
			env: 'TOTP_KEY',
			default: 'd41d8cd98f00b204e9800998ecf8427e',
		},
	},
	github: {
		baseUrl: 'https://api.github.com',
		endpoints: {
			authenticatedUser: '/user',
		},
		userAgent: 'openbank',
		app: {
			client_id: {
				doc: 'The github oauth app client id',
				format: String,
				env: 'GITHUB_APP_CLIENT_ID',
				default: '061498e74f2e648f1234',
			},
			client_secret: {
				doc: 'The github oauth app client secret',
				format: String,
				env: 'GITHUB_APP_CLIENT_SECRET',
				default: '8f7ba10b3d9d8371eedf96b1ccbb8793e74dae09',
			},
		},
	},
	kong: {
		gateway: {
			url: {
				doc: 'The Kong Api Gateway base url',
				default: 'https://sandbox.develop.openbankportal.be',
				env: 'OBSANDBOXAUTH_KONG_API_GATEWAY',
			},
		},
	},
	sandbox: {
		credentials: {
			clientId: {
				doc: 'The middleware client id',
				format: String,
				env: 'OBM_SANDBOX_CLIENT_ID',
				default: 'e05b6a6c-ac05-42ba-973e-32c9550b84b5',
			},
			clientSecret: {
				doc: 'The middleware client secret',
				format: String,
				env: 'OBM_SANDBOX_CLIENT_SECRET',
				default: '3f2dd64f-a2cc-4617-8522-adec7a922669',
			},
			scope: {
				doc: 'The middleware scope',
				format: String,
				env: 'OBM_SANDBOX_SCOPE',
				default: 'admin',
			},
		},
	},
	pwdComplexity: {
		min: {
			doc: 'The Password complexity Min length',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_MIN_LEN',
			default: 12,
		},
		max: {
			doc: 'The Password complexity Max length',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_MAX_LEN',
			default: 64,
		},
		lowerCase: {
			doc: 'The Password complexity Lower case',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_LOWER',
			default: 1,
		},
		upperCase: {
			doc: 'The Password complexity Upper case',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_UPPER',
			default: 1,
		},
		numbers: {
			doc: 'The Password complexity Numbers',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_NUMBERS',
			default: 1,
		},
		symbols: {
			doc: 'The Password complexity Symbols',
			format: Number,
			env: 'OBM_PWD_COMPLEXITY_SYMBOLS',
			default: 1,
		},
	},
	googleRecaptcha: {
		verifyURL: {
			doc: 'The google URL to verify tokens.',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_RECAPTCHA_VERIFY_URL',
			default: 'https://www.google.com/recaptcha/api/siteverify',
		},
		secret: {
			doc: 'The secret used to validate the recaptcha',
			format: String,
			env: 'OPENBANK_MIDDLEWARE_API_RECAPTCHA_SECRET',
			default: '',
		},
	},
	certificate: {
		withCert: {
			doc: 'Should use the certificate in the request',
			format: Boolean,
			env: 'OPENBANK_MW_REQUEST_WITH_CERT',
			default: true,
		},
		certPath: {
			doc: 'The certificate path',
			format: String,
			env: 'OPENBANK_MW_CERT_PATH',
			default: '',
		},
		keyPath: {
			doc: 'The key path',
			format: String,
			env: 'OPENBANK_MW_CERT_KEY_PATH',
			default: '',
		},
		certPassphrase: {
			doc: 'The certificate passphrase',
			format: String,
			env: 'OPENBANK_MW_CERT_PASSPHRASE',
			default: '',
		},
	},
	branded: {
		doc: 'Should templates be branded.',
		format: Boolean,
		default: true,
		env: 'OPENBANK_MW_BRANDED',
	},
}

module.exports = schema
