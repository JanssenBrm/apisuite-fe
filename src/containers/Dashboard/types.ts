import { AuthStore } from 'containers/Auth/types'
import { NotificationCardsStore } from 'containers/NotificationCards/types'
import { ProfileStore } from 'containers/Profile/types'
import { SettingsStore } from 'containers/Settings/types'
import { SubscriptionsStore } from 'containers/Subscriptions/types'

export interface DashboardProps {
  auth: AuthStore,
  getAPIs: () => void,
  notificationCards: NotificationCardsStore,
  profile: ProfileStore,
  settings: SettingsStore,
  subscriptions: SubscriptionsStore,
}
