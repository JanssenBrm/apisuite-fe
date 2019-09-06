
const config = require('../src/config')
const unbranded = !config.get('branded')
const productPIISPData = [
	{
		'name': 'Check Availability of Funds API',
		'longname': `Check Availability of Funds API – ${unbranded ? 'Bank One' : 'BNP Paribas Fortis'} Accounts`,
		'intro': 'Give customers the option to assess availability of funds for their payments.',
		'description': `With our ${unbranded ? 'Bank One' : 'BNP Paribas Fortis'} CAF API you can find out if customers have sufficient funds to cover a given payment amount from their account`,
		'image': 'logo.svg',
		'usecases': [
			{
				'title': 'Ensure user satisfaction',
				'description': 'With this api, you will not run into the issue that the user cannot cover a payment, which creates frustration for the user and friction in the customer journey. You can check if the payment is covered by the user\'s available funds immediately from your app.',
			},
			{
				'title': 'Seamless and safe experiences',
				'description': 'This API will allow you to build seamless journeys for our customers, who remain in full control. Our customers always decide which third party app can have access to their account, in a secure way.',
			},
		],
		'features': [
			{
				'title': 'Identification',
				'description': 'Our CAF API will provide for proper identification and consent approval.',
			},
			{
				'title': 'Check Availability of Funds',
				'description': 'Our CAF API will ensure that the available balance on a given current account is sufficient to cover the desired amount for a payment request.',
			},
		],
		'version': 'Sandbox v1.4.0.47',
	},
	{
		'name': 'Check Availability of Funds API',
		'longname': `Check Availability of Funds API – ${unbranded ? 'Bank Two' : 'Hello Bank!'} Accounts`,
		'intro': 'Give customers the option to assess availability of funds for their payments.',
		'description': `With our ${unbranded ? 'Bank Two' : 'Hello Bank!'} CAF API you can find out if customers have sufficient funds to cover a given payment amount from their account`,
		'image': 'logo.svg',
		'usecases': [
			{
				'title': 'Ensure user satisfaction',
				'description': 'With this api, you will not run into the issue that the user cannot cover a payment, which creates frustration for the user and friction in the customer journey. You can check if the payment is covered by the user\'s available funds immediately from your app.',
			},
			{
				'title': 'Seamless and safe experiences',
				'description': 'This API will allow you to build seamless journeys for our customers, who remain in full control. Our customers always decide which third party app can have access to their account, in a secure way.',
			},
		],
		'features': [
			{
				'title': 'Identification',
				'description': 'Our CAF API will provide for proper identification and consent approval.',
			},
			{
				'title': 'Check Availability of Funds',
				'description': 'Our CAF API will ensure that the available balance on a given current account is sufficient to cover the desired amount for a payment request.',
			},
		],
		'version': 'Sandbox v1.4.0.47',
	},
	{
		'name': 'Check Availability of Funds API',
		'longname': `Check Availability of Funds API – ${unbranded ? 'Bank Three' : 'Fintro'} Accounts`,
		'intro': 'Give customers the option to assess availability of funds for their payments.',
		'description': `With our ${unbranded ? 'Bank Three' : 'Fintro'} CAF API you can find out if customers have sufficient funds to cover a given payment amount from their account`,
		'image': 'logo.svg',
		'usecases': [
			{
				'title': 'Ensure user satisfaction',
				'description': 'With this api, you will not run into the issue that the user cannot cover a payment, which creates frustration for the user and friction in the customer journey. You can check if the payment is covered by the user\'s available funds immediately from your app.',
			},
			{
				'title': 'Seamless and safe experiences',
				'description': 'This API will allow you to build seamless journeys for our customers, who remain in full control. Our customers always decide which third party app can have access to their account, in a secure way.',
			},
		],
		'features': [
			{
				'title': 'Identification',
				'description': 'Our CAF API will provide for proper identification and consent approval.',
			},
			{
				'title': 'Check Availability of Funds',
				'description': 'Our CAF API will ensure that the available balance on a given current account is sufficient to cover the desired amount for a payment request.',
			},
		],
		'version': 'Sandbox v1.4.0.47',
	},
]

const piispJson = {
	'openapi': '3.0.0',
	'info': {
		'version': 'v1',
		'title': 'Channels-PSD2-Facade-TPP',
		'description': 'This API intends to provide an interface between\n- Account Servicing Payment Service Providers (ASPSP)\n- Third Party (Payment Service) Providers (TPP)\n\nTPP may act with different roles as described below:\n- Account Information Service Providers (AISP)\n- Payment Initiation Service Providers (PISP)\n- Payment Instrument Issuer Service Providers (PIISP)\n\nThe Payment Service User (PSU) is the owner of the accounts held by the ASPSP and gives accreditations to the TPP in order to access his accounts information or initiates payment from these accounts\n\nThe API is designed on a REST model using JSON structures.\n\nThe Richardson Maturity Model is applied on level three using HAL HYPERMEDIA links\n',
		'contact': {
			'name': 'STET',
			'url': 'https://www.stet.eu/en/psd2/',
			'email': 'psd2@stet.eu',
		},
		'license': {
			'name': 'Creative Commons Attribution 3.0 France (CC BY 3.0 FR)',
		},
	},
	'paths': {
		'/funds-confirmations': {
			'post': {
				'operationId': 'fundsConfirmationsPost',
				'tags': [
					'PIISP',
				],
				'summary': 'Payment coverage check request (PIISP)',
				'description': '<h3>This service is not supported in this version.</h3>\n<h3>Description</h3>\nThe PIISP can ask an ASPSP to check if a given amount can be covered by the liquidity that is available on a PSU cash account or payment card.\n<h3>Prerequisites</h3>\n<ul>\n  <li>The TPP has been registered by the Registration Authority for the PIISP role</li>\n  <li>The TPP and the PSU have a contract that has been registered by the ASPSP</li>\n  <ul>\n    <li>At this step, the ASPSP has delivered an \'Authorization Code\', a \'Resource Owner Password\' or a \'Client Credential\' OAUTH2 access token to the TPP (cf. &sect; 3.4.2).</li>\n    <li>Each ASPSP has to implement either the \'Authorization Code\'/\'Resource Owner Password\' or the \'Client Credential\' OAUTH2 access token model.</li>\n    <li>Doing this, it will edit the [security] section on this path in order to specify which model it has chosen</li>\n  </ul>\n  <li>The TPP and the ASPSP have successfully processed a mutual check and authentication </li>\n  <li>The TPP has presented its OAUTH2 \'Authorization Code\' or \'Resource Owner Password\' access token which allows the ASPSP to identify the relevant PSU.</li>\n</ul>\n<h3>Business flow</h3>\nThe PIISP requests the ASPSP for a payment coverage check against either a bank account or a card primary identifier.\nThe ASPSP answers with a structure embedding the original request and the result as a Boolean.    \n',
				'security': [
					{
						'accessCode': [
							'piisp',
						],
					},
					{
						'resourceOwnerIdentification': [
							'piisp',
						],
					},
					{
						'clientCredentials': [
							'piisp',
						],
					},
				],
				'parameters': [
					{
						'$ref': '#/components/parameters/AuthorizationParameter',
					},
					{
						'$ref': '#/components/parameters/PsuIpAddressHeader',
					},
					{
						'$ref': '#/components/parameters/PsuIpPortHeader',
					},
					{
						'$ref': '#/components/parameters/PsuHttpMethodHeader',
					},
					{
						'$ref': '#/components/parameters/PsuDateHeader',
					},
					{
						'$ref': '#/components/parameters/PsuGeoLocation',
					},
					{
						'$ref': '#/components/parameters/PsuUserAgentHeader',
					},
					{
						'$ref': '#/components/parameters/PsuRefererHeader',
					},
					{
						'$ref': '#/components/parameters/PsuAcceptHeader',
					},
					{
						'$ref': '#/components/parameters/PsuAcceptCharsetHeader',
					},
					{
						'$ref': '#/components/parameters/PsuAcceptEncodingHeader',
					},
					{
						'$ref': '#/components/parameters/PsuAcceptLanguageHeader',
					},
					{
						'$ref': '#/components/parameters/PsuDeviceId',
					},
					{
						'$ref': '#/components/parameters/DigestHeader',
					},
					{
						'$ref': '#/components/parameters/SignatureHeader',
					},
					{
						'$ref': '#/components/parameters/Correlation',
					},
				],
				'requestBody': {
					'content': {
						'application/json': {
							'schema': {
								'$ref': '#/components/schemas/PaymentCoverageRequestResource',
							},
						},
					},
					'description': 'parameters of a payment coverage request',
					'required': true,
				},
				'responses': {
					'200': {
						'description': 'payment coverage request',
						'headers': {
							'X-Request-ID': {
								'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
								'schema': {
									'type': 'string',
								},
							},
							'Digest': {
								'description': 'Digest of the body',
								'schema': {
									'type': 'string',
								},
							},
							'Signature': {
								'description': 'http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/)\nThe keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.\n',
								'schema': {
									'type': 'string',
								},
							},
						},
						'content': {
							'application/hal+json; charset=utf-8': {
								'schema': {
									'$ref': '#/components/schemas/HalPaymentCoverageReport',
								},
							},
						},
					},
					'400': {
						'$ref': '#/components/responses/400',
					},
					'401': {
						'$ref': '#/components/responses/401',
					},
					'403': {
						'$ref': '#/components/responses/403',
					},
					'405': {
						'$ref': '#/components/responses/405',
					},
					'406': {
						'$ref': '#/components/responses/406',
					},
					'408': {
						'$ref': '#/components/responses/408',
					},
					'429': {
						'$ref': '#/components/responses/429',
					},
					'500': {
						'$ref': '#/components/responses/500',
					},
					'503': {
						'$ref': '#/components/responses/503',
					},
				},
			},
		},
	},
	'servers': [
		{
			'url': 'https://10.241.32.19:8243/psd2/v1',
		},
		{
			'url': 'http://10.241.32.19:8243/psd2/v1',
		},
	],
	'components': {
		'parameters': {
			'AccountResourceIdentification': {
				'name': 'accountResourceId',
				'in': 'path',
				'description': 'Identification of account resource to fetch',
				'required': true,
				'schema': {
					'type': 'string',
					'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
				},
			},
			'PaymentRequestResourceIdentification': {
				'name': 'paymentRequestResourceId',
				'in': 'path',
				'description': 'Identification of the Payment Request Resource',
				'required': true,
				'schema': {
					'type': 'string',
					'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
				},
			},
			'AfterEntryReference': {
				'name': 'afterEntryReference',
				'in': 'query',
				'description': 'Specifies the value on which the result has to be computed. \n      \nOnly the transaction having a technical identification greater than this value must be included within the result\n',
				'required': false,
				'schema': {
					'type': 'string',
					'maxLength': 40,
				},
			},
			'ToImputationDate': {
				'name': 'dateTo',
				'in': 'query',
				'description': 'Exclusive maximal imputation date of the transactions. \n      \nTransactions having an imputation date equal to this parameter are not included within the result.\n',
				'required': false,
				'schema': {
					'type': 'string',
					'format': 'date-time',
				},
			},
			'FromImputationDate': {
				'name': 'dateFrom',
				'in': 'query',
				'description': 'Inclusive minimal imputation date of the transactions. \n      \nTransactions having an imputation date equal to this parameter are included within the result.\n',
				'required': false,
				'schema': {
					'type': 'string',
					'format': 'date-time',
				},
			},
			'Index': {
				'name': 'index',
				'in': 'query',
				'description': 'page index\n',
				'required': false,
				'schema': {
					'type': 'string',
				},
			},
			'AuthorizationParameter': {
				'name': 'Authorization',
				'in': 'header',
				'description': 'Access token to be passed as a header',
				'required': true,
				'schema': {
					'type': 'string',
				},
			},
			'PsuIpAddressHeader': {
				'name': 'PSU-IP-Address',
				'in': 'header',
				'description': 'IP address used by the PSU\'s terminal when connecting to the TPP',
				'schema': {
					'type': 'string',
				},
			},
			'PsuIpPortHeader': {
				'name': 'PSU-IP-Port',
				'in': 'header',
				'description': 'IP port used by the PSU\'s terminal when connecting to the TPP',
				'schema': {
					'type': 'string',
				},
			},
			'PsuHttpMethodHeader': {
				'name': 'PSU-HTTP-Method',
				'in': 'header',
				'description': 'Http method for the most relevant PSU\'s terminal request to the TTP',
				'schema': {
					'type': 'string',
				},
			},
			'PsuDateHeader': {
				'name': 'PSU-Date',
				'in': 'header',
				'description': 'Timestamp of the most relevant PSU\'s terminal request to the TTP',
				'schema': {
					'type': 'string',
				},
			},
			'PsuGeoLocation': {
				'name': 'PSU-GEO-Location',
				'in': 'header',
				'description': 'Geographical location of the PSU as provided by the PSU mobile terminal if any to the TPP',
				'schema': {
					'type': 'string',
				},
			},
			'PsuUserAgentHeader': {
				'name': 'PSU-User-Agent',
				'in': 'header',
				'description': '\'User-Agent\' header field sent by the PSU terminal when connecting to the TPP\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuRefererHeader': {
				'name': 'PSU-Referer',
				'in': 'header',
				'description': '\'Referer\' header field sent by the PSU terminal when connecting to the TPP.\nNotice that an initial typo in RFC 1945 specifies that \'referer\' (incorrect spelling) is to be used. The correct spelling \'referrer\' can be used but might not be understood.\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuAcceptHeader': {
				'name': 'PSU-Accept',
				'in': 'header',
				'description': '\'Accept\' header field sent by the PSU terminal when connecting to the TPP\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuAcceptCharsetHeader': {
				'name': 'PSU-Accept-Charset',
				'in': 'header',
				'description': '\'Accept-Charset\' header field sent by the PSU terminal when connecting to the TPP\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuAcceptEncodingHeader': {
				'name': 'PSU-Accept-Encoding',
				'in': 'header',
				'description': '\'Accept-Encoding\' header field sent by the PSU terminal when connecting to the TPP\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuAcceptLanguageHeader': {
				'name': 'PSU-Accept-Language',
				'in': 'header',
				'description': '\'Accept-Language\' header field sent by the PSU terminal when connecting to the TPP\n',
				'schema': {
					'type': 'string',
				},
			},
			'PsuDeviceId': {
				'name': 'PSU-Device-ID',
				'in': 'header',
				'description': 'UUID (Universally Unique Identifier) for a device, which is used by the PSU, if available.\nUUID identifies either a device or a device dependant application installation.\nIn case of installation identification this ID need to be unaltered until removal from device.\n',
				'schema': {
					'type': 'string',
				},
			},
			'DigestHeader': {
				'name': 'Digest',
				'in': 'header',
				'required': false,
				'description': 'Digest of the body',
				'schema': {
					'type': 'string',
				},
			},
			'SignatureHeader': {
				'name': 'Signature',
				'in': 'header',
				'required': true,
				'description': 'http-signature of the request (cf. https://datatracker.ietf.org/doc/draft-cavage-http-signatures/)\nThe keyId must specify the way to get the relevant qualified certificate. It is requested that this identifier is an URL aiming to provide the relevant Qualified Certificate.\n',
				'schema': {
					'type': 'string',
				},
			},
			'Correlation': {
				'name': 'X-Request-ID',
				'in': 'header',
				'required': true,
				'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
				'schema': {
					'type': 'string',
					'maxLength': 70,
				},
			},
		},
		'responses': {
			'204': {
				'description': 'No content.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
			},
			'400': {
				'description': 'Invalid status value',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'401': {
				'description': 'Unauthorized, authentication failure.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'403': {
				'description': 'Forbidden, authentication successful but access to resource is not allowed.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'404': {
				'description': 'Not found, no request available.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'405': {
				'description': 'Method Not Allowed.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'406': {
				'description': 'Not Acceptable.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'408': {
				'description': 'Request Timeout.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'429': {
				'description': 'Too many requests.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'500': {
				'description': 'Internal server error.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
			'503': {
				'description': 'Service unavailable.',
				'headers': {
					'X-Request-ID': {
						'description': 'Correlation header to be set in a request and retrieved in the relevant response\n',
						'schema': {
							'type': 'string',
						},
					},
				},
				'content': {
					'*/*': {
						'schema': {
							'$ref': '#/components/schemas/ErrorModel',
						},
					},
				},
			},
		},
		'securitySchemes': {
			'accessCode': {
				'description': 'In order to access the PSU\'s account information, the AISP needs to get aither an authorization code grant or a resource owner password OAUTH2 token.\nThe client_id field within the token request must be filled with the value of the organization identifier attribute that has been set in the distinguished name of eIDAS certificate of the TPP, according to ETSI recommandations. \nPossible values for the {brand} parameter below are bnpparibasfortis, fintro, hellobank\n(cf &sect; 5.2.1 of https://docbox.etsi.org/ESI/Open/Latest_Drafts/ts_119495v000003_for-public-review.pdf)\n',
				'type': 'oauth2',
				'flows': {
					'authorizationCode': {
						'authorizationUrl': 'https://svc.{brand}.be/authorize',
						'tokenUrl': 'https://regulatory.api.{brand}.be/token',
						'scopes': {
							'aisp': 'Access by an AISP to one given PSU\'s account',
							'piisp': 'Access by a PIISP to one given PSU\'s account to check payment coverage',
							'extended_transaction_history': 'Access by an AISP to a transaction history over more than the 90 last days',
						},
					},
				},
			},
			'resourceOwnerIdentification': {
				'description': 'In order to access the PSU\'s account information, the AISP needs to get aither an authorization code grant or a resource owner password OAUTH2 token.\nThe client_id field within the token request must be filled with the value of the organization identifier attribute that has been set in the distinguished name of eIDAS certificate of the TPP, according to ETSI recommandations. \nPossible values for the {brand} parameter below are bnpparibasfortis, fintro, hellobank\n(cf &sect; 5.2.1 of https://docbox.etsi.org/ESI/Open/Latest_Drafts/ts_119495v000003_for-public-review.pdf)\n',
				'type': 'oauth2',
				'flows': {
					'password': {
						'tokenUrl': 'https://oauth2.aspsp/token',
						'scopes': {
							'aisp': 'Access by an AISP to one given PSU\'s account',
							'piisp': 'Access by a PIISP to one given PSU\'s account to check payment coverage',
							'extended_transaction_history': 'Access by an AISP to a transaction history over more than the 90 last days',
						},
					},
				},
			},
			'clientCredentials': {
				'description': 'In order to post a Payment or Transfer Request, the PISP needs to get an client credential OAUTH2 token. \nThe client_id field within the token request must be filled with the value of the organization identifier attribute that has been set in the distinguished name of eIDAS certificate of the TPP, according to ETSI recommandations. \nPossible values for the {brand} parameter below are bnpparibasfortis, fintro, hellobank\n(cf &sect; 5.2.1 of https://docbox.etsi.org/ESI/Open/Latest_Drafts/ts_119495v000003_for-public-review.pdf)\n',
				'type': 'oauth2',
				'flows': {
					'clientCredentials': {
						'tokenUrl': 'https://regulatory.api.{brand}.be/token',
						'scopes': {
							'pisp': 'Access by a PISP to payments resources',
							'piisp': 'Access by a PIISP to one given PSU\'s account to check payment coverage',
						},
					},
				},
			},
			'default': {
				'type': 'oauth2',
				'flows': {
					'implicit': {
						'authorizationUrl': 'https://10.241.32.19:8243/authorize',
						'scopes': {},
					},
				},
			},
		},
		'schemas': {
			'ErrorModel': {
				'description': 'Generic error report structure',
				'type': 'object',
				'required': [
					'status',
					'message',
				],
				'properties': {
					'timestamp': {
						'description': 'current timestamp',
						'type': 'string',
						'format': 'date-time',
					},
					'status': {
						'description': 'HTTP error code',
						'type': 'integer',
						'format': 'int32',
					},
					'error': {
						'description': 'HTTP error text',
						'type': 'string',
						'maxLength': 140,
					},
					'message': {
						'description': 'HTTP textual reason phrase',
						'type': 'string',
						'maxLength': 140,
					},
					'path': {
						'description': 'Relevant path that was used',
						'type': 'string',
						'maxLength': 140,
					},
				},
				'example': {
					'timestamp': '2018-03-30T16:06:27.499+0000',
					'status': 400,
					'error': 'Bad Request',
					'message': 'Missing request header \'Digest\' for method parameter of type String',
					'path': 'accounts',
				},
			},
			'GenericLink': {
				'description': 'hypertext reference',
				'type': 'object',
				'required': [
					'href',
				],
				'properties': {
					'href': {
						'description': 'URI to be used',
						'type': 'string',
						'maxLength': 140,
					},
					'templated': {
						'description': 'specifies \'true\' if href is a URI template, i.e. with parameters. Otherwise, this property is absent or set to false',
						'type': 'boolean',
					},
				},
				'example': {
					'href': 'accounts/BE57001000000000EUR/balances',
				},
			},
			'PsuContextLinks': {
				'description': 'Links that can be used for further navigation when browsing Account Information at top level\n- self: link to the list of all available accounts\n',
				'type': 'object',
				'readOnly': true,
				'required': [
					'self',
				],
				'properties': {
					'self': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'self': {
						'href': 'accounts',
					},
				},
			},
			'AccountLinks': {
				'description': 'links that can be used for further navigation when browsing Account Information at one account level\n- balances: link to the balances of a given account\n- transactions: link to the transactions of a given account\n',
				'type': 'object',
				'readOnly': true,
				'properties': {
					'balances': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'transactions': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'balances': {
						'href': 'accounts/BE57001000000000EUR/balances',
					},
					'transactions': {
						'href': 'accounts/BE57001000000000EUR/transactions',
					},
				},
			},
			'BalancesLinks': {
				'description': 'links that can be used for further navigation when browsing Account Information at one account level\n- self: link to the balances of a given account\n- parent-list: link to the list of all available accounts\n- transactions: link to the transactions of a given account\n',
				'type': 'object',
				'readOnly': true,
				'required': [
					'self',
				],
				'properties': {
					'self': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'parent-list': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'transactions': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'self': {
						'href': 'accounts/BE57001000000000EUR/balances',
					},
					'parent-list': {
						'href': 'accounts',
					},
					'transactions': {
						'href': 'accounts/BE57001000000000EUR/transactions',
					},
				},
			},
			'TransactionsLinks': {
				'description': 'links that can be used for further navigation when browsing Account Information at one account level\n- self: link to the transactions of a given account\n- parent-list: link to the list of all available accounts\n- balances: link to the balances of a given account\n- next: link to the next page of the transactions result\n- prev: link to the previous page of the transactions result\n',
				'type': 'object',
				'readOnly': true,
				'required': [
					'self',
				],
				'properties': {
					'self': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'parent-list': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'balances': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'next': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'self': {
						'href': 'accounts/BE57001000000000EUR/transactions',
					},
					'parent-list': {
						'href': 'accounts',
					},
					'balances': {
						'href': 'accounts/BE57001000000000EUR/balances',
					},
					'next': {
						'href': 'accounts/BE57001039630135EUR/transactions?index=BKO|20091231|2009-12-31-12.12.12.000012|96|272|272&dateFrom=2009-12-31&dateTo=2009-12-31',
					},
				},
			},
			'PaymentRequestLinks': {
				'description': 'links that can be used for further navigation when having post a Payment Request in order to get the relevant status report.\n',
				'type': 'object',
				'readOnly': true,
				'properties': {
					'self': {
						'$ref': '#/components/schemas/GenericLink',
					},
					'confirmation': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'self': {
						'href': 'v1/payment-requests/paymentReport/MyPmtInfRscId',
					},
					'confirmation': {
						'href': 'v1/payment-requests/paymentReport/MyPmtInfRscId:confirmation',
					},
				},
			},
			'PaymentCoverageReportLinks': {
				'description': 'links that can be used for further navigation to post another coverage request.\n',
				'type': 'object',
				'readOnly': true,
				'required': [
					'self',
				],
				'properties': {
					'self': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'self': {
						'href': 'funds-confirmations',
					},
				},
			},
			'PaymentRequestResourceCreationLinks': {
				'description': 'links that can be used for further navigation, especially in REDIRECT approach \n',
				'type': 'object',
				'readOnly': true,
				'properties': {
					'consentApproval': {
						'$ref': '#/components/schemas/GenericLink',
					},
				},
				'example': {
					'consentApproval': {
						'href': 'https://psd2.aspsp/consent-approval',
					},
				},
			},
			'AppliedAuthenticationApproach': {
				'description': 'The ASPSP, based on the authentication approaches proposed by the PISP, choose the one that it can processed, in respect with the preferences and constraints of the PSU and indicates in this field which approach has been chosen\n',
				'type': 'string',
				'enum': [
					'REDIRECT',
					'DECOUPLED',
					'EMBEDDED',
				],
				'readOnly': true,
				'example': {
					'appliedAuthenticationApproach': 'REDIRECT',
				},
			},
			'GenericIdentification': {
				'description': 'ISO20022: Unique identification of an account, a person or an organisation, as assigned by an issuer.\nAPI: The ASPSP will document which account reference type it will support.\n',
				'type': 'object',
				'required': [
					'identification',
					'schemeName',
				],
				'properties': {
					'identification': {
						'description': 'API: Identifier\n',
						'type': 'string',
						'maxLength': 70,
					},
					'schemeName': {
						'description': 'Name of the identification scheme.\nPossible values for the scheme name, partially based on ISO20022 external code list, are the following: \n- BANK (BankPartyIdentification): Unique and unambiguous assignment made by a specific bank or similar financial institution to identify a relationship as defined between the bank and its client. \n- COID (CountryIdentificationCode) : Country authority given organisation identification (e.g., corporate registration number)\n- SREN (SIREN): The SIREN number is a 9 digit code assigned by INSEE, the French National Institute for Statistics and Economic Studies, to identify an organisation in France.\n- SRET (SIRET): The SIRET number is a 14 digit code assigned by INSEE, the French National Institute for Statistics and Economic Studies, to identify an organisation unit in France. It consists of the SIREN number, followed by a five digit classification number, to identify the local geographical unit of that entity.\n- NIDN (NationalIdentityNumber): Number assigned by an authority to identify the national identity number of a person.\nOther values are also permitted, for instance:\n- OAUT (OAUTH2): OAUTH2 access token that is owned by the PISP being also an AISP and that can be used in order to identify the PSU\n- CPAN (CardPan): Card PAN\n',
						'type': 'string',
						'maxLength': 70,
					},
					'issuer': {
						'description': 'ISO20022: Entity that assigns the identification. this could a country code or any organisation name or identifier that can be recognized by both parties\n',
						'type': 'string',
						'maxLength': 35,
					},
				},
				'example': {
					'identification': '12FR5',
					'schemeName': 'COID',
					'issuer': 'FR',
				},
			},
			'AccountIdentification': {
				'description': 'Unique and unambiguous identification for the account between the account owner and the account servicer. The other possibility is not implemented yet',
				'type': 'object',
				'properties': {
					'iban': {
						'description': 'ISO20022: International Bank Account Number (IBAN) - identification used internationally by financial institutions to uniquely identify the account of a customer. \n\nFurther specifications of the format and content of the IBAN can be found in the standard ISO 13616 \'Banking and related financial services - International Bank Account Number (IBAN)\' version 1997-10-01, or later revisions.\n',
						'type': 'string',
						'pattern': '^[A-Z]{2,2}[0-9]{2,2}[a-zA-Z0-9]{1,30}$',
					},
					'other': {
						'$ref': '#/components/schemas/GenericIdentification',
					},
				},
				'example': {
					'Iban': 'YY64COJH41059545330222956960771321',
				},
			},
			'AmountType': {
				'description': 'ISO20022: structure aiming to carry either an instructed amount or equivalent amount. Both structures embed the amount and the currency to be used.\n\nAPI: only instructed amount can be used\n',
				'type': 'object',
				'required': [
					'currency',
					'amount',
				],
				'properties': {
					'currency': {
						'description': 'Specifies the currency of the amount. A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 \'Codes for the representation of currencies and funds\'. \n',
						'type': 'string',
						'pattern': '^[A-Z]{3,3}$',
					},
					'amount': {
						'description': 'ISO20022: Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party.\n',
						'type': 'string',
						'pattern': '^\\-{0,1}[0-9]{1,13}(\\.[0-9]{0,5}){0,1}$',
					},
				},
				'example': {
					'currency': 'EUR',
					'amount': '12.25',
				},
			},
			'ClearingSystemMemberIdentification': {
				'description': 'ISO20022: Information used to identify a member within a clearing system.\nAPI: to be used for some specific international credit transfers in order to identify the beneficiary bank\n',
				'type': 'object',
				'properties': {
					'clearingSystemId': {
						'description': 'ISO20022: Specification of a pre-agreed offering between clearing agents or the channel through which the payment instruction is processed.\n',
						'type': 'string',
						'maxLength': 35,
					},
					'memberId': {
						'description': 'ISO20022: Identification of a member of a clearing system.\n',
						'type': 'string',
						'maxLength': 35,
					},
				},
				'example': '{\n  \'clearingSystemId\' : \'NZNCC\',\n  \'memberId\' : \'020368\'\n}  \n',
			},
			'FinancialInstitutionIdentification': {
				'description': 'ISO20022: Unique and unambiguous identification of a financial institution, as assigned under an internationally recognised or proprietary identification scheme.\n',
				'type': 'object',
				'required': [
					'bicFi',
				],
				'properties': {
					'bicFi': {
						'description': 'ISO20022: Code allocated to a financial institution by the ISO 9362 Registration Authority as described in ISO 9362 \'Banking - Banking telecommunication messages - Business identification code (BIC)\'.\n',
						'type': 'string',
						'pattern': '^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$',
					},
					'clearingSystemMemberId': {
						'$ref': '#/components/schemas/ClearingSystemMemberIdentification',
					},
					'name': {
						'type': 'string',
						'description': 'Name of the financial institution',
						'maxLength': 140,
					},
					'postalAddress': {
						'$ref': '#/components/schemas/PostalAddress',
					},
				},
				'example': {
					'bicFi': 'BNKAFRPPXXX',
				},
			},
			'PostalAddress': {
				'description': 'ISO20022 : Information that locates and identifies a specific address, as defined by postal services.\n',
				'type': 'object',
				'required': [
					'country',
					'addressLine',
				],
				'properties': {
					'country': {
						'description': 'ISO20022: Country in which a person resides (the place of a person\'s home). In the case of a company, it is the country from which the affairs of that company are directed.\n',
						'type': 'string',
						'pattern': '^([A-Z]{2,2})$',
					},
					'addressLine': {
						'description': 'Unstructured address. The two lines must embed zip code and town name',
						'type': 'array',
						'items': {
							'description': 'Address line',
							'type': 'string',
							'maxItems': 2,
							'maxLength': 70,
						},
					},
				},
				'example': {
					'country': 'FR',
					'addressLine': [
						'18 rue de la DSP2',
						'75008 PARIS',
					],
				},
			},
			'PartyIdentification': {
				'description': 'API : Description of a Party which can be either a person or an organization.\n',
				'type': 'object',
				'required': [
					'name',
				],
				'properties': {
					'name': {
						'description': 'ISO20022: Name by which a party is known and which is usually used to identify that party.\n',
						'type': 'string',
						'maxLength': 140,
					},
					'postalAddress': {
						'$ref': '#/components/schemas/PostalAddress',
					},
					'organisationId': {
						'$ref': '#/components/schemas/GenericIdentification',
					},
					'privateId': {
						'$ref': '#/components/schemas/GenericIdentification',
					},
				},
				'example': {
					'name': 'MyPreferedPisp',
					'postalAddress': {
						'country': 'FR',
						'addressLine': [
							'18 rue de la DSP2',
							'75008 PARIS',
						],
					},
				},
			},
			'ResourceId': {
				'description': 'API: Identifier assigned by the ASPSP for further use of the created resource through API calls\n',
				'type': 'string',
				'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
				'readOnly': true,
			},
			'PaymentIdentification': {
				'description': 'ISO20022: Set of elements used to reference a payment instruction.\n',
				'type': 'object',
				'required': [
					'instructionId',
					'endToEndId',
				],
				'properties': {
					'resourceId': {
						'$ref': '#/components/schemas/ResourceId',
					},
					'instructionId': {
						'description': 'ISO20022: Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction.\n\nAPI: Unique identification shared between the PISP and the ASPSP \n',
						'type': 'string',
						'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
					},
					'endToEndId': {
						'description': 'ISO20022: Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain.\n\nAPI: Unique identification shared between the merchant and the PSU\n',
						'type': 'string',
						'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
					},
				},
				'example': {
					'resourceId': 'MyInstrRscId',
					'instructionId': 'MyInstrId',
					'endToEndId': 'MyEndToEndId',
				},
			},
			'PriorityCode': {
				'description': 'ISO20022: Indicator of the urgency or order of importance that the instructing party would like the instructed party to apply to the processing of the instruction.\n',
				'type': 'string',
				'enum': [
					'HIGH',
					'NORM',
				],
			},
			'CategoryPurposeCode': {
				'description': 'ISO20022: Specifies the high level purpose of the instruction based on a set of pre-defined categories. This is used by the initiating party to provide information concerning the processing of the payment. It is likely to trigger special processing by any of the agents involved in the payment chain.\nAPI: The following values are allowed:\n  - CASH (CashManagementTransfer): Transaction is a general cash management instruction.\n  - DVPM (DeliverAgainstPayment): Code used to pre-advise the account servicer of a forthcoming deliver against payment instruction.  \n',
				'type': 'string',
				'enum': [
					'CASH',
					'DVPM',
				],
			},
			'ServiceLevelCode': {
				'description': 'ISO20022: Agreement under which or rules under which the transaction should be processed. Specifies a pre-agreed service or level of service between the parties, as published in an external service level code list.\nAPI: Only \'SEPA\' (SEPA Credit Transfer) or \'NURG\' (Other Credit Transfer) values are allowed\n',
				'type': 'string',
				'enum': [
					'NURG',
					'SEPA',
				],
			},
			'LocalInstrumentCode': {
				'description': 'ISO20022: User community specific instrument. \nUsage: This element is used to specify a local instrument, local clearing option and/or further qualify the service or service level.\nAPI: Only \'INST\' value is allowed in order to ask for an SEPA instant Payment. Can only be used if ServiceLevel is equal to \'SEPA\'\n',
				'type': 'string',
				'enum': [
					'INST',
				],
			},
			'PaymentTypeInformation': {
				'description': 'ISO20022: Set of elements used to further specify the type of transaction.\n',
				'type': 'object',
				'required': [
					'serviceLevel',
				],
				'properties': {
					'instructionPriority': {
						'$ref': '#/components/schemas/PriorityCode',
					},
					'serviceLevel': {
						'$ref': '#/components/schemas/ServiceLevelCode',
					},
					'localInstrument': {
						'$ref': '#/components/schemas/LocalInstrumentCode',
					},
					'categoryPurpose': {
						'$ref': '#/components/schemas/CategoryPurposeCode',
					},
				},
				'example': {
					'instructionPriority': 'HIGH',
					'serviceLevel': 'SEPA',
					'localInstrument': 'INST',
					'categoryPurpose': 'DVPM',
				},
			},
			'PurposeCode': {
				'description': 'ISO20022: Underlying reason for the payment transaction, as published in an external purpose code list.    \nAPI: The following values are allowed for Payment  Request\n  - ACCT (Funds moved between 2 accounts of same account holder at the same bank) \n  - CASH (general cash management instruction) may be used for Transfer Initiation\n  - COMC Transaction is related to a payment of commercial credit or debit.\n  - CPKC General Carpark Charges Transaction is related to carpark charges.\n  - TRPT Transport RoadPricing Transaction is for the payment to top-up pre-paid card and electronic road pricing for the purpose of transportation\n',
				'type': 'string',
				'enum': [
					'ACCT',
					'CASH',
					'COMC',
					'CPKC',
					'TRPT',
				],
			},
			'ChargeBearerCode': {
				'description': 'ISO20022: Specifies which party/parties will bear the charges associated with the processing of the payment transaction.    \nAPI: The following values are allowed for Payment  Request\n  - SLEV:  Charges are to be applied following the rules agreed in the service level and/or scheme.\n',
				'type': 'string',
				'enum': [
					'SLEV',
				],
			},
			'UnstructuredRemittanceInformation': {
				'description': 'ISO20022: Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts\' receivable system.\nAPI: Only one occurrence is allowed\n',
				'type': 'array',
				'items': {
					'type': 'string',
					'description': 'Relevant information to the transaction',
					'title': 'remittanceLine',
					'maxLength': 140,
				},
			},
			'PaymentInformationStatusCode': {
				'description': 'ISO20022: Specifies the status of the payment information.\nAPI: Mandatory. The following values are allowed to provide the status of the Payment Request \n  - ACCP (AcceptedCustomerProfile): Preceding check of technical validation was successful. Customer profile check was also successful. \n  - ACSC (AcceptedSettlementCompleted): Settlement on the debtor\'s account has been completed.\n  - ACSP (AcceptedSettlementInProcess): All preceding checks such as technical validation and customer profile were successful. Dynamic risk assessment is now also successful and therefore the Payment Request has been accepted for execution.\n  - ACTC (AcceptedTechnicalValidation): Authentication and syntactical and semantical validation are successful.\n  - ACWC (AcceptedWithChange): Instruction is accepted but a change will be made, such as date or remittance not sent. \n  - ACWP (AcceptedWithoutPosting): Payment instruction included in the credit transfer is accepted without being posted to the creditor customer\'s account.\n  - PART (PartiallyAccepted): A number of transactions have been accepted, whereas another number of transactions have not yet achieved \'accepted\' status. \n  - RCVD (Received): Payment initiation has been received by the receiving agent.\n  - PDNG (Pending): Payment request or individual transaction included in the Payment Request is pending. Further checks and status update will be performed.\n  - RJCT (Rejected): Payment request  has been rejected.\n  \n',
				'type': 'string',
				'enum': [
					'ACCP',
					'ACSC',
					'ACSP',
					'ACTC',
					'ACWC',
					'ACWP',
					'PART',
					'RCVD',
					'PDNG',
					'RJCT',
				],
			},
			'TransactionIndividualStatusCode': {
				'description': 'ISO20022: Specifies the status of the payment information group.\n\nAPI: Only the following values are allowed to provide the status of the subsequent CREDIT TRANSFER to the Payment Request\n- RJCT: Payment request or individual transaction included in the Payment Request has been rejected.\n- PDNG: (Pending): Payment request or individual transaction included in the Payment Request is pending. Further checks and status update will be performed.\n- ACSP: All preceding checks such as technical validation and customer profile were successful and therefore the Payment Request has been accepted for execution.\n- ACSC: Settlement on the debtor\'s account has been completed\n',
				'type': 'string',
				'enum': [
					'RJCT',
					'PDNG',
					'ACSP',
					'ACSC',
				],
			},
			'StatusReasonInformation': {
				'description': 'ISO20022: Provides detailed information on the status reason.\n\nAPI: Can only be used in status equal to \'RJCT\'. Only the following values are allowed:\n- AC01 (IncorectAccountNumber): the account number is either invalid or does not exist\n- AC04 (ClosedAccountNumber): the account is closed and cannot be used\n- AC06 (BlockedAccount): the account is blocked and cannot be used\n- AG01 (Transaction forbidden): Transaction forbidden on this type of account\n- AM18 (InvalidNumberOfTransactions): the number of transactions exceeds the ASPSP acceptance limit\n- CH03 (RequestedExecutionDateOrRequestedCollectionDateTooFarInFuture): The requested execution date is too far in the future\n- CUST (RequestedByCustomer): The reject is due to the debtor: refusal or lack of liquidity\n- DS02 (OrderCancelled): An authorized user has cancelled the order\n- FF01 (InvalidFileFormat): The reject is due to the original Payment Request which is invalid (syntax, structure or values)\n- FRAD (FraudulentOriginated): the Payment Request is considered as fraudulent\n- MS03 (NotSpecifiedReasonAgentGenerated): No reason specified by the ASPSP\n- NOAS (NoAnswerFromCustomer): The PSU has neither accepted nor rejected the Payment Request and a time-out has occurred\n- RR01 (MissingDebtorAccountOrIdentification): The Debtor account and/or Identification are missing or inconsistent \n- RR03 (MissingCreditorNameOrAddress): Specification of the creditor\'s name and/or address needed for regulatory requirements is insufficient or missing.\n- RR04 (RegulatoryReason): Reject from regulatory reason\n- RR12 (InvalidPartyID): Invalid or missing identification required within a particular country or payment type.\n \n',
				'type': 'string',
				'enum': [
					'AC01',
					'AC04',
					'AC06',
					'AG01',
					'CH03',
					'CUST',
					'DS02',
					'FF01',
					'FRAD',
					'MS03',
					'NOAS',
					'RR01',
					'RR03',
					'RR04',
					'RR12',
				],
			},
			'RegulatoryReportingCode': {
				'description': 'Information needed due to regulatory and statutory requirements. \nEconomical codes to be used are provided by the National Competent Authority\n',
				'type': 'string',
				'maxLength': 10,
			},
			'RegulatoryReportingCodes': {
				'description': 'List of needed regulatory reporting codes for international payments\n',
				'type': 'array',
				'items': {
					'$ref': '#/components/schemas/RegulatoryReportingCode',
				},
				'minItems': 1,
				'maxItems': 10,
			},
			'RequestedExecutionDate': {
				'description': 'ISO20022: Date at which the initiating party requests the clearing agent to process the payment.\nAPI:  \nThis date can be used in the following cases:\n- the single requested execution date for a payment having several instructions. In this case, this field must be set at the payment level. \n- the requested execution date for a given instruction within a payment. In this case, this field must be set at each instruction level. \n- The first date of execution for a standing order.\nWhen the payment cannot be processed at this date, the ASPSP is allowed to shift the applied execution date to the next possible execution date for non-standing orders.\nFor standing orders, the [executionRule] parameter helps to compute the execution date to be applied.\n',
				'type': 'string',
				'format': 'date-time',
			},
			'EndDate': {
				'description': 'The last applicable day of execution for a given standing order.\nIf not given, the standing order is considered as endless.\n',
				'type': 'string',
				'format': 'date-time',
			},
			'ExecutionRule': {
				'description': 'Execution date shifting rule for standing orders\nThis data attribute defines the behaviour when recurring payment dates falls on a weekend or bank holiday. \nThe payment is then executed either the \'preceding\' or \'following\' working day.\nASPSP might reject the request due to the communicated value, if rules in Online-Banking are not supporting \nthis execution rule.\n- FWNG: following\n- PREC: preceding\n',
				'type': 'string',
				'enum': [
					'FWNG',
					'PREC',
				],
			},
			'FrequencyCode': {
				'description': 'Frequency rule for standing orders.\nThe following codes from the \'EventFrequency7Code\' of ISO 20022 are supported.\n- DAIL: Daily\n- WEEK: Weekly\n- TOWK: EveryTwoWeeks\n- MNTH: Monthly\n- TOMN: EveryTwoMonths\n- QUTR: Quarterly\n- SEMI: SemiAnnual\n- YEAR: Annual\nHowever, each ASPSP might restrict these values into a subset if needed. \n',
				'type': 'string',
				'enum': [
					'DAIL',
					'WEEK',
					'TOWK',
					'MNTH',
					'TOMN',
					'QUTR',
					'SEMI',
					'YEAR',
				],
			},
			'CreditTransferTransaction': {
				'description': 'ISO20022: Payment processes required to transfer cash from the debtor to the creditor.\nAPI: \n',
				'type': 'object',
				'required': [
					'paymentId',
					'instructedAmount',
					'remittanceInformation',
				],
				'properties': {
					'paymentId': {
						'$ref': '#/components/schemas/PaymentIdentification',
					},
					'requestedExecutionDate': {
						'$ref': '#/components/schemas/RequestedExecutionDate',
					},
					'endDate': {
						'$ref': '#/components/schemas/EndDate',
					},
					'executionRule': {
						'$ref': '#/components/schemas/ExecutionRule',
					},
					'frequency': {
						'$ref': '#/components/schemas/FrequencyCode',
					},
					'instructedAmount': {
						'$ref': '#/components/schemas/AmountType',
					},
					'beneficiary': {
						'$ref': '#/components/schemas/Beneficiary',
					},
					'ultimateCreditor': {
						'$ref': '#/components/schemas/PartyIdentification',
					},
					'regulatoryReportingCodes': {
						'$ref': '#/components/schemas/RegulatoryReportingCodes',
					},
					'remittanceInformation': {
						'$ref': '#/components/schemas/UnstructuredRemittanceInformation',
					},
					'transactionStatus': {
						'$ref': '#/components/schemas/TransactionIndividualStatusCode',
					},
					'statusReasonInformation': {
						'$ref': '#/components/schemas/StatusReasonInformation',
					},
				},
				'example': {
					'paymentIdentification': {
						'resourceId': 'MyInstrRscId',
						'instructionIdentification': 'MyInstrId',
						'endToEndIdentification': 'MyEndToEndId',
					},
					'requestedExecutionDate': '2016-12-31T00:00:00.000+01:00',
					'instructedAmount': {
						'currency': 'EUR',
						'amount': '124.35',
					},
					'remittanceInformation': [
						'MyRemittanceInformation',
					],
				},
			},
			'SupplementaryData': {
				'description': 'ISO20022: Additional information that cannot be captured in the structured elements and/or any other specific block.\n\nAPI: This structure is used to embed the relevant URLs for returning the status report to the PISP and to specify which authentication approaches are accepted by the PISP and which has been chosen by the ASPSP\n',
				'type': 'object',
				'properties': {
					'acceptedAuthenticationApproach': {
						'description': 'can only be set by the PISP\nauthentication approaches that are supported by the PISP. The PISP can provide several choices separated by commas. \nREDIRECT: the PSU is redirected by the TPP to the ASPSP which processes identification and authentication\nDECOUPLED: the TPP identifies the PSU and forwards the identification to the ASPSP which processes the authentication through a decoupled device\nEMBEDDED: the TPP identifies the PSU and forwards the identification to the ASPSP which starts the authentication. The TPP forwards one authentication factor of the PSU (e.g. OTP or response to a challenge)  \n',
						'type': 'array',
						'items': {
							'type': 'string',
							'description': 'combination of possible values for authentication approaches',
							'enum': [
								'REDIRECT',
								'DECOUPLED',
								'EMBEDDED',
							],
						},
					},
					'appliedAuthenticationApproach': {
						'$ref': '#/components/schemas/AppliedAuthenticationApproach',
					},
					'scaHint': {
						'description': 'can only be set by the PISP\nHint given by the merchant and/or the PISP about an SCA exemption context\n',
						'type': 'string',
						'enum': [
							'noScaExemption',
							'scaExemption',
						],
					},
					'successfulReportUrl': {
						'description': 'URL to be used by the ASPSP in order to notify the PISP of the finalisation of the authentication and consent process in REDIRECT and DECOUPLED approach\n',
						'type': 'string',
					},
					'unsuccessfulReportUrl': {
						'description': 'URL to be used by the ASPSP in order to notify the PISP of the failure of the authentication and consent process in REDIRECT and DECOUPLED approach \nIf this URL is not provided by the PISP, the ASPSP will use the \'successfulReportUrl\' even in case of failure of the Payment Request processing\n',
						'type': 'string',
					},
				},
				'example': {
					'successfulReportUrl': 'http://myPisp/PaymentSuccess',
					'unsuccessfulReportUrl': 'http://myPisp/PaymentFailure',
				},
			},
			'BalanceStatus': {
				'description': 'Type of balance\n- CLBD: (ISO20022 ClosingBooked) Accounting Balance\n- XPCD: (ISO20022 Expected) Instant Balance\n- VALU: Value-date balance\n- OTHR: Other Balance\n',
				'type': 'string',
				'enum': [
					'CLBD',
					'XPCD',
					'VALU',
					'OTHR',
				],
			},
			'TransactionStatus': {
				'description': 'Type of Transaction\n- BOOK: (ISO20022 ClosingBooked) Accounted transaction\n- PDNG: (ISO20022 Expected) Instant Balance Transaction\n- OTHR: Other \n',
				'type': 'string',
				'enum': [
					'BOOK',
					'PDNG',
					'OTHR',
				],
			},
			'Transaction': {
				'description': 'structure of a transaction',
				'type': 'object',
				'required': [
					'transactionAmount',
					'status',
					'creditDebitIndicator',
					'bookingDate',
					'remittanceInformation',
				],
				'properties': {
					'resourceId': {
						'$ref': '#/components/schemas/ResourceId',
					},
					'entryReference': {
						'type': 'string',
						'description': 'Technical incremental identification of the transaction.\n',
						'maxLength': 40,
					},
					'transactionAmount': {
						'$ref': '#/components/schemas/AmountType',
					},
					'creditDebitIndicator': {
						'description': 'Accounting flow of the transaction\n- CRDT: Credit type transaction\n- DBIT: Debit type transaction\n',
						'type': 'string',
						'enum': [
							'CRDT',
							'DBIT',
						],
					},
					'status': {
						'$ref': '#/components/schemas/TransactionStatus',
					},
					'bookingDate': {
						'description': 'Booking date of the transaction on the account',
						'type': 'string',
						'format': 'date',
					},
					'valueDate': {
						'description': 'Value date of the transaction on the account',
						'type': 'string',
						'format': 'date',
					},
					'transactionDate': {
						'description': 'Date used for specific purposes: \n- for card transaction: date of the transaction\n- for credit transfer: acquiring date of the transaction\n- for direct debit: receiving date of the transaction\n',
						'type': 'string',
						'format': 'date',
					},
					'remittanceInformation': {
						'$ref': '#/components/schemas/UnstructuredRemittanceInformation',
					},
				},
				'example': {
					'resourceId': 'BE57001000000000EUR',
					'entryReference': 2.0190227201902272e+27,
					'transactionAmount': {
						'currency': 'EUR',
						'amount': '-12.25',
					},
					'creditDebitIndicator': 'DBIT',
					'status': 'BOOK',
					'bookingDate': '2019-02-27',
					'valueDate': '2019-02-28',
					'transactionDate': '2019-02-27T00:00:00.000Z',
					'remittanceInformation': [
						'PQ-FT-PO-API003',
					],
				},
			},
			'AccountResource': {
				'description': 'PSU account that is made available to the TPP\n',
				'type': 'object',
				'required': [
					'name',
					'cashAccountType',
					'currency',
					'_links',
				],
				'properties': {
					'resourceId': {
						'$ref': '#/components/schemas/ResourceId',
					},
					'bicFi': {
						'description': 'ISO20022: Code allocated to a financial institution by the ISO 9362 Registration Authority as described in ISO 9362 \'Banking - Banking telecommunication messages - Business identification code (BIC)\'.\n',
						'type': 'string',
						'pattern': '^[A-Z]{6,6}[A-Z2-9][A-NP-Z0-9]([A-Z0-9]{3,3}){0,1}$',
					},
					'accountId': {
						'$ref': '#/components/schemas/AccountIdentification',
					},
					'name': {
						'description': 'Label of the PSU account\nIn case of a delayed debit card transaction set, the name shall specify the holder name and the imputation date\n',
						'type': 'string',
						'maxLength': 70,
					},
					'details': {
						'description': 'Specifications that might be provided by the ASPSP\n- characteristics of the account\n- characteristics of the relevant card\nNot applicable\n',
						'type': 'string',
						'maxLength': 140,
					},
					'linkedAccount': {
						'description': 'Case of a set of pending card transactions, the APSP will provide the relevant cash account the card is set up on. Not applicable',
						'type': 'string',
						'maxLength': 70,
					},
					'usage': {
						'description': 'Specifies the usage of the account\n- PRIV: private personal account\n- ORGA: professional account\n',
						'type': 'string',
						'enum': [
							'PRIV',
							'ORGA',
						],
					},
					'cashAccountType': {
						'description': 'Specifies the type of the account\n- CACC: Cash account\n- CARD: List of card based transactions\n',
						'type': 'string',
						'enum': [
							'CACC',
							'CARD',
						],
					},
					'product': {
						'description': 'Product Name of the Bank for this account, proprietary definition\n',
						'type': 'string',
						'maxLength': 35,
					},
					'currency': {
						'description': 'Currency used for the account',
						'type': 'string',
						'maxLength': 3,
					},
					'balances': {
						'description': 'list of balances provided by the ASPSP. Not appicable',
						'type': 'array',
						'items': {
							'$ref': '#/components/schemas/BalanceResource',
						},
						'minItems': 1,
					},
					'psuStatus': {
						'description': 'Relationship between the PSU and the account - Account Holder - Co-account Holder - Attorney',
						'type': 'string',
						'maxLength': 35,
					},
					'_links': {
						'$ref': '#/components/schemas/AccountLinks',
					},
				},
				'example': {
					'resourceId': 'BE57001000000000EUR',
					'bicFi': 'BNKAFRPPXXX',
					'name': 'NTONGXYZ VICAS',
					'usage': 'PRIV',
					'cashAccountType': 'CACC',
					'currency': 'EUR',
					'psuStatus': 'Co-account Holder',
					'_links': {
						'balances': {
							'href': 'accounts/BE57001000000000EUR/balances',
						},
						'transactions': {
							'href': 'accounts/BE57001000000000EUR/transactions',
						},
					},
				},
			},
			'BalanceResource': {
				'description': 'Structure of an account balance',
				'type': 'object',
				'required': [
					'name',
					'balanceAmount',
					'balanceType',
				],
				'properties': {
					'name': {
						'description': 'Label of the balance',
						'type': 'string',
						'maxLength': 70,
					},
					'balanceAmount': {
						'$ref': '#/components/schemas/AmountType',
					},
					'balanceType': {
						'$ref': '#/components/schemas/BalanceStatus',
					},
					'lastChangeDateTime': {
						'description': 'Timestamp of the last change of the balance amount. Not applicable',
						'type': 'string',
						'format': 'date-time',
					},
					'referenceDate': {
						'description': 'Reference date for the balance',
						'type': 'string',
						'format': 'date',
					},
					'lastCommittedTransaction': {
						'description': 'Identification of the last committed transaction. This is actually useful for instant balance. Not applicable\n',
						'type': 'string',
						'maxLength': 40,
					},
				},
				'example': {
					'name': 'Closing balance',
					'balanceAmount': {
						'currency': 'EUR',
						'amount': '958.440',
					},
					'balanceType': 'CLBD',
					'referenceDate': '2019-04-02T00:00:00.000Z',
				},
			},
			'ConfirmationResource': {
				'description': 'Confirmation request resource',
				'type': 'object',
				'properties': {
					'psuAuthenticationFactor': {
						'type': 'string',
						'description': 'authentication factor forwarded by the TPP to the ASPSP in order to fulfil the strong customer authentication process',
					},
				},
				'example': {
					'psuAuthenticationFactor': 'JJKJKJ788GKJKJBK',
				},
			},
			'PaymentInformationId': {
				'description': 'ISO20022 : Reference assigned by a sending party to unambiguously identify the payment information block within the message.\n',
				'type': 'string',
				'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
			},
			'CreationDateTime': {
				'description': 'ISO20022: Date and time at which a (group of) payment instruction(s) was created by the instructing party.\n',
				'type': 'string',
				'format': 'date-time',
			},
			'FundsAvailabilityInformation': {
				'description': 'indicator that the payment can be covered or not by the funds available on the relevant account\n- true: payment is covered\n- false: payment is not covered\n',
				'type': 'boolean',
				'readOnly': true,
			},
			'BookingInformation': {
				'description': 'indicator that the payment can be immediately booked or not\n- true: payment is booked\n- false: payment is not booked\n',
				'type': 'boolean',
				'readOnly': true,
			},
			'PaymentRequestResource': {
				'description': 'ISO20022: The PaymentRequestResource message is sent by the Creditor sending party to the Debtor receiving party, directly or through agents. It is used by a Creditor to request movement of funds from the debtor account to a creditor.\nAPI: \nInformation about the creditor (Id, account and agent) might be placed either at payment level or at instruction level. Thus multi-beneficiary payments can be handled.\nThe requested execution date can be placed either at payment level when all instructions are requested to be executed at the same date or at instruction level.\nThe latest case includes:\n- multiple instructions having different requested execution dates\n- standing orders settings \n',
				'type': 'object',
				'required': [
					'paymentInformationId',
					'creationDateTime',
					'numberOfTransactions',
					'initiatingParty',
					'paymentTypeInformation',
					'creditTransferTransaction',
					'supplementaryData',
				],
				'properties': {
					'resourceId': {
						'$ref': '#/components/schemas/ResourceId',
					},
					'paymentInformationId': {
						'$ref': '#/components/schemas/PaymentInformationId',
					},
					'creationDateTime': {
						'$ref': '#/components/schemas/CreationDateTime',
					},
					'numberOfTransactions': {
						'description': 'ISO20022: Number of individual transactions contained in the message.\nAPI: Each ASPSP will specify a maximum value for this field taking into accounts its specificities about payment request handling\n',
						'type': 'integer',
						'minimum': 1,
					},
					'initiatingParty': {
						'$ref': '#/components/schemas/PartyIdentification',
					},
					'paymentTypeInformation': {
						'$ref': '#/components/schemas/PaymentTypeInformation',
					},
					'debtor': {
						'$ref': '#/components/schemas/PartyIdentification',
					},
					'debtorAccount': {
						'$ref': '#/components/schemas/AccountIdentification',
					},
					'debtorAgent': {
						'$ref': '#/components/schemas/FinancialInstitutionIdentification',
					},
					'beneficiary': {
						'$ref': '#/components/schemas/Beneficiary',
					},
					'ultimateCreditor': {
						'$ref': '#/components/schemas/PartyIdentification',
					},
					'purpose': {
						'$ref': '#/components/schemas/PurposeCode',
					},
					'chargeBearer': {
						'$ref': '#/components/schemas/ChargeBearerCode',
					},
					'paymentInformationStatus': {
						'$ref': '#/components/schemas/PaymentInformationStatusCode',
					},
					'statusReasonInformation': {
						'$ref': '#/components/schemas/StatusReasonInformation',
					},
					'fundsAvailability': {
						'$ref': '#/components/schemas/FundsAvailabilityInformation',
					},
					'booking': {
						'$ref': '#/components/schemas/BookingInformation',
					},
					'requestedExecutionDate': {
						'description': 'ISO20022: Date at which the initiating party requests the clearing agent to process the payment. \n',
						'type': 'string',
						'format': 'date-time',
					},
					'creditTransferTransaction': {
						'description': 'ISO20022: Payment processes required to transfer cash from the debtor to the creditor.\nAPI: Each ASPSP will specify a maxItems value for this field taking into accounts its specificities about payment request handling\n',
						'type': 'array',
						'minItems': 1,
						'items': {
							'$ref': '#/components/schemas/CreditTransferTransaction',
						},
					},
					'supplementaryData': {
						'$ref': '#/components/schemas/SupplementaryData',
					},
				},
				'example': {
					'paymentInformationId': 'MyPmtInfId',
					'creationDateTime': '2018-03-31T13:25:22.527+02:00',
					'numberOfTransactions': 1,
					'initiatingParty': {
						'name': 'MyPreferedPisp',
						'postalAddress': {
							'country': 'FR',
							'addressLine': [
								'18 rue de la DSP2',
								'75008 PARIS',
							],
						},
						'organisationId': {
							'identification': '12FR5',
							'schemeName': 'COID',
							'issuer': 'ACPR',
						},
					},
					'paymentTypeInformation': {
						'serviceLevel': 'SEPA',
						'localInstrument': 'INST',
						'categoryPurpose': 'DVPM',
					},
					'debtor': {
						'name': 'MyCustomer',
						'postalAddress': {
							'country': 'FR',
							'addressLine': [
								'18 rue de la DSP2',
								'75008 PARIS',
							],
						},
						'privateId': {
							'identification': 'FD37G',
							'schemeName': 'BANK',
							'issuer': 'BICXYYTTZZZ',
						},
					},
					'creditor': {
						'name': 'myMerchant',
						'postalAddress': {
							'country': 'FR',
							'addressLine': [
								'18 rue de la DSP2',
								'75008 PARIS',
							],
						},
						'organisationId': {
							'identification': '852126789',
							'schemeName': 'SIREN',
							'issuer': 'FR',
						},
					},
					'creditorAccount': {
						'iban': 'YY64COJH41059545330222956960771321',
					},
					'ultimateCreditor': {
						'name': 'myPreferedUltimateMerchant',
						'postalAddress': {
							'country': 'FR',
							'addressLine': [
								'18 rue de la DSP2',
								'75008 PARIS',
							],
						},
						'organisationId': {
							'identification': '85212678900025',
							'schemeName': 'SIRET',
							'issuer': 'FR',
						},
					},
					'purpose': 'COMC',
					'chargeBearer': 'SLEV',
					'creditTransferTransaction': [
						{
							'paymentId': {
								'instructionId': 'MyInstrId',
								'endToEndId': 'MyEndToEndId',
							},
							'requestedExecutionDate': '2016-12-31T00:00:00.000+01:00',
							'instructedAmount': {
								'currency': 'EUR',
								'amount': '124.35',
							},
							'remittanceInformation': [
								'MyRemittanceInformation',
							],
						},
					],
					'supplementaryData': {
						'acceptedAuthenticationApproach': [
							'REDIRECT',
							'DECOUPLED',
						],
						'successfulReportUrl': 'http://myPisp/PaymentSuccess',
						'unsuccessfulReportUrl': 'http://myPisp/PaymentFailure',
					},
				},
			},
			'PaymentCoverageRequestResource': {
				'description': 'Payment coverage request structure. The request must rely either on a cash account or a payment card.',
				'type': 'object',
				'required': [
					'paymentCoverageRequestId',
					'instructedAmount',
					'accountId',
				],
				'properties': {
					'paymentCoverageRequestId': {
						'description': 'Identification of the payment Coverage Request',
						'type': 'string',
						'maxLength': 35,
					},
					'payee': {
						'description': 'The merchant where the card is accepted as information to the PSU.',
						'type': 'string',
						'maxLength': 70,
					},
					'instructedAmount': {
						'$ref': '#/components/schemas/AmountType',
					},
					'accountId': {
						'$ref': '#/components/schemas/AccountIdentification',
					},
				},
				'example': {
					'paymentCoverageRequestId': 'MyCoverage123456',
					'instructedAmount': {
						'currency': 'EUR',
						'amount': '12345',
					},
					'accountId': {
						'iban': 'YY13RDHN98392489481620896668799742',
					},
				},
			},
			'HalAccounts': {
				'description': 'HYPERMEDIA structure used for returning the list of the available accounts to the AISP',
				'type': 'object',
				'required': [
					'accounts',
					'_links',
				],
				'properties': {
					'connectedPsu': {
						'description': 'Last name and first name that has granted access to the AISP on the accounts data\nThis information can be retrieved based on the PSU\'s authentication that occurred during the OAUTH2 access token initialisation.\nNot applicable\n',
						'type': 'string',
						'maxLength': 70,
					},
					'accounts': {
						'description': 'List of PSU account that are made available to the TPP\n',
						'type': 'array',
						'items': {
							'$ref': '#/components/schemas/AccountResource',
						},
					},
					'_links': {
						'$ref': '#/components/schemas/PsuContextLinks',
					},
				},
			},
			'HalBalances': {
				'description': 'HYPERMEDIA structure used for returning the list of the relevant balances for a given account to the AISP',
				'type': 'object',
				'required': [
					'balances',
					'_links',
				],
				'properties': {
					'balances': {
						'description': 'List of account balances',
						'type': 'array',
						'items': {
							'$ref': '#/components/schemas/BalanceResource',
						},
						'minItems': 1,
					},
					'_links': {
						'$ref': '#/components/schemas/BalancesLinks',
					},
				},
			},
			'HalTransactions': {
				'description': 'HYPERMEDIA structure used for returning the list of the transactions for a given account to the AISP',
				'type': 'object',
				'required': [
					'transactions',
					'_links',
				],
				'properties': {
					'transactions': {
						'description': 'List of transactions',
						'type': 'array',
						'items': {
							'$ref': '#/components/schemas/Transaction',
						},
					},
					'_links': {
						'$ref': '#/components/schemas/TransactionsLinks',
					},
				},
			},
			'HalPaymentRequest': {
				'description': 'HYPERMEDIA structure used for returning the original Payment Request to the PISP',
				'type': 'object',
				'required': [
					'paymentRequest',
					'_links',
				],
				'properties': {
					'paymentRequest': {
						'$ref': '#/components/schemas/PaymentRequestResource',
					},
					'_links': {
						'$ref': '#/components/schemas/PaymentRequestLinks',
					},
				},
			},
			'HalPaymentRequestCreation': {
				'description': 'data forwarded by the ASPSP top the PISP after creation of the Payment Request resource creation\n',
				'type': 'object',
				'properties': {
					'appliedAuthenticationApproach': {
						'$ref': '#/components/schemas/AppliedAuthenticationApproach',
					},
					'_links': {
						'$ref': '#/components/schemas/PaymentRequestResourceCreationLinks',
					},
				},
			},
			'HalPaymentCoverageReport': {
				'description': 'HYPERMEDIA structure used for returning the payment coverage report to the PIISP',
				'type': 'object',
				'required': [
					'request',
					'result',
					'_links',
				],
				'properties': {
					'request': {
						'$ref': '#/components/schemas/PaymentCoverageRequestResource',
					},
					'result': {
						'description': 'Result of the coverage check :\n- true: the payment can be covered\n- false: the payment cannot be covered\n',
						'type': 'boolean',
					},
					'_links': {
						'$ref': '#/components/schemas/PaymentCoverageReportLinks',
					},
				},
			},
			'Beneficiary': {
				'description': 'Specification of a beneficiary',
				'type': 'object',
				'required': [
					'creditor',
				],
				'properties': {
					'id': {
						'type': 'string',
						'description': 'Id of the beneficiary',
						'pattern': '^([a-zA-Z0-9 /\\-?:\\()\\.,\']{1,35})$',
					},
					'isTrusted': {
						'description': 'The ASPSP having not implemented the trusted beneficiaries list must not set this flag.\nOtherwise, the ASPSP indicates whether or not the beneficiary has been registered by the PSU within the trusted beneficiaries list.\n- true: the beneficiary is actually a trusted beneficiary (when set by ASPSP)\n- false: the beneficiary is not a trusted beneficiary         \nThe PISP may set this flag to \'true\' to indicate that the PSU considers the beneficiary as trusted and to be inserted within the trusted beneficiaries list, as far as this feature was implemented by the ASPSP.  \n- true: the beneficiary should be registered as a trusted beneficiary (when set by PISP)\n',
						'type': 'boolean',
					},
					'creditorAgent': {
						'$ref': '#/components/schemas/FinancialInstitutionIdentification',
					},
					'creditor': {
						'$ref': '#/components/schemas/PartyIdentification',
					},
					'creditorAccount': {
						'$ref': '#/components/schemas/AccountIdentification',
					},
				},
			},
			'AccessibleAccounts': {
				'description': 'List of accessible accounts for one given functionality',
				'type': 'array',
				'items': {
					'$ref': '#/components/schemas/AccountIdentification',
				},
			},
			'Access': {
				'description': 'Requested access services.',
				'type': 'object',
				'required': [
					'balances',
					'transactions',
					'trustedBeneficiaries',
					'psuIdentity',
				],
				'properties': {
					'balances': {
						'$ref': '#/components/schemas/AccessibleAccounts',
					},
					'transactions': {
						'$ref': '#/components/schemas/AccessibleAccounts',
					},
					'trustedBeneficiaries': {
						'description': 'Indicator that access to the trusted beneficiaries list was granted or not to the AISP by the PSU\n- true: the access was granted\n- false: the access was not granted\n',
						'type': 'boolean',
					},
					'psuIdentity': {
						'description': 'Indicator that access to the PSU identity, first name and last name, was granted or not to the AISP by the PSU\n- true: the access was granted\n- false: the access was not granted\n',
						'type': 'boolean',
					},
				},
			},
		},
	},
}

/**
 * Get the brand id based on the product brand match
 * @param {Array<Object>} brands Array of brands
 * @param {Object} product The product data
 * @returns {Number} The brand id
 */
const getBrandId = (brands, product) => {
	let b = brands.find((brand) => {
		return product.longname.indexOf(brand.name) > -1
	})
	return b ? b.id || 1 : 1
}

exports.up = function (knex, Promise) {
	return knex.transaction((trx) => {
		return knex.select('id', 'name').from('brand').then((brands) => {
			return Promise.map(productPIISPData, (product) => {
				return trx('product').insert({
					name: product.name,
					longname: product.longname,
					intro: product.intro,
					description: product.description,
					image: product.image,
					role: 'piisp',
					brand_id: getBrandId(brands, product),
					version: product.version,
					created_at: knex.fn.now(),
					updated_at: knex.fn.now(),
				}).then((id) => {
					return Promise.map(product.usecases, (usecase) => {
						return trx('product_usecase').insert({
							title: usecase.title,
							description: usecase.description,
							product_id: id,
							created_at: knex.fn.now(),
							updated_at: knex.fn.now(),
						})
					}).then(() => {
						return Promise.map(product.features, (feature) => {
							return trx('product_feature').insert({
								title: feature.title,
								description: feature.description,
								product_id: id,
								created_at: knex.fn.now(),
								updated_at: knex.fn.now(),
							})
						})
					}).then(() => {
						return trx('api_docs').insert([
							{
								title: piispJson.info.title,
								role: 'piisp',
								version: '1.4.0.47',
								swagger: JSON.stringify(piispJson),
								product_id: id,
								access_scope: 'public',
								sandbox: true,
								created_at: knex.fn.now(),
								updated_at: knex.fn.now(),
							},
						])
					})
				})
			})
		})
	})
}

exports.down = function () {
	// do nothing
}
