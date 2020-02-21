import { App } from 'containers/Subscriptions/types'

export interface ApiSelectProps {
  userApps: App[],
  handleAdd: (APIid: number, appName: string) => (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => void,
  APIid: number,
}
