import { NotificationCardsStore } from 'containers/NotificationCards/types'
import { ProfileStore } from 'containers/Profile/types'
import { SettingsStore } from 'containers/Settings/types'

export interface NavigationProps extends React.HTMLAttributes<HTMLDivElement> {
  backButtonLabel?: string,
  contractible?: boolean,
  // Temporary until notification cards become clearer
  notificationCards: NotificationCardsStore,
  profile: ProfileStore,
  settings: SettingsStore,
  showBackButton?: boolean,
  toggleInform: any,
  // Temporary until notification cards become clearer
  toggleInstanceOwnerNotificationCards: () => void,
  toggleNonInstanceOwnerNotificationCards: () => void,
}

export interface TabMenus {
  [key: string]: TabProps[],
}

export interface TabProps {
  hideFromInstanceOwner?: boolean,
  isLogin?: boolean,
  isProfileTab?: boolean,
  yetToLogIn?: boolean,
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
