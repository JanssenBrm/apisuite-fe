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

This package is part of a monorepo managed through [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/). Additionally, the monorepo also uses [lerna](https://github.com/lerna/lerna) to manage releases of the individual sub-projects.

To install all dependencies, run the following command from the monorepo's root folder:

    yarn

#### Handling private GitHub-hosted dependencies

Since the individual projects may use private GitHub-hosted dependencies, read the [apisuite-client-sandbox documentation](packages/apisuite-client-sandbox/README.md) to understand how you can set up your SSH keys.

## Run

### `apisuite-client-sandbox`

To start a webpack development server that rebuilds the project on every change, run:

    npm run sandbox-dev

To create a build:

    npm run sandbox-build

## Releases

Releases are managed through [lerna's version command](https://github.com/lerna/lerna/tree/master/commands/version) with the [--conventional-commits](https://github.com/lerna/lerna/tree/master/commands/version#--conventional-commits) option. This means that lerna will use the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) to determine the version bump (major, minor or patch), generate CHANGELOG.md files and releases in GitHub.

Lerna versions, tags and releases sub-projects individually. Thus, tags are prefixed with each project's name such as `apisuite-client-sandbox@1.0.0`. Similarly, each project contains its own `CHANGELOG.md` file.

Releases are managed automatically through the configured CircleCI pipelines and developers don't have to worry about creating releases manually. However, they have to make sure to follow the [Conventional Commits Specification](https://www.conventionalcommits.org/en/v1.0.0/) when commiting their changes.

### How releases are triggered

To accomodate our release environments, different environments have different pre-release tags, or none.

When new commits (direct or through PRs/merges) are made to one of the main environment branches (`staging`, `production`), a release with the adequate tag is triggered.

**`staging`**

The staging environment uses the `rc` pre-release tag.

Example release tag: `apisuite-client-sandbox@1.0.0-rc.0`.

**`production`**

Final releases use no pre-release tag.

Example release tag: `apisuite-client-sandbox@1.0.0`.
