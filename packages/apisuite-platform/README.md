# Alpha AppCenter
[![Build Status](https://semaphoreci.com/api/v1/projects/431eaefe-808a-44fd-aa78-f70a6599cd25/2073846/badge.svg)](https://semaphoreci.com/cloudoki/appcenter-frontend-beta)

## Table of Contents
1. [Requirements](#requirements)
1. [Installation](#installation)
1. [Development](#development)
1. [Project Structure](#project-structure)
1. [i18n Support](#i18n-support)
1. [Themes](#themes)
1. [Caveats](#caveats)
1. [IBM Cloud deployment](#ibm-cloud-deployment)

## Requirements
* node `^5.0.0`
* yarn `^0.22.0`

## Installation

When that's done, install the project dependencies. It is recommended that you use [Yarn](https://yarnpkg.com/) for deterministic dependency management, but `npm install` will suffice.

```bash
$ yarn  # Install project dependencies (or `npm install`)
```

## Development

After completing the [installation](#installation) step, you're ready to start developing your App!

**Start by adding your first file in the root of the project:**

`.env`

```bash
# Your .env files can include sensitive information.
# Because of this, `dotenv-webpack` will only expose environment
# variables that are explicitly referenced in your code to your final bundle.
# see more here: https://github.com/mrsteele/dotenv-webpack#description

# API url
API_URL = 'http://localhost:9004'
```
If you look at `src/constants/endpoints.js` you will see a reference to `process.env.API_URL`, use it to make calls to mock API :D

**Running the project in `development` mode:**

```bash
$ yarn dev  # or `npm run dev`
```

Hot reloading is enabled by default for both **JavaScript** and **SCSS** files.

**All scripts at your disposal:**

|`yarn <script>`    |Description|
|-------------------|-----------|
|`dev`            	|Serves your app with default theme at `localhost:9001`|
|`dev:bnpp`         |Serves your app with BNPP theme at `localhost:9001`|
|`mock-api`			    |Serves a mock api at `localhost:9004`|
|`build`            |Builds the application with default theme to ./dist|
|`build:bnpp`       |Builds the application with BNPP theme to ./dist|
|`test`             |Runs unit tests with jest|
|`start`            |Runs tests, build and serves dist application at `localhost:8080`|
|`commit`           |Runs `git-cz`, to help with commit conventions|
|`generate`         |Generates a quick `component` or `container` with input choices|

## Project Structure

Containers use the [ducks](https://github.com/erikras/ducks-modular-redux) approach, with small changes. Instead of having the effects in the `ducks.js` file we preserve the sagas file to prevent our files of having more than 150/200 lines of code each and be easier to debug/read them. The other small change to this approach is that the middleware is also present in the `ducks.js` file, because we don't expect to have more than a couple per container, normally just one.

All files are in the relative folder and imported when needed with the help of `webpack resolve`.

Ex: `import App from 'components/App'`

```
.
├── __mocks__                       # Test and api mocks
│   ├── fileMock.js                 # Mock of imported files
│   └── db.json                     # mock api data
├── dist                            # All build-related source code
├── internals                       # Project development configurations
│   └── jest                        # Tests setups and shims
│   └── generate                    # File generation scripts
└── src                             # Application source code
    ├── index.html                  # Main HTML page container for app
    ├── index.js                    # Application bootstrap and rendering
    ├── components                  # Global reusable components
    │   └── Component
    │       ├── index.js            # Component source code
    │       ├── component.test.js   # Unit and integrations tests
    │       └── _styles.scss        # Your component styles (if any)
    ├── containers                  # Components wrapped by redux/connect
    │   └── Container
    │       ├── index.js            # Component source code
    │       ├── routes.js           # Your nested routes (if any)
    │       ├── ducks.js            # Reducer, action creators, constants and middleware
    │       ├── sagas.js            # All container related sagas
    │       ├── container.test.js   # Unit and integrations tests
    │       └── _styles.scss        # Your container styles (if any)
    ├── constants                   # Global constants
    ├── store
    │   ├── combinedReducers.js     # Combine all reducers in one place
    │   ├── combinedSagas.js        # Combine all sagas in one place
    │   └── index.js                # Redux store bootstrap
    ├── styles                      # Global styles
    ├── translations                # App string translations
    ├── themes                      # Application themes
    │   └── index.js                # Themes configuration
    │   └── Theme                   
    │       ├── images              # Theme specific images (if any)
    │       ├── translations        # Theme specific translations (if any)
    │       ├── index.html          # Theme HTML, replaces src/index.html
    │       └── theme.scss          # Theme specific styles (if any)
    └── util
        ├── request.js              # Fetch API handler
        ├── i18n.js                 # Internationalization configuration
        ├── storage.js              # Local storage helper
        ├── test-utils.js           # Test helpers
        └── getDefaultHeaders.js    # Helper to inject headers on requests
```

## i18n Support

### Adding translations

Add the following to `src/util/i18n.js`

```javascript
...

import frLocaleData from 'react-intl/locale-data/fr' // import the locale data

...

import frTranslationMessages from 'translations/fr.json' // import the translations JSON file

...

addLocaleData(frLocaleData) // add locale data to react-intl

export const appLocales = [
  'fr' // add the locale to the array of options
]

...

export const translationMessages = {
  fr: formatTranslationMessages(frTranslationMessages) // export the translations
}
```

You should first add the translation object to your default language file and then copy paste it on the translation file and add the translation to the message like the following:

```javascript
// src/translations/en.json
[
  {
    "id": "homePage.hello",
    "defaultMessage": "Made with ♥ by Cloudoki Team",
    "message": ""
  }
]
```

```javascript
// src/translations/fr.json
[
  {
    "id": "homePage.hello",
    "defaultMessage": "Made with ♥ by Cloudoki Team",
    "message": "Fabriqué avec ♥ par Cloudoki équipe"
  }
]
```

Adding formats to be used on your `FormattedMessages`, add the following to `src/util/i18n.js` formats variable:

```javascript
...

export const formats = {
  number: {
    EUR: {
      style: 'currency',
      currency: 'EUR'
    }
  }
}

...
```

Check [react-intl documentation](https://github.com/yahoo/react-intl/wiki#formatting-data) for more.


## Themes

### Existing themes

The App currently supports two customized themes: `default` and  `bnpp`. By default, the app will run and build the default theme, by using `yarn dev` and `yarn build` respectively.

**Available scripts:**

```bash
$ yarn dev         # Run the project in dev mode with default theme
$ yarn build       # Build the project with default theme

$ yarn dev:bnpp    # Run the project in dev mode with bnpp theme
$ yarn build:bnpp  # Build the project with bnpp theme
```

### Adding a new theme

1. Inside `src/themes` folder create a `themeName` folder.
2. Inside the `themeName` folder create a `translations` folder, an `images` folder, and a `theme.scss` file for the theme specific styles.
3. On `themes/index.js` add the new theme configurations to the exported themes object.
4. In the root project folder, open `package.json` and add the following scripts:

```bash
  ...
  "scripts": {
    ...
    "dev:themeName": "cross-env NODE_ENV=development THEME=themeName webpack-dev-server",
    "build:themeName": "cross-env NODE_ENV=production THEME=themeName --progress"
  },
  ...
```

Running one of these scripts with `THEME=themeName` will serve/build the project using everything inside the newly created `themeName`.

## Caveats

Some times `node-sass` have build problems on linux environments, probable solution:

- Bring your node version to `^6.0.0`
- Run `npm rebuild node-sass`
	- You need to run `npm rebuild node-sass` everytime `node-sass` package is installed.

## IBM Cloud deployment

>Check our IBM Cloud documentation [here](https://gitlab.techlab.innovationfactory.be/techlab/devops-recipes/blob/master/best-practices-ibm-cloud-containers.md).

To deploy the application:

```
kubectl create -f k8s/
```
