/**
 * @module Auth/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_API = 'API/FETCH_API'
export const FETCH_API_SUCCESS = 'API/FETCH_API_SUCCESS'
export const FETCH_API_ERROR = 'API/FETCH_API_ERROR'

/**
 * Reducer
 * @param {state} [state=initialState] - Signup state or initial state
 * @param {object} action - the action type and payload
 */
const initialState = {
  apidocs: {},
  ui: {
    loading: true,
  },
}

/**
 * Reducer
 * @param {state} [state=initialState] - Auth state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_API_SUCCESS:
      return update(state, {
        apidocs: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_API_ERROR:
      return update(state, {
        apidocs: { $set: {} },
        ui: {
          loading: { $set: true },
        },
      })

    default:
      return state
  }
}

/**
 * Fetch API action creator
 */
export function getApiDocs (brand, productId, role, version) {
  return { type: FETCH_API, brand, productId, role, version }
}

/**
 * Fetch API success
 * @param {Object} data - data received from the successful call
 */
export function getApiDocsSuccess (data) {
  return { type: FETCH_API_SUCCESS, data }
}

/**
 * Fetch API error
 */
export function getApiDocsError (error) {
  return { type: FETCH_API_ERROR, error }
}
