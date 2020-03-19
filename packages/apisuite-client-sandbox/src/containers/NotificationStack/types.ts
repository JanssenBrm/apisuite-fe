import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from './ducks'
import { Action } from 'redux'

export type NotificationType = 'success' | 'error' | ''

export interface Notification {
  notificationNumber: number,
  open: boolean,
  type: NotificationType,
  msg: string,
  timer: number,
}

export interface NotificationStackStore {
  notifications: Notification[],
}

export interface NotificationStackProps extends NotificationStackStore {
  closeNotification: (notificationNumber: number) => void,
}

export interface CloseNotificationAction extends Action {
  type: typeof CLOSE_NOTIFICATION,
  notificationNumber: number,
}

export interface OpenNotificationAction extends Action {
  type: typeof OPEN_NOTIFICATION,
  notificationType: NotificationType,
  msg: string,
  timer: number,
}

export type NotificationActions = CloseNotificationAction | OpenNotificationAction
