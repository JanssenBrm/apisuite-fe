/**
 * @module PortalNotifications/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_LATEST_NOTIFICATION = 'PortalNotifications/FETCH_LATEST_NOTIFICATION'
export const FETCH_LATEST_NOTIFICATION_SUCCESS = 'PortalNotifications/FETCH_LATEST_NOTIFICATION_SUCCESS'
export const FETCH_LATEST_NOTIFICATION_ERROR = 'PortalNotifications/FETCH_LATEST_NOTIFICATION_ERROR'

/**
 * PortalNotifications state
 * @typedef {Object} state
 * @prop {array} [data] - Portal Notifications data
 */
const initialState = {
  notification: {},
  showNotification: false,
  ui: {
    loading: false
  }
}

/**
 * Reducer
 * @param {state} [state=initialState] - PortalNotifications state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_LATEST_NOTIFICATION:
      return update(state, {
        showNotification: { $set: false },
        ui: {
          loading: { $set: true }
        }
      })
    case FETCH_LATEST_NOTIFICATION_SUCCESS:
      return update(state, {
        notification: {$set: action.data},
        showNotification: { $set: true },
        ui: {
          loading: { $set: false }
        }
      })
    case FETCH_LATEST_NOTIFICATION_ERROR:
      return update(state, {
        notification: {$set: {}},
        showNotification: { $set: false },
        ui: {
          loading: { $set: false }
        }
      })
    default:
      return state
  }
}

/**
 * Fetch Portal Notification action creator
 */
export function fetchLatestNotification () {
  return { type: FETCH_LATEST_NOTIFICATION }
}

/**
 * Fetch Portal Notification success
 * @param {Object} data - data received from the successful call
 */
export function fetchLatestNotificationSuccess (data) {
  return { type: FETCH_LATEST_NOTIFICATION_SUCCESS, data }
}

/**
 * Fetch Portal Notification error
 */
export function fetchLatestNotificationError (error) {
  return { type: FETCH_LATEST_NOTIFICATION_ERROR, error }
}
