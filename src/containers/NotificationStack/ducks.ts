import update from 'immutability-helper'
import { Reducer } from 'redux'
import { NotificationStackStore, NotificationActions, NotificationType } from './types'

export const CLOSE_NOTIFICATION = 'Notification/CLOSE_NOFICATION'
export const OPEN_NOTIFICATION = 'Notification/OPEN_NOFICATION'

const initialState: NotificationStackStore = {
  notifications: [],
}

const reducer: Reducer<NotificationStackStore, NotificationActions> = (state = initialState, action) => {
  const notificationNumber = state.notifications.length

  switch (action.type) {
    case OPEN_NOTIFICATION:
      return update(state, {
        notifications: {
          $push: [{
            notificationNumber: notificationNumber,
            open: true,
            type: action.notificationType,
            msg: action.msg,
            timer: action.timer,
          }],
        },
      })

    case CLOSE_NOTIFICATION: {
      return update(state, {
        notifications: { [action.notificationNumber]: { open: { $set: false } } },
      })
    }

    default:
      return state
  }
}

export function closeNotification (notificationNumber: number) {
  return { type: CLOSE_NOTIFICATION, notificationNumber }
}

export function openNotification (notificationType: NotificationType, msg: string, timer: number) {
  return { type: OPEN_NOTIFICATION, notificationType, msg, timer }
}

export default reducer
