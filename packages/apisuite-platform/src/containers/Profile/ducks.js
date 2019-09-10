/**
 * @module Auth/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_ORGANIZATIONS = 'Settings/FETCH_ORGANIZATIONS'
export const FETCH_ORGANIZATIONS_SUCCESS = 'Settings/FETCH_ORGANIZATIONS_SUCCESS'
export const FETCH_ORGANIZATIONS_ERROR = 'Settings/FETCH_ORGANIZATIONS_ERROR'
export const UPDATE_ORGANIZATION = 'Settings/UPDATE_ORGANIZATION'
export const UPDATE_ORGANIZATION_SUCCESS = 'Settings/UPDATE_ORGANIZATION_SUCCESS'
export const UPDATE_ORGANIZATION_ERROR = 'Settings/UPDATE_ORGANIZATION_ERROR'
export const GET_ONBOARDING_TOKEN = 'Settings/GET_ONBOARDING_TOKEN'
export const GET_ONBOARDING_TOKEN_SUCCESS = 'Settings/GET_ONBOARDING_TOKEN_SUCCESS'
export const GET_ONBOARDING_TOKEN_ERROR = 'Settings/GET_ONBOARDING_TOKEN_ERROR'

/**
 * Profile state
 * @typedef {Object} state
 * @prop {array} [data] - profile data
 * @prop {object} organization - current organization object
 * @prop {object} ui - ui state
 * @prop {object} onboardingToken - onboarding token info
 */
const initialState = {
  data: [],
  organization: {},
  ui: {
    loading: false,
  },
  onboardingToken: {},
}

/**
 * Reducer
 * @param {state} [state=initialState] - Auth state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_ORGANIZATIONS:
    case UPDATE_ORGANIZATION:
    case GET_ONBOARDING_TOKEN:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      })
    case FETCH_ORGANIZATIONS_SUCCESS:
      return update(state, {
        data: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_ORGANIZATIONS_ERROR:
      return update(state, {
        data: { $set: [] },
        ui: {
          loading: { $set: false },
        },
      })

    case UPDATE_ORGANIZATION_SUCCESS: {
      const organizationIndex = state.data.findIndex(organization => organization.id === action.data.id)

      return update(state, {
        data: { [organizationIndex]: { $set: action.data } },
        organization: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    }

    case UPDATE_ORGANIZATION_ERROR:
      return update(state, {
        ui: {
          loading: { $set: false },
        },
      })
    case GET_ONBOARDING_TOKEN_SUCCESS:
      return update(state, {
        onboardingToken: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case GET_ONBOARDING_TOKEN_ERROR:
      return update(state, {
        onboardingToken: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * Fetch Organizations action creator
 */
export function fetchOrganizations () {
  return { type: FETCH_ORGANIZATIONS }
}

/**
 * Fetch Organizations success
 * @param {Object} data - data received from the successful call
 */
export function fetchOrganizationsSuccess (data) {
  return { type: FETCH_ORGANIZATIONS_SUCCESS, data }
}

/**
 * Fetch Organizations error
 */
export function fetchOrganizationsError (error) {
  return { type: FETCH_ORGANIZATIONS_ERROR, error }
}

/**
 * Update organization action creator
 */
export function updateOrganization (id, organizationData) {
  return { type: UPDATE_ORGANIZATION, id, organizationData }
}

/**
 * Update organization success
 * @param {Object} data - data received from the successful call
 */
export function updateOrganizationSuccess (data) {
  return { type: UPDATE_ORGANIZATION_SUCCESS, data }
}

/**
 * Update organization error
 */
export function updateOrganizationError (error) {
  return { type: UPDATE_ORGANIZATION_ERROR, error }
}

/**
 * Get onboarding access token action creator
 */
export function getOnboardingToken () {
  return { type: GET_ONBOARDING_TOKEN }
}

/**
 * Get onboarding access token success
 * @param {Object} data - data received from the successful call
 */
export function getOnboardingTokenSuccess (data) {
  return { type: GET_ONBOARDING_TOKEN_SUCCESS, data }
}

/**
 * Get onboarding access token error
 */
export function getOnboardingTokenError (error) {
  return { type: GET_ONBOARDING_TOKEN_ERROR, error }
}
