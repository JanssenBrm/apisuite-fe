import { CLOSE_NOTIFICATION, OPEN_NOTIFICATION } from './ducks'
import { Action } from 'redux'

export type NotificationType = 'success' | 'error' | ''

export interface NotificationStore {
  open: boolean,
  type: NotificationType,
  msg: string,
  timer: number,
}

export interface NotificationProps extends NotificationStore {
  closeNotification: () => void,
}

export interface CloseNotificationAction extends Action {
  type: typeof CLOSE_NOTIFICATION,
}

export interface OpenNotificationAction extends Action {
  type: typeof OPEN_NOTIFICATION,
  notificationType: NotificationType,
  msg: string,
  timer: number,
}

export type NotificationActions = CloseNotificationAction | OpenNotificationAction
