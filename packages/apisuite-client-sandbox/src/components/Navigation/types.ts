export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  contractible?: boolean,
  showBackButton?: boolean,
  backButtonLabel?: string,
  logout: any,
  toggleInform: any,
}

export interface TabMenus {
  [key: string]: TabProps[],
}

export interface TabProps {
  label: string,
  route: string,
  disabled?: boolean,
  active?: boolean,
  subTabs?: SubTabProps[],
  yetToLogIn?: boolean,
}

export interface SubTabProps {
  label: any,
  route: string,
  disabled?: boolean,
  active?: boolean,
}
