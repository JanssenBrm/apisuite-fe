import { getApisByName } from 'containers/Subscriptions/selectors'
import { User } from 'containers/Auth/types'
import { AppData } from 'containers/Applications/types'

export type ViewType = 'list' | 'cards'

export type SubscriptionsTableProps = {
  apisByName: ReturnType<typeof getApisByName>,
  user?: User,
  userApps: AppData[],
  getApis: () => void,
  getUserApps: (userId: number) => void,
  addAppSubscription: (appId: number, apiName: string) => void,
  removeAppSubscription: (appId: number, apiName: string) => void,
}
