import update from 'immutability-helper'

/**
* Constants
*/
export const FETCH_ACTIVITIES = 'ActivityLog/FETCH_ACTIVITIES'
export const FETCH_ACTIVITIES_SUCCESS = 'ActivityLog/FETCH_ACTIVITIES_SUCCESS'
export const FETCH_ACTIVITIES_ERROR = 'ActivityLog/FETCH_ACTIVITIES_ERROR'
export const FETCH_KPIS = 'ActivityLog/FETCH_KPIS'
export const FETCH_KPIS_SUCCESS = 'ActivityLog/FETCH_KPIS_SUCCESS'
export const FETCH_KPIS_ERROR = 'ActivityLog/FETCH_KPIS_ERROR'

/**
 * ActivityLog state
 * @typedef {Object} state
 * @prop {object} data - activity log data
 * @prop {object} ui - ui state
 */
const initialState = {
  logs: {},
  kpis: {},
  ui: {
    loading: false,
  },
}
/**
 * Reducer
 * @param {state} [state=initialState] - ActivityLog state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ACTIVITIES:
    case FETCH_KPIS:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      })
    case FETCH_ACTIVITIES_SUCCESS:
      return update(state, {
        logs: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_ACTIVITIES_ERROR:
      return update(state, {
        logs: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_KPIS_SUCCESS:
      return update(state, {
        kpis: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_KPIS_ERROR:
      return update(state, {
        kpis: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * Fetch activities action creator
 */
export function fetchActivities (filters) {
  return { type: FETCH_ACTIVITIES, filters }
}

/**
 * Fetch activities success action creator
 */
export function fetchActivitiesSuccess (data) {
  return { type: FETCH_ACTIVITIES_SUCCESS, data }
}

/**
 * Fetch activities error action creator
 */
export function fetchActivitiesError (error) {
  return { type: FETCH_ACTIVITIES_ERROR, error }
}

/**
 * Fetch kpis action creator
 */
export function fetchKpis () {
  return { type: FETCH_KPIS }
}

/**
 * Fetch kpis success action creator
 */
export function fetchKpisSuccess (data) {
  return { type: FETCH_KPIS_SUCCESS, data }
}

/**
 * Fetch kpis error action creator
 */
export function fetchKpisError (error) {
  return { type: FETCH_KPIS_ERROR, error }
}
