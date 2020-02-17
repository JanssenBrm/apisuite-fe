import { App } from 'containers/Subscriptions/types'

export interface SubscriptionSelectProps {
  apps: Array<App>,
  apiNumber: number,
  handleDelete: (id: number, appId: number) => ((event: any) => void),
  handleClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}
