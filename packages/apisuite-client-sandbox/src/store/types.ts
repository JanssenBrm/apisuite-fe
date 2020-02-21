import { RouterState } from 'connected-react-router'
import { AuthStore } from 'containers/Auth/types'
import { ApplicationsStore } from 'containers/Applications/types'
import { AppStoreState } from 'containers/App/types'
import { SubStore } from 'containers/Subscriptions/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
  register: any,
  applications: ApplicationsStore,
  app: AppStoreState,
  subscriptions: SubStore,
}
