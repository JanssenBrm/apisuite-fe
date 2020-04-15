import { createSelector } from 'reselect'
import { Store } from 'store/types'
import { Api, SubscriptionsStore } from './types'
import { ApplicationsStore } from 'containers/Applications/types'

const getApis = ({ subscriptions }: Store) => subscriptions
const getApps = ({ applications }: Store) => applications

export const getApisByName = createSelector(
  [getApis, getApps],
  (subscriptions: SubscriptionsStore, applications: ApplicationsStore) => {
    const apiNames = [...new Set(subscriptions.apis.map((api: Api) => api.name))]
    return apiNames.map(apiName => {
      const getVersions = []
      const getApps = []

      /** For each API(version) gets the version, title, and id */
      for (const apiIndx in subscriptions.apis) {
        if (subscriptions.apis[apiIndx].name === apiName) {
          getVersions.push({
            versionName: subscriptions.apis[apiIndx].version,
            apiTitle: subscriptions.apis[apiIndx].apiTitle,
            apiId: subscriptions.apis[apiIndx].id,
          })
        }
      }

      /** For each API(name) gets the apps which are subscribed to it  */
      for (const appIndx in applications.userApps) {
        const appSubs = [...new Set(applications.userApps[appIndx].subscriptions.map(api => api.name))]
        if (appSubs.includes(apiName)) {
          getApps.push({
            appName: applications.userApps[appIndx].name,
            appId: applications.userApps[appIndx].appId,
          })
        }
      }

      return ({
        name: apiName,
        versions: getVersions,
        apps: getApps,
        description: '',
      })
    })
  },
)
