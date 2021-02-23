import { createSelector } from 'reselect'

import { ApplicationsStore } from 'containers/Applications/types'

import {
  SubscriptionsStore,
} from './types'

import { Store } from 'store/types'

const getAPIs = ({ subscriptions }: Store) => subscriptions
const getApps = ({ applications }: Store) => applications

export const getAPIsByName = createSelector(
  [getAPIs, getApps],
  (subscriptions: SubscriptionsStore, applications: ApplicationsStore) => {
    const allApis = subscriptions.apis
    const allApps = applications.userApps

    return allApis.map((api) => {
      const filteredApps = allApps.filter((app) => {
        return app.subscriptions.includes(api.id)
      })

      const apps = filteredApps.map((filteredApp) => {
        return {
          appName: filteredApp.name,
          appId: filteredApp.id,
        }
      })

      return {
        name: api.name,
        versions: api.apiVersions,
        apps,
        description: api.docs,
      }
    })
  },
)
