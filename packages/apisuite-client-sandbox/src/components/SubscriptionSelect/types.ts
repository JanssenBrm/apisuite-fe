import { App } from 'containers/Subscriptions/types'

export interface SubscriptionSelectProps {
  apps: App[],
  APIid: number,
  handleDelete: (id: number, appId: number) => ((event: React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>) => void),
  handleClick: (APIid: number) => (event: React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}
