import { RouterState } from 'connected-react-router'
import { AuthStore } from 'containers/Auth/types'
import { ApplicationsStore } from 'containers/Applications/types'
import { SubStore } from 'containers/Subscriptions/types'
import { AppStoreState } from 'components/InformDialog/types'
import { NotificationStackStore } from 'containers/NotificationStack/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
  register: any,
  applications: ApplicationsStore,
  subscriptions: SubStore,
  informDialog: AppStoreState,
  notifications: NotificationStackStore,
}
