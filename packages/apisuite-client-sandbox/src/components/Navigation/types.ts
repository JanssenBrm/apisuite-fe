import { User } from 'containers/Auth/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  tabs: TabProps[],
  logoSrc: string,
  user?: User,
  forceScrolled?: boolean,
  showBackButton?: boolean,
  backButtonLabel?: string,
  onGoBackCLick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
  toggleInform: any,
}

export interface TabProps {
  label: string,
  route: string,
  disabled?: boolean,
  active?: boolean,
  subTabs?: SubTabProps[],
}

export interface SubTabProps {
  label: any,
  route: string,
  disabled?: boolean,
  active?: boolean,
}
