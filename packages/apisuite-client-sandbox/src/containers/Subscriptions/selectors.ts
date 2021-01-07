import { createSelector } from 'reselect'

import { ApplicationsStore } from 'containers/Applications/types'

import {
  APIVersion,
  Api,
  AppInfo,
  SubscriptionsStore,
} from './types'

import { Store } from 'store/types'

const getAPIs = ({ subscriptions }: Store) => subscriptions
const getApps = ({ applications }: Store) => applications

export const getAPIsByName = createSelector(
  [getAPIs, getApps],
  (subscriptions: SubscriptionsStore, applications: ApplicationsStore) => {
    const apiNames = [...new Set(subscriptions.apis.map((api: Api) => api.name))]

    return apiNames.map((apiName) => {
      let getVersions: APIVersion[] = []
      const getApps: AppInfo[] = []

      // For each API, get its ID, title, and version.
      subscriptions.apis.forEach((api) => {
        if (apiName === api.name) {
          getVersions = api.apiVersions
        }
      })

      // For each API, get all apps subscribed to it.
      applications.userApps.forEach((app) => {
        const appSubs = [...new Set(app.subscriptions.map((api) => api.name))]

        if (appSubs.includes(apiName)) {
          getApps.push({
            appName: app.name,
            appId: app.appId,
          })
        }
      })

      return ({
        name: apiName,
        versions: getVersions,
        apps: getApps,
        description: '',
      })
    })
  },
)
