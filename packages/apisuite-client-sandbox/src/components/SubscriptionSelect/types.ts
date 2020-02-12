import { App } from 'components/SubscriptionsTable/types'

export interface SubscriptionSelectProps {
  apps: Array<App>,
  apiNumber: number,
  handleDelete: (app: App, apiNumber: number) => ((event: any) => void),
}
