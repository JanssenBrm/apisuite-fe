import { APIVersion, AppInfo } from 'containers/Subscriptions/types'

export type SubscriptionsTableProps = {
  apisByName: APIData[],
}

export interface APIData {
  name: string,
  versions: APIVersion[],
  apps: AppInfo[],
  description: string,
}
