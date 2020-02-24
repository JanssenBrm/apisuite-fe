import { User } from 'containers/Auth/types'
import { AppStorePayloads } from 'containers/App/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabProps[],
  subTabs?: SubTabProps[],
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

export interface TabProps {
  label: string,
  route: string,
  disabled?: boolean,
  subTabs?: SubTabProps[],
}

export interface SubTabProps {
  label: any,
  route: string,
  disabled?: boolean,
}
