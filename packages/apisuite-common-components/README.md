# APISuite Common Components

## Install

```shell
npm i @apisuite/apisuite-common-components --save
```

## Developing

Create the new component, create the stories and visualize it with storybook.

```shell
npm i
npm run storybook
```

### Build

To build the package manually run

```shell
npm run build
```

or, to watch the project for changes and rebuilding it:

```shell
npm run build:watch
```

### Release a new version

To release a new version use [npm's version command](https://docs.npmjs.com/cli/version).

For instance, to create a patch release, run:

```shell
npm version patch
```

This will build the project, increment the version's patch field, commit these new changes and tag the commit.
