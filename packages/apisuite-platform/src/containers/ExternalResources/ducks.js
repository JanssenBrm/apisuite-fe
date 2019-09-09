import update from 'immutability-helper'

/**
* Constants
*/
export const FETCH_RESOURCES = 'ExternalResources/FETCH_RESOURCES'
export const FETCH_RESOURCES_SUCCESS = 'ExternalResources/FETCH_RESOURCES_SUCCESS'
export const FETCH_RESOURCES_ERROR = 'ExternalResources/FETCH_RESOURCES_ERROR'

/**
 * ExternalResources state
 * @typedef {Object} state
 * @prop {array} [data] - External resources
 * @prop {Object} [ui] - ui state
 */
const initialState = {
  data: {
    external_resources: [],
    source_account: '',
    pagination: {},
  },
  ui: {
    loading: false,
  },
}
/**
 * Reducer
 * @param {state} [state=initialState] - ExternalResources state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_RESOURCES:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      })
    case FETCH_RESOURCES_SUCCESS:
      return update(state, {
        data: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_RESOURCES_ERROR:
      return update(state, {
        data: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * Fetch external resources action creator
 */
export function fetchResources (page = 1, pageSize = 10) {
  return { type: FETCH_RESOURCES, page, pageSize }
}

/**
 * Fetch external resources success
 * @param {Object} data - data received from the successful call
 */
export function fetchResourcesSuccess (data) {
  return { type: FETCH_RESOURCES_SUCCESS, data }
}

/**
 * Fetch external resources error
 */
export function fetchResourcesError (error) {
  return { type: FETCH_RESOURCES_ERROR, error }
}
