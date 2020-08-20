# UI Extensions

The APISuite Portal supports UI Extensions. These are regular node modules that implement a well-known extension API contract.

Extensions are added to the project at build-time. That is, they are installed locally and included into the resulting bundle during the build process.

## Extension Documentation

The first introduction to the UI Extension system should be the [general documentation in Confluence](https://cloudoki.atlassian.net/wiki/spaces/AS/pages/edit-v2/275054593).

## Installing / adding extensions

To include an extension to an APISuite portal instance, follow these steps:

1. Install the extension

       npm install Cloudoki/apisuite-extension-status-ui

1. Register the extension

    Import, register and configure the extension in `extensions.ts` as demonstrated in the file itself.

