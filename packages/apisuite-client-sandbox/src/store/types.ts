import { RouterState } from 'connected-react-router'
import { AuthStore } from 'containers/Auth/types'
import { ApplicationsStore } from 'containers/Applications/types'
import { AppStoreState } from 'containers/App/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
  applications: ApplicationsStore,
  app: AppStoreState,
}
