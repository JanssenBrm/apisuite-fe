import update from 'immutability-helper'
import { Reducer } from 'redux'
import { NotificationStore, NotificationActions, NotificationType } from './types'

export const CLOSE_NOTIFICATION = 'Notification/CLOSE_NOFICATION'
export const OPEN_NOTIFICATION = 'Notification/OPEN_NOFICATION'

const initialState: NotificationStore = {
  open: false,
  type: '',
  msg: '',
  timer: 0,
}

const reducer: Reducer<NotificationStore, NotificationActions> = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_NOTIFICATION:
      return update(state, {
        open: { $set: true },
        type: { $set: action.notificationType },
        msg: { $set: action.msg },
        timer: { $set: action.timer },
      })

    case CLOSE_NOTIFICATION: {
      return update(state, {
        open: { $set: false },
      })
    }

    default:
      return state
  }
}

export function closeNotification () {
  return { type: CLOSE_NOTIFICATION }
}

export function openNotification (notificationType: NotificationType, msg: string, timer: number) {
  return { type: OPEN_NOTIFICATION, notificationType, msg, timer }
}

export default reducer
