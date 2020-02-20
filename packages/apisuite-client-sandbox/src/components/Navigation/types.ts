import { User } from 'containers/Auth/types'
import { AppStorePayloads } from 'containers/App/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: React.ReactNode[],
  subTabs?: React.ReactNode[],
  tabIndex: number,
  subTabIndex: number,
  name: string,
  logoSrc: string,
  inform: (informData: AppStorePayloads['inform']) => void,
  onTabChange: (index: number) => void,
  onSubTabChange: (index: number) => void,
  user?: User,
  forceScrolled?: boolean,
  showBackButton?: boolean,
  backButtonLabel?: string,
  onGoBackCLick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}
