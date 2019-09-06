# openbank-sandbox-api

- [Installation](#Installation)
	- [Pre-requisites](#Pre-requisites)
	- [Run the migrations](#Run-the-migrations)
- [Development](#Development)
	- [How to use the scripts](#How-to-use-the-scripts)
- [Before a release](#Before-a-pull-request-/-a-release)
	- [Clean the dependencies and audit the packages](#Clean-the-dependencies-and-audit-the-packages)
	- [Update the version](#Update-the-version)

## Installation

### Pre-requisites
Go to your project root folder and get the dependencies
```
git clone git@github.com:Cloudoki/openbank-sandbox-api.git
cd openbank-sandbox-api/
yarn // or npm i
```

### Run the migrations
Run the migrations of the `sqlite` database
```
yarn migrate // or npm run migrate
```

## Development

### How to use the scripts

`yarn <script>` or `npm run <script>` | Description
--------------------------------------|----------------------------
`start`																| Starts the server
`lint`																| Runs the linter
`doc`																	| Generates the api documentation accessible at http://localhost:3000/info/jsdoc
`debug`																| Starts the server in `DEBUG` mode
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

Increase the project `version` and update the `CHANGELOG`
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
