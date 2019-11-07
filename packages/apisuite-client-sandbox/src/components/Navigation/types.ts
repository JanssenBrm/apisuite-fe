import { User } from 'containers/Auth/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: React.ReactNode[],
  subTabs?: React.ReactNode[],
  tabIndex: number,
  subTabIndex: number,
  logoSrc: string,
  onTabChange: (index: number) => void,
  onSubTabChange: (index: number) => void,
  user?: User,
  forceScrolled?: boolean,
  showBackButton?: boolean,
  backButtonLabel?: string,
  onGoBackCLick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
