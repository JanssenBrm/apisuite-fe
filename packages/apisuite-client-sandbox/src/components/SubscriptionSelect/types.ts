import { App } from 'containers/Subscriptions/types'

export interface SubscriptionSelectProps {
  apps: Array<App>,
  APIid: number,
  handleDelete: (id: number, appId: number) => ((event: any) => void),
  handleClick: (APIid: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}
