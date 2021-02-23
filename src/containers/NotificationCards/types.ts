// Temporary until notification cards become clearer

import { Action } from 'redux'

import {
  GET_INSTANCE_OWNER_NOTIFICATION_CARDS,
  GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS,
  TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS,
  TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS,
} from './ducks'

export type NotificationCardsStore = NotificationCardsData

export interface NotificationCardsData {
  instanceOwnerNotificationCardsData: any,
  nonInstanceOwnerNotificationCardsData: any,
  showInstanceOwnerNotificationCards: boolean,
  showNonInstanceOwnerNotificationCards: boolean,
}

export interface GetInstanceOwnerNotificationCardsAction extends Action {
  type: typeof GET_INSTANCE_OWNER_NOTIFICATION_CARDS,
}

export interface GetNonInstanceOwnerNotificationCardsAction extends Action {
  type: typeof GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS,
}

export interface ToggleInstanceOwnerNotificationCardsAction extends Action {
  type: typeof TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS,
}

export interface ToggleNonInstanceOwnerNotificationCardsAction extends Action {
  type: typeof TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS,
}

export type NotificationCardsActions = GetInstanceOwnerNotificationCardsAction
| GetNonInstanceOwnerNotificationCardsAction
| ToggleInstanceOwnerNotificationCardsAction
| ToggleNonInstanceOwnerNotificationCardsAction
