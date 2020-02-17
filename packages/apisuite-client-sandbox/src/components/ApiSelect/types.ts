import { App } from 'containers/Subscriptions/types'

export interface ApiSelectProps {
  userApps: Array<App>,
  handleAdd: (APIid: number, appName: string) => () => void,
  APIid: number,
}
