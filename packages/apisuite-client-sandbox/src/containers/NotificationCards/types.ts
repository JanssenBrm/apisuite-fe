// Temporary until notification cards become clearer

import { Action } from 'redux'

import { GET_NOTIFICATION_CARDS, TOGGLE_NOTIFICATION_CARDS } from './ducks'

export type NotificationCardsStore = NotificationCardsData

export interface NotificationCardsData {
  notificationCardsData: {}[],
  showNotificationCards: boolean,
}

export interface GetNotificationCardsAction extends Action {
  type: typeof GET_NOTIFICATION_CARDS,
}

export interface ToggleNotificationCardsAction extends Action {
  type: typeof TOGGLE_NOTIFICATION_CARDS,
}

export type NotificationCardsActions = GetNotificationCardsAction | ToggleNotificationCardsAction
