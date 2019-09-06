/**
 * @module ApiSubscriptions/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_API_SUBSCRIPTIONS = 'ApiSubscriptions/FETCH_API_SUBSCRIPTIONS'
export const FETCH_API_SUBSCRIPTIONS_SUCCESS = 'ApiSubscriptions/FETCH_API_SUBSCRIPTIONS_SUCCESS'
export const FETCH_API_SUBSCRIPTIONS_ERROR = 'ApiSubscriptions/FETCH_API_SUBSCRIPTIONS_ERROR'
export const CREATE_API_SUBSCRIPTION = 'ApiSubscriptions/CREATE_API_SUBSCRIPTION'
export const CREATE_API_SUBSCRIPTION_SUCCESS = 'ApiSubscriptions/CREATE_API_SUBSCRIPTION_SUCCESS'
export const CREATE_API_SUBSCRIPTION_ERROR = 'ApiSubscriptions/CREATE_API_SUBSCRIPTION_ERROR'

/**
 * ApiSubscriptions state
 * @typedef {Object} state
 * @prop {array} [data] - API Subscriptions data
 */
const initialState = {
  brands: [],
  products: [],
  ui: {
    loading: false
  }
}

/**
 * Reducer
 * @param {state} [state=initialState] - ApiSubscriptions state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_API_SUBSCRIPTIONS:
    case CREATE_API_SUBSCRIPTION:
      return update(state, {
        ui: {
          loading: { $set: true }
        }
      })
    case FETCH_API_SUBSCRIPTIONS_SUCCESS:
      return update(state, {
        products: {$set: action.data.products},
        brands: {$set: action.data.brands},
        ui: {
          loading: { $set: false }
        }
      })
    case FETCH_API_SUBSCRIPTIONS_ERROR:
      return update(state, {
        products: {$set: []},
        brands: {$set: []},
        ui: {
          loading: { $set: false }
        }
      })
    case CREATE_API_SUBSCRIPTION_SUCCESS:
      return update(state, {
        products: {$set: action.data.products},
        brands: {$set: action.data.brands},
        ui: {
          loading: { $set: false }
        }
      })
    case CREATE_API_SUBSCRIPTION_ERROR:
      return update(state, {
        ui: {
          loading: { $set: false }
        }
      })
    default:
      return state
  }
}

/**
 * Fetch API Subscriptions action creator
 */
export function fetchApiSubscriptions () {
  return { type: FETCH_API_SUBSCRIPTIONS }
}

/**
 * Fetch API Subscriptions success
 * @param {Object} data - data received from the successful call
 */
export function fetchApiSubscriptionsSuccess (data) {
  return { type: FETCH_API_SUBSCRIPTIONS_SUCCESS, data }
}

/**
 * Fetch API Subsciptions error
 */
export function fetchApiSubscriptionsError (error) {
  return { type: FETCH_API_SUBSCRIPTIONS_ERROR, error }
}

/**
 * Create API Subscription action creator
 */
export function createApiSubscription (organizationId, productIds) {
  return { type: CREATE_API_SUBSCRIPTION, organizationId, productIds }
}

/**
 * Create API Subscription success
 * @param {Object} data - data received from the successful call
 */
export function createApiSubscriptionSuccess (data) {
  return { type: CREATE_API_SUBSCRIPTION_SUCCESS, data }
}

/**
 * Create API Subscriptions error
 */
export function createApiSubscriptionError (error) {
  return { type: CREATE_API_SUBSCRIPTION_ERROR, error }
}
