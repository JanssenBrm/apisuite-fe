import update from 'immutability-helper'

/**
* Constants
*/
export const SHOW_NOTIFICATION = 'NotificationManager/SHOW_NOTIFICATION'
export const HIDE_NOTIFICATION = 'NotificationManager/HIDE_NOTIFICATION'

/**
 * NotificationManager state
 * @typedef {Object} state
 * @prop {string} [variant] - Type of error (info || success || warning || error)
 * @prop {string} [message] - Notification message || i18n translation id (preferable)
 * @prop {bool} [show] - If the notification is visible
 */
const initialState = {
  variant: null,
  message: null,
  show: false,
  fromAPI: false,
}
/**
 * Reducer
 * @param {state} [state=initialState] - NotificationManager state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SHOW_NOTIFICATION:
      return update(state, {
        variant: { $set: action.variant },
        message: { $set: action.message },
        show: { $set: true },
        fromAPI: { $set: Boolean(action.fromAPI) },
      })
    case HIDE_NOTIFICATION:
      return update(state, {
        show: { $set: false },
      })
    default:
      return state
  }
}

/**
 * show notification action creator
 */
export function showNotification (variant, message, fromAPI) {
  return { type: SHOW_NOTIFICATION, variant, message, fromAPI }
}

/**
 * hide notification action creator
 */
export function hideNotification () {
  return { type: HIDE_NOTIFICATION }
}
