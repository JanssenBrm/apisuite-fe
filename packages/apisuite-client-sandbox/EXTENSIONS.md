# UI Extensions

The APISuite Portal supports UI Extensions. These are regular node modules that implement a well-known extension API contract.

Extensions are added to the project at build-time. That is, they are installed locally and included into the resulting bundle during the build process.

## Extension Documentation

The first introduction to the UI Extension system should be the [general documentation in Confluence](https://cloudoki.atlassian.net/wiki/spaces/AS/pages/275054593/UI+Extensions).

## Installing / adding extensions

To include an extension to an APISuite portal instance, follow these steps:

1. Install the extension

       npm install Cloudoki/apisuite-extension-status-ui

1. Register the extension

    Import, register and configure the extension in `extensions.ts` as demonstrated in the file itself.

## Declaring extensions to be installed in the CI/CD pipeline

In the files `extensions.(dev|stg|prod).json`, one can declare the extensions that should be added to the build of the Portal in each respective environment during the CircleCI build process.

For an example, look at the [extensions.dev.json](extensions.dev.json) file, the declaration syntax is self-explanatory.

Before the build process, the script [scripts/extensions-installer.js](scripts/extensions-installer.js) will be executed which reads the correct `extensions.*.dev` file and adds the declared extensions to `package.json` and registers them for run-time instancing in `extensions.ts`. 
