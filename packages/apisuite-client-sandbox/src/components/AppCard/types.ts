import { History } from 'history'

export interface AppCardProps extends React.HtmlHTMLAttributes<HTMLDivElement> {
  addVariant?: boolean,
  name: string,
  deleteApp: (appId: number, userId: number) => void,
  appId?: number,
  userId?: number,
  history?: History<any>,
}
