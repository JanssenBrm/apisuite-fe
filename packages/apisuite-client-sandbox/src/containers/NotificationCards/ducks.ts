// Temporary until notification cards become clearer

import { Reducer, AnyAction } from 'redux'

import update from 'immutability-helper'

import { NotificationCardsStore } from './types'

/** Initial state */
const initialState: NotificationCardsStore = {
  instanceOwnerNotificationCardsData: [{}],
  nonInstanceOwnerNotificationCardsData: [{}],
  showInstanceOwnerNotificationCards: false,
  showNonInstanceOwnerNotificationCards: true,
}

/** Action types */
export const GET_INSTANCE_OWNER_NOTIFICATION_CARDS =
  'NotificationCards/GET_INSTANCE_OWNER_NOTIFICATION_CARDS'

export const GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS =
  'NotificationCards/GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS'

export const TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS =
  'NotificationCards/TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS'

export const TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS =
  'NotificationCards/TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS'

/** Reducer */
const reducer: Reducer<NotificationCardsStore, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GET_INSTANCE_OWNER_NOTIFICATION_CARDS: {
      return state.instanceOwnerNotificationCardsData
    }

    case GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS: {
      return state.nonInstanceOwnerNotificationCardsData
    }

    case TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS: {
      const newValueOfShowNotificationCards = !(state.showInstanceOwnerNotificationCards)

      return update(state, {
        showInstanceOwnerNotificationCards: { $set: newValueOfShowNotificationCards },
      })
    }

    case TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS: {
      const newValueOfShowNotificationCards = !(state.showNonInstanceOwnerNotificationCards)

      return update(state, {
        showNonInstanceOwnerNotificationCards: { $set: newValueOfShowNotificationCards },
      })
    }

    default:
      return state
  }
}

/** Action builders */
export function getInstanceOwnerNotificationCards () {
  return { type: GET_INSTANCE_OWNER_NOTIFICATION_CARDS }
}

export function getNonInstanceOwnerNotificationCards () {
  return { type: GET_NON_INSTANCE_OWNER_NOTIFICATION_CARDS }
}

export function toggleInstanceOwnerNotificationCards () {
  return { type: TOGGLE_INSTANCE_OWNER_NOTIFICATION_CARDS }
}

export function toggleNonInstanceOwnerNotificationCards () {
  return { type: TOGGLE_NON_INSTANCE_OWNER_NOTIFICATION_CARDS }
}

export default reducer
