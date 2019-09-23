/**
 * @module AppsPage/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_APPS = 'Apps/FETCH_APPS'
export const FETCH_APPS_SUCCESS = 'Apps/FETCH_APPS_SUCCESS'
export const FETCH_APPS_ERROR = 'Apps/FETCH_APPS_ERROR'
export const GET_APP = 'Apps/GET_APP'
export const GET_APP_SUCCESS = 'Apps/GET_APP_SUCCESS'
export const GET_APP_ERROR = 'Apps/GET_APP_ERROR'
export const UPDATE_APP = 'Apps/UPDATE_APP'
export const UPDATE_APP_SUCCESS = 'Apps/UPDATE_APP_SUCCESS'
export const UPDATE_APP_ERROR = 'Apps/UPDATE_APP_ERROR'
export const DELETE_APP = 'Apps/DELETE_APP'
export const DELETE_APP_SUCCESS = 'Apps/DELETE_APP_SUCCESS'
export const DELETE_APP_ERROR = 'Apps/DELETE_APP_ERROR'
export const CREATE_APP = 'Apps/CREATE_APP'
export const CREATE_APP_SUCCESS = 'Apps/CREATE_APP_SUCCESS'
export const CREATE_APP_ERROR = 'Apps/CREATE_APP_ERROR'

/**
 * AppsPage state
 * @typedef {Object} state
 * @prop {array} [data] - Apps data
 */
const initialState = {
  data: [],
  app: {},
  ui: {
    loading: false,
  },
}

/**
 * Reducer
 * @param {state} [state=initialState] - AppsPage state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_APPS:
    case GET_APP:
    case CREATE_APP:
    case UPDATE_APP:
    case DELETE_APP:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      })
    case FETCH_APPS_SUCCESS:
      return update(state, {
        data: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_APPS_ERROR:
      return update(state, {
        data: { $set: [] },
        ui: {
          loading: { $set: false },
        },
      })
    case CREATE_APP_SUCCESS:
      return update(state, {
        data: { $push: [action.data] },
        ui: {
          loading: { $set: false },
        },
      })
    case GET_APP_SUCCESS:
      return update(state, {
        app: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case GET_APP_ERROR:
      return update(state, {
        app: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })

    case UPDATE_APP_SUCCESS: {
      const appIndex = state.data.findIndex(app => app.id === action.data.id)

      return update(state, {
        data: {
          $apply: apps => {
            if (appIndex !== -1) {
              apps[appIndex] = action.data
            }
            return apps
          },
        },
        app: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    }

    case CREATE_APP_ERROR:
    case UPDATE_APP_ERROR:
    case DELETE_APP_ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      })
    case DELETE_APP_SUCCESS:
      return update(state, {
        data: { $apply: apps => apps.filter(app => action.data.id !== app.id) },
        app: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * Fetch Apps action creator
 */
export function fetchApps (organizationId) {
  return { type: FETCH_APPS, organizationId }
}

/**
 * Fetch Apps success
 * @param {Object} data - data received from the successful call
 */
export function fetchAppsSuccess (data) {
  return { type: FETCH_APPS_SUCCESS, data }
}

/**
 * Fetch Apps error
 */
export function fetchAppsError (error) {
  return { type: FETCH_APPS_ERROR, error }
}

/**
 * Get App action creator
 */
export function getApp (organizationId, appId) {
  return { type: GET_APP, organizationId, appId }
}

/**
 * Get App success
 * @param {Object} data - data received from the successful call
 */
export function getAppSuccess (data) {
  return { type: GET_APP_SUCCESS, data }
}

/**
 * Get App error
 */
export function getAppError (error) {
  return { type: GET_APP_ERROR, error }
}

/**
 * Create App action creator
 */
export function createApp (organizationId, data) {
  return { type: CREATE_APP, organizationId, data }
}

/**
 * Create App success
 * @param {Object} data - data received from the successful call
 */
export function createAppSuccess (data) {
  return { type: CREATE_APP_SUCCESS, data }
}

/**
 * Create App error
 */
export function createAppError (error) {
  return { type: CREATE_APP_ERROR, error }
}

/**
 * Update App action creator
 */
export function updateApp (organizationId, appData) {
  return { type: UPDATE_APP, organizationId, appData }
}

/**
 * Update App success
 * @param {Object} data - data received from the successful call
 */
export function updateAppSuccess (data) {
  return { type: UPDATE_APP_SUCCESS, data }
}

/**
 * Update App error
 */
export function updateAppError (error) {
  return { type: UPDATE_APP_ERROR, error }
}

/**
 * Delete App action creator
 */
export function deleteApp (organizationId, appId) {
  return { type: DELETE_APP, organizationId, appId }
}

/**
 * Delete App success
 * @param {Object} data - data received from the successful call
 */
export function deleteAppSuccess (data) {
  return { type: DELETE_APP_SUCCESS, data }
}

/**
 * Delete App error
 */
export function deleteAppError (error) {
  return { type: DELETE_APP_ERROR, error }
}
