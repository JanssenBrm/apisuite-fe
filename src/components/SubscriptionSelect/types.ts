export type SubscriptionSelectProps = {
  apps: {
    appName: string,
    appId: number,
  }[],
  apiName: string,
  handleDelete: (appId: number, apiName: string) => ((event: React.MouseEvent<HTMLDivElement, MouseEvent> |
  React.MouseEvent<SVGSVGElement, MouseEvent>) => void),
  handleClick: (apiName: string) => (event: React.MouseEvent<HTMLDivElement, MouseEvent> |
  React.MouseEvent<SVGSVGElement, MouseEvent>) => void,
}
