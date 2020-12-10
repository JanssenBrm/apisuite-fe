// Temporary until notification cards become clearer

import { Reducer, AnyAction } from 'redux'

import update from 'immutability-helper'

import { NotificationCardsStore } from './types'

/** Initial state */
const initialState: NotificationCardsStore = {
  notificationCardsData: [{}],
  showNotificationCards: false,
}

/** Action types */
export const GET_NOTIFICATION_CARDS = 'NotificationCards/GET_NOTIFICATION_CARDS'
export const TOGGLE_NOTIFICATION_CARDS = 'NotificationCards/TOGGLE_NOTIFICATION_CARDS'

/** Reducer */
const reducer: Reducer<NotificationCardsStore, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GET_NOTIFICATION_CARDS: {
      return state
    }

    case TOGGLE_NOTIFICATION_CARDS: {
      const newValueOfShowNotificationCards = !(state.showNotificationCards)

      return update(state, {
        showNotificationCards: { $set: newValueOfShowNotificationCards },
      })
    }

    default:
      return state
  }
}

/** Action builders */
export function getNotificationCards () {
  return { type: GET_NOTIFICATION_CARDS }
}

export function toggleNotificationCards () {
  return { type: TOGGLE_NOTIFICATION_CARDS }
}

export default reducer
