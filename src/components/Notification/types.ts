import { Notification } from 'containers/NotificationStack/types'

export interface NotificationProps extends Notification {
  closeNotification: (notificationNumber: number) => void,
}
