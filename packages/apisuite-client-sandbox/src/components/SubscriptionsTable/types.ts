import { ApiDocs, APIVersion } from 'containers/Subscriptions/types'

export type SubscriptionsTableProps = {
  apisByName: APIData[],
}

export interface APIData {
  name: string,
  versions: APIVersion[],
  apps: {
    appName: string,
    appId: number,
  }[],
  description: ApiDocs | undefined,
}
