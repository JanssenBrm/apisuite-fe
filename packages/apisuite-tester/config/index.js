const convict = require('convict')

const schema = {
	server: {
		host: {
			doc: 'The IP address to bind.',
			format: 'ipaddress',
			default: '0.0.0.0',
			env: 'OPENBANK_TEST_REPORTER_HOST',
		},
		port: {
			doc: 'The port to bind.',
			format: 'port',
			default: 3000,
			env: 'OPENBANK_TEST_REPORTER_PORT',
		},
	},
	publicHost: {
		doc: 'Server public host',
		format: String,
		default: 'http://8dae2a1f.ngrok.io',
		env: 'OPENBANK_TEST_REPORTER_PUBLIC_HOST',
	},
	twilio: {
		accountSid: {
			doc: 'Twilio account sid',
			format: String,
			default: 'ACe4d592351ac0c1e0c0d17a3796810375',
			env: 'OPENBANK_TEST_REPORTER_TWILIO_ACCOUNT_SID',
		},
		authToken: {
			doc: 'Twilio auth token',
			format: String,
			default: '90050675e6979facb2052046a2b19f11',
			env: 'OPENBANK_TEST_REPORTER_TWILIO_AUTH_TOKEN',
		},
		senderTestNumber: {
			doc: 'Twilio sender test number',
			format: String,
			default: '+32460240745',
			env: 'OPENBANK_TEST_REPORTER_TWILIO_SENDER_TEST_NUMBER',
		},
		receiverTestNumber: {
			doc: 'Twilio receiver test number',
			format: String,
			default: '+32460201360',
			env: 'OPENBANK_TEST_REPORTER_TWILIO_RECEIVER_TEST_NUMBER',
		},
	},
	maxReportHistoryPerEnv: {
		doc: 'Max number of reports to keep per env',
		format: 'int',
		default: 50,
		env: 'OPENBANK_TEST_REPORTER_MAX_REPORT_HISTORY',
	},
	testsRunTimes:{
		doc: 'Set the number of times tests should run a day',
		format: 'int',
		default: 2,
		env: 'OPENBANK_TEST_REPORTER_TEST_RUN_TIMES',
	},
	environments: {
		develop: {
			path: 'dev_do',
			name: 'Develop (DO)',
			watcher: {
				doc: 'Set if the tests should run periodicaly in develop',
				format: Boolean,
				default: false,
				env: 'OPENBANK_TEST_REPORTER_DEVELOP_WATCHER_ON',
			},
			servers: {
				'openbank-middleware-api': 'https://api.develop.openbankportal.be',
				'openbank-sandbox-auth-server': 'https://auth.develop.openbankportal.be',
				'openbank-sandbox-api': 'https://sandbox.develop.openbankportal.be',
			},
		},
		staging: {
			path: 'staging_do',
			name: 'Staging RC0 (DO)',
			watcher: {
				doc: 'Set if the tests should run periodicaly in develop',
				format: Boolean,
				default: false,
				env: 'OPENBANK_TEST_REPORTER_STAGING_WATCHER_ON',
			},
			servers: {
				'openbank-middleware-api': 'https://api.rc0.openbankportal.be',
				'openbank-sandbox-auth-server': 'https://auth.rc0.openbankportal.be',
				'openbank-sandbox-api': 'https://sandbox.rc0.openbankportal.be',
			},
		},
		rc0: {
			path: 'rc0_sentia',
			name: 'RC0 (Sentia)',
			watcher: {
				doc: 'Set if the tests should run periodicaly in sentia rc0',
				format: Boolean,
				default: true,
				env: 'OPENBANK_TEST_REPORTER_RC0_WATCHER_ON',
			},
			servers: {
				'openbank-middleware-api': 'https://sandbox.middleware.tstbnpparibasfortis.com',
				'openbank-sandbox-auth-server': 'https://sandbox.auth.tstbnpparibasfortis.com',
				'openbank-sandbox-api': 'https://sandbox.api.tstbnpparibasfortis.com',
			},
		},
		rc1: {
			path: 'rc1_sentia',
			name: 'RC1 (Sentia)',
			watcher: {
				doc: 'Set if the tests should run periodicaly in sentia rc1',
				format: Boolean,
				default: false,
				env: 'OPENBANK_TEST_REPORTER_RC1_WATCHER_ON',
			},
			servers: {
				'openbank-middleware-api': 'https://sandbox.middleware.qabnpparibasfortis.com',
				'openbank-sandbox-auth-server': 'https://sandbox.auth.qabnpparibasfortis.com',
				'openbank-sandbox-api': 'https://sandbox.api.qabnpparibasfortis.com',
			},
		},
		production: {
			path: 'production',
			name: 'production',
			watcher: {
				doc: 'Set if the tests should run periodicaly in production',
				format: Boolean,
				default: true,
				env: 'OPENBANK_TEST_REPORTER_PRODUCTION_WATCHER_ON',
			},
			servers: {
				'openbank-middleware-api': 'https://sandbox.middleware.bnpparibasfortis.com',
				'openbank-sandbox-auth-server': '',
				'openbank-sandbox-api': '',
			},
		},
	},
	reporters: {
		slack: {
			hook: {
				doc: 'Slack reporter hook',
				format: String,
				default: 'https://hooks.slack.com/services/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',
				env: 'OPENBANK_TEST_REPORTER_SLACK_HOOK',
			},
			send: {
				doc: 'Send the report to slack',
				format: Boolean,
				default: true,
				env: 'OPENBANK_TEST_REPORTER_SLACK_SEND',
			},
		},
	},
}

module.exports = convict(schema)
