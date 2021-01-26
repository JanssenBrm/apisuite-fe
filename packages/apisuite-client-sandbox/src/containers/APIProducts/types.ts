import { AuthStore } from 'containers/Auth/types'
import { SubscriptionsStore } from 'containers/Subscriptions/types'

export interface APIProductsProps extends React.HTMLAttributes<HTMLDivElement> {
  auth: AuthStore,
  getAPIs: () => void,
  subscriptions: SubscriptionsStore,
}
