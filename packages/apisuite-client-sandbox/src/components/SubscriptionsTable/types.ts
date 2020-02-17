import { SubStore } from 'containers/Subscriptions/types'

export type ViewType = 'list' | 'cards'

export interface SubscriptionsTableProps {
  view: ViewType,
  subscriptions: SubStore,
  deleteAppSub: (APIid: number, appNumber: number) => void,
  addAppSub: (APIid: number, appName: string, newAppNumber: number) => void,
}
