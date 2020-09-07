# APISuite

This is the API Suite.

## About this repo

This is a monorepo that contains the API Suite front-end clients. In the `packages/` folder you can find the individual projects that make up the API Suite.

### `apisuite-client-sandbox`

This package represents the main API Suite front-end.

## Set up

### Requirements

* Node.js v12.13.1
* Yarn

### Install dependencies

This package is part of a monorepo managed through [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Thus, to install all dependencies, run the following command from the monorepo's root folder:

    yarn

#### Handling private GitHub-hosted dependencies

Since the individual projects may use private GitHub-hosted dependencies, read the [apisuite-client-sandbox documentation](packages/apisuite-client-sandbox/README.md) to understand how you can set up your SSH keys.

## Run

### `apisuite-client-sandbox`

To start a webpack development server that rebuilds the project on every change, run:

    npm run sandbox-dev

To create a build:

    npm run sandbox-build
