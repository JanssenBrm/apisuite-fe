import { createSelector } from 'reselect'
import { Store } from 'store/types'
import { Api, SubscriptionsStore, APIVersion, AppInfo } from './types'
import { ApplicationsStore } from 'containers/Applications/types'

const getApis = ({ subscriptions }: Store) => subscriptions
const getApps = ({ applications }: Store) => applications

export const getApisByName = createSelector(
  [getApis, getApps],
  (subscriptions: SubscriptionsStore, applications: ApplicationsStore) => {
    const apiNames = [...new Set(subscriptions.apis.map((api: Api) => api.name))]
    return apiNames.map(apiName => {
      let getVersions: APIVersion[] = []
      const getApps: AppInfo[] = []

      /** For each API(version) gets the version, title, and id */
      subscriptions.apis.forEach((api) => {
        if (apiName === api.name) {
          getVersions = api.apiVersions
        }
      })

      /** For each API(name) gets the apps which are subscribed to it  */
      applications.userApps.forEach((app) => {
        const appSubs = [...new Set(app.subscriptions.map(api => api.name))]
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
