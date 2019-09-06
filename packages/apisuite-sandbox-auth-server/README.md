# openbank-sandbox-auth-server

- [Installation](#Installation)
	- [Pre-requisites](#Pre-requisites)
	- [Setup a local database connection](#Setup-a-local-database)
	- [Create a database](#Create-a-database)
	- [Run the migrations](#Run-the-migrations)
- [Development](#Development)
	- [How to use the scripts](#How-to-use-the-scripts)
- [Before a release](#Before-a-pull-request-/-a-release)
	- [Clean the dependencies and audit the packages](#Clean-the-dependencies-and-audit-the-packages)
	- [Update the version](#Update-the-version)
	- [Test the app](#Test-the-app)
- [How to use STET Endpoints](#Stet-endpoints)
	- [AISP - Authorizing an App](#AISP---Authorizing-an-App)
	- [PISP - Authorizing an App](#PISP---Authorizing-an-App)
	- [Accessing an Endpoint](#Accessing-an-Endpoint)
	- [PISP - Confirming a Payment](#PISP---Confirming-a-Payment)

## Installation

### Pre-requisites
Go to your project root folder and get the dependencies
```
git clone git@github.com:Cloudoki/openbank-sandbox-auth-server.git
cd openbank-sandbox-auth-server/
yarn // or npm install
```

> On MacOS, if `yarn` failed, you might need to update the active developer directory manager

For that, run

	xcode-select --install

### Setup a local database
If you don’t have `mysql` locally, you can pull the docker image
`docker run --name <CONTAINER_NAME> -e MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD> -d -p 3306:3306 mysql:5.7`

> `MYSQL_ROOT_PASSWORD` is the root password used to create a mysql connection.

In `src/config/schema.js` update the default value with your settings
```
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
```

### Create a database
In your mysql client (*Sequel Pro* or *MySQL Workbench*, ...), create the db (`authdb` for the example)

### Run the migrations
```
yarn knex migrate:latest // or npm run knex migrate:latest
```

## Development
### How to use the scripts

"start": "NODE_PATH=. node src/index.js",
    "dev": "npm-run-all --parallel start build",
    "lint": "eslint src/ --ext .js",
    "debug": "NODE_PATH=. node src/index.js | pino-pretty",
    "test": "OBSANDBOXAUTH_API_LOG_ENABLED=false lab -I '__core-js_shared__' -r console -o stdout -r html -o test/coverage.html --context-timeout 2000 --timeout 4000 -t 50",
    "commit": "git-cz",
    "release": "standard-version",
    "build": "webpack -d",
    "build-prod": "webpack -p",
    "server": "webpack-dev-server --open"

`yarn <script>` or `npm run <script>` 	 | Description
-----------------------------------------|----------------------------
`start`																	 | Starts the server
`dev`																		 | Starts and builds the server
`lint`																	 | Runs the linter
`debug`																	 | Starts the server in `DEBUG` mode
`test`																	 | Runs the unit tests with `lab`
`migrate`																 | Runs the migrations with knex
`rollback`															 | Rollbacks the latest set of ran migrations
`release <-r options: major|minor|patch>`| Creates a new release tag with options and updates the `CHANGELOG.md`
`commit`																 | Creates a new commit following `commitizen` standard
`build`																	 | Builds the project in `development` environment
`build-prod`														 | Builds the project in `production` environment
`server`																 | Opens the browser after server starts

## Before a pull request / a release

### Clean the dependencies and audit the packages

Test the audit for **at least** `yarn` to make sure the dependencies are proper.
```
rm yarn.lock // or rm package-lock.json
rm -rf node_modules
yarn // or npm i
yarn audit // npm audit
```

> Note that `npm i` would also run the audit after installing the dependencies

### Update the version

Increase the project `version` and update the `CHANGELOG `
```
yarn release // or npm run release
git push --follow-tags
```
This will execute the script
```
  "scripts": {
	...
    "release": "standard-version"
  },
```

### Test the app

The `pre-commit` hook allows to execute the tests before every commit.

```
  "pre-commit": [
    "lint",
    "test"
  ],
```

You just need to quick test the app to make sure all is still working properly. If needed, you can also run the tests manually.

```
yarn test // or npm test
```

## STET Endpoints
### AISP - Authorizing an App
In order to use the sandbox endpoints, an Access token is required. This token will allow the app to issue requests against the STET Sandbox API on behalf of a PSU.

If your app needs the AISP scope, i.e. needs to access the account information of your test users, you will need to obtain an access token with the authorization code grant type. This flow is detailed below.

#### Authorizing the App and Getting the Authorization Code

To receive an authorization code you will have to act as a PSU and authorize the app to act on behalf of this PSU.

You can input the following url in a browser:
```
https://sandbox.auth.bnpparibasfortis.com/authorize?response_type=code&client_id=<YOUR_APP_CLIENT_ID>&redirect_uri=<YOUR_APP_REDIRECT_URI>&scope=aisp&state=fhksdjfhgskj
```

Replace the query parameters with your own values, especially the client_id and the redirect_uri which must match the ones from your app (you can find them in your app overview by clicking on the app details of a specific app).

If the PSU is not authenticated, you will be redirected to the Login screen.

> login screen

On the login view, you should use one of your PSU credentials from your test data.

Once authenticated, you should now be redirected to the authorization screen. On this screen you should see the name of your app and a message indicating the permissions that will be granted to that app.

> authorize screen

If you press the Authorize button, you will be redirected to the callback url of the App with a code query string that is attached by the authorization server. This code should be used on the section Exchanging the Code for an Access Token. Copy it.

#### Exchanging the Authorization Code for an Access Token (Bearer)

At this point, all that is left is exchanging the Authorization code for an Access token that will allow your app to issue requests against the STET Sandbox Api on behalf of a PSU.

To do so, you need to do a POST request on https://sandbox.auth.bnpparibasfortis.com/token with the following parameters:

**Request parameters**

![](src/assets/docs/aisp_exchange_code_params.png)

**Response**

The response will contain a data property which contains the response:

![](src/assets/docs/aisp_exchange_code_response.png)

#### Exchange Code cURL example

```
curl -X POST \ --data "code=the_authorization_code_you_obtained_earlier" \ --data "grant_type=authorization_code" \ --data "redirect_uri=http://www.demo-app.com/callback" \ --data "client_id=aB541dfA" \ --data "client_secret=sup3rs3cr3t" \ --data "scope=aisp" \ https://sandbox.auth.bnpparibasfortis.com/token
```

**Output**

```
{
  "data": {
  "token_type": "bearer",
  "token": "d5010e19-6e93-4720-af4c-98b9466c126f",
  "expires_in": 3600,
  "expires": "2018-12-17T16:08:45.591Z",
  "refresh": "3382592c-5c0c-4412-8389-44c9ecfde700"
}
```

This is now the Bearer token or Access token that your App will use to issue request against the STET AISP Sandbox API endpoints that are to be used on behalf of a PSU.

### PISP - Authorizing an App

If your app needs to access the payment endpoints (PISP scope) then you will need to obtain an access token with the client credentials grant type.

#### Using Client Credentials Grant Type

To obtain a client_credentials token, all you need is a POST request to the https://sandbox.auth.bnpparibasfortis.com/token url with the following parameters:

**Request parameters**

![](src/assets/docs/pisp_get_access_token_params.png)

You will obtain an Access token that will allow you to issue payment requests, for example.


#### Exchange Code cURL example

```
curl -X POST \
--data "grant_type=client_credentials" \
--data "redirect_uri=http://www.demo-app.com/callback" \
--data "client_id=aB541dfA" \
--data "client_secret=sup3rs3cr3t" \
--data "scope=pisp" \ https://sandbox.auth.bnpparibasfortis.com/token
```

**Output**

```
{
  "data": {
  "token_type": "bearer",
  "token": "74f6e061-4c66-40f5-9eb8-fd2a71373b82",
  "expires_in": 3600,
  "expires": "2019-03-01T14:41:34.501Z",
  "refresh": "1dbfb99e-223b-4288-b2f0-bd967ee5a8ec"
}
```

This is now the Bearer token or Access token that your App will use to issue request against the STET PISP Sandbox API endpoints that are to be used on behalf of a PSU.

### Accessing an Endpoint

With the Access token obtained from the authorization_code or client_credentials flow in the previous steps, you can access the STET endpoints by passing in that token on the Authorization header of the request as a Bearer token. Just like on the previous requests, the X-Openbank-Organization, X-Openbank-Stet-Version are required headers, as well as an X-Request-Id and a Signature.

The currently tested and available endpoints are accessible from the url https://sandbox.api.bnpparibasfortis.com.

#### Available endpoints

![](src/assets/docs/available_endpoints.png)

### PISP - Confirming a Payment

When a successful POST request is sent on /v1/payment-requests with a client_credentials token, the payment is not executed yet. The payment resource is created, however the debtor (= PSU) still needs to confirm the payment. Indeed, the request posted by the PISP to the ASPSP needs a PSU authentication before execution. Because only the Redirect authentication method is currently supported, it will be the only method that is detailed here.

#### Confirming a Payment - Redirect flow

You should have already initiated a payment using the POST /v1/payment-requests endpoint. As per the swagger contract, you could either go without a debtor account or choose to provide a debtor account from your test data. Either way, you should receive a consentApprovalUrl in the API response. This url will look something like this:

https://sandbox.auth.bnpparibasfortis.com/payment-requests/{paymentRequestResourceId}/consent?client_id=<YOUR_APP_CLIENT_ID>
You have to copy paste this url in your browser. If the PSU is not authenticated, you will be redirected to the Login screen.

> login screen

On the login view, you should use one of your PSU credentials from your test data. Important: if you provided a debtor account in the body of POST /v1/payment-requests, you should make sure that the test user that you use to authenticate is the owner of the test account that you provided. Otherwise, you will receive an error.

Once authenticated, you should now be redirected to the Confirmation screen. On this screen you should see your payment details (amount, creditor, date). If you already provided a debtor account, it will appear here; clicking on Continue button will confirm the payment and redirect you to the successfulReportUrl provided in the payment request. If no debtor account was provided (as in the example below), you will instead be redirected to an account selection screen.

> confirm screen

In the account selection screen, the accounts of the authenticated PSU will be displayed. You just have to click on the account to select it and confirm the payment. You will then be redirected to the successfulReportUrl provided in the payment request.

> account selection screen

