import { User } from 'containers/Auth/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabNames: string[],
  subTabNames?: string[],
  tabIndex: number,
  subTabIndex: number,
  logoSrc: string,
  onTabChange: (index: number) => void,
  user?: User,
}
