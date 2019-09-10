# apisuite-middleware-api

- [Installation](#Installation)
	- [Pre-requisites](#Pre-requisites)
	- [Setup a local database connection](#Setup-a-local-database)
	- [Create a database](#Create-a-database)
	- [Run the migrations](#Run-the-migrations)
	- [[Optional] Setup dependencies](#Optional-Setup-dependencies)
- [Development](#Development)
	- [How to use the scripts](#How-to-use-the-scripts)
- [Before a release](#Before-a-pull-request-/-a-release)
	- [Clean the dependencies and audit the packages](#Clean-the-dependencies-and-audit-the-packages)
	- [Update the version](#Update-the-version)
	- [Test the app](#Test-the-app)

## Installation

### Pre-requisites
Go to your project root folder and get the dependencies
```
git clone git@github.com:Cloudoki/openbank-middleware-api.git
cd apisuite-middleware-api/
yarn // or npm install
```

> On MacOS, if `yarn` failed, you might need to update the active developer directory manager

For that, run

	xcode-select --install

### Setup a local database
If you don’t have `mysql` locally, you can pull the docker image
`docker run --name <CONTAINER_NAME> -e MYSQL_ROOT_PASSWORD=<YOUR_PASSWORD> -d -p 3306:3306 mysql:5.7`

> `MYSQL_ROOT_PASSWORD` is the root password used to create a mysql connection.

In `src/config/envs/development.js` update the values with your settings
```
	"database": {
		"options": {
			"host": "localhost",
			"port": 3306,
			"database": "apisuite",
			"user": "root",
			"password": "cloudoki"
		}
	},
```

### Create a database
In your mysql client (*Sequel Pro* or *MySQL Workbench*, ...), create the db (`apisuite` for the example)

### Run the migrations
```
yarn migrate // or npm run migrate
```

### [Optional] Setup dependencies

If you need to implement or test locally a feature with multiple repositories involved, update the `src/config/development.json`, setting the following environment variables and start the corresponding servers.

```
	"appcenter": {
		"url": "http://localhost:9001",
		"admin": "http://localhost:9000",
		"api": "http://localhost:3000",
		"scenario": "http://localhost:3004"
	},
	"sandboxAuthServer": {
		"host": "http://localhost:3001",
		"clientId": "",
		"clientSecret": ""
	},
```

#### ob-platform

```
	"appcenter": {
		"url": "http://localhost:9001",
		...
	},
```

In the `ob-platform` repository, if you are running the app with `yarn local`, make sure you have the following configuration in the root `local.conf`. If you don't have the file, `touch local.conf` in the root folder of the project.
```
export API_URL="http://localhost:3000"
export DEV_PORTAL_CLIENT_ID=<client_id>
export DEV_PORTAL_CLIENT_SECRET=<client_secret>
```

`client_id` and `client_secret` can be found in the `apisuite` database, `oauth_client` table. It should be the row having this description _Cloudoki OAuth2 Client_.

#### ob-admin

```
	"appcenter": {
		...
		"admin": "http://localhost:9000",
		...
	},
```

In the `ob-admin` repository, if you are running the app with `yarn local`, make sure you have the following configuration in the root `local.conf`. If you don't have the file, `touch local.conf` in the root folder of the project.

```
export API_URL="http://localhost:3000"
export ADMIN_PORTAL_CLIENT_ID=<client_id>
export ADMIN_PORTAL_CLIENT_SECRET=<client_secret>
```

`client_id` and `client_secret` can be found in the `apisuite` database, `oauth_client` table. It should be the row having this description _APISuite admin client_.


#### ob-sandbox-auth-server

Update the local **ob-sandbox-auth-server** `host`, `clientId` and `clientSecret`.

`clientId` and `clientSecret` can be found in the `authdb` database, `app` table. It should be the row having this description _Internal client for the Middleware API_.

```
	"sandboxAuthServer": {
		"host": "http://localhost:3001",
		"clientId": "cb24bac3-08b1-4401-8a86-8c570123ba4a",
		"clientSecret": "e5d0eeed-e5b9-42e6-a847-43caa2dee14f"
	},
```

#### ob-scenario-manager

```
	"appcenter": {
		...
		"scenario": "http://localhost:3004"
	},
```

## Development
### How to use the scripts

`yarn <script>` or `npm run <script>` | Description
--------------------------------------|----------------------------
`start`																| Starts the server
`lint`																| Runs the linter
`debug`																| Starts the server in `DEBUG` mode
`test`																| Runs the unit tests with `lab`
`doc`																	| Generates the api documentation accessible at http://localhost:3000/info/jsdoc
`migrate`															| Runs the migrations with knex
`rollback`														| Rollbacks the latest set of ran migrations
`release <options: major|minor|patch>`| Creates a new release tag with options and updates the `CHANGELOG.md`

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

