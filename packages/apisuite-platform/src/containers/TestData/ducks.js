/**
 * @module TestData/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_TESTDATA = 'TestData/FETCH_TESTDATA'
export const FETCH_TESTDATA_SUCCESS = 'TestData/FETCH_TESTDATA_SUCCESS'
export const FETCH_TESTDATA_ERROR = 'TestData/FETCH_TESTDATA_ERROR'
export const GET_TESTUSER = 'TestData/GET_TESTUSER'
export const GET_TESTUSER_SUCCESS = 'TestData/GET_TESTUSER_SUCCESS'
export const GET_TESTUSER_ERROR = 'TestData/GET_TESTUSER_ERROR'
export const CREATE_TESTUSER = 'TestData/CREATE_TESTUSER'
export const CREATE_TESTUSER_SUCCESS = 'TestData/CREATE_TESTUSER_SUCCESS'
export const CREATE_TESTUSER_ERROR = 'TestData/CREATE_TESTUSER_ERROR'
export const UPDATE_TESTUSER = 'TestData/UPDATE_TESTUSER'
export const UPDATE_TESTUSER_SUCCESS = 'TestData/UPDATE_TESTUSER_SUCCESS'
export const UPDATE_TESTUSER_ERROR = 'TestData/UPDATE_TESTUSER_ERROR'
export const GET_TESTUSER_ACCOUNTS = 'TestData/GET_TESTUSER_ACCOUNTS'
export const GET_TESTUSER_ACCOUNTS_SUCCESS = 'TestData/GET_TESTUSER_ACCOUNTS_SUCCESS'
export const GET_TESTUSER_ACCOUNTS_ERROR = 'TestData/GET_TESTUSER_ACCOUNTS_ERROR'
export const GET_TESTUSER_TRANSACTIONS = 'TestData/GET_TESTUSER_TRANSACTIONS'
export const GET_TESTUSER_TRANSACTIONS_SUCCESS = 'TestData/GET_TESTUSER_TRANSACTIONS_SUCCESS'
export const GET_TESTUSER_TRANSACTIONS_ERROR = 'TestData/GET_TESTUSER_TRANSACTIONS_ERROR'

/**
 * TestData state
 * @typedef {Object} state
 * @prop {array} [data] - Test users data
 */
const initialState = {
  data: {},
  testuser: {},
  accounts: {},
  transactions: {},
  ui: {
    loading: false
  }
}

/**
 * Reducer
 * @param {state} [state=initialState] - TestData state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_TESTDATA:
    case GET_TESTUSER:
    case CREATE_TESTUSER:
    case UPDATE_TESTUSER:
    case GET_TESTUSER_ACCOUNTS:
    case GET_TESTUSER_TRANSACTIONS:
      return update(state, {
        ui: {
          loading: { $set: true }
        }
      })
    case FETCH_TESTDATA_SUCCESS:
      return update(state, {
        data: { $set: action.data },
        ui: {
          loading: { $set: false }
        }
      })
    case FETCH_TESTDATA_ERROR:
      return update(state, {
        data: { $set: [] },
        ui: {
          loading: { $set: false }
        }
      })
    case CREATE_TESTUSER_SUCCESS:
      return update(state, {
        data: {
          users: { $push: [action.data] }
        },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_SUCCESS:
      return update(state, {
        testuser: { $set: action.data },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_ERROR:
      return update(state, {
        testuser: { $set: {} },
        ui: {
          loading: { $set: false }
        }
      })
    case UPDATE_TESTUSER_SUCCESS:
      return update(state, {
        testuser: { $set: action.data },
        ui: {
          loading: { $set: false }
        }
      })
    case CREATE_TESTUSER_ERROR:
    case UPDATE_TESTUSER_ERROR:
      return update(state, {
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_ACCOUNTS_SUCCESS:
      return update(state, {
        accounts: { $set: action.data },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_ACCOUNTS_ERROR:
      return update(state, {
        accounts: { $set: {} },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_TRANSACTIONS_SUCCESS:
      return update(state, {
        transactions: { $set: action.data },
        ui: {
          loading: { $set: false }
        }
      })
    case GET_TESTUSER_TRANSACTIONS_ERROR:
      return update(state, {
        transactions: { $set: {} },
        ui: {
          loading: { $set: false }
        }
      })
    default:
      return state
  }
}

/**
 * Fetch TestData action creator
 */
export function fetchTestData (page = 1, pageSize = 5) {
  return { type: FETCH_TESTDATA, page, pageSize }
}

/**
 * Fetch TestData success
 * @param {Object} data - data received from the successful call
 */
export function fetchTestDataSuccess (data) {
  return { type: FETCH_TESTDATA_SUCCESS, data }
}

/**
 * Fetch TestData error
 */
export function fetchTestDataError (error) {
  return { type: FETCH_TESTDATA_ERROR, error }
}

/**
 * Get test user action creator
 */
export function getTestUser (organizationId, psuId) {
  return { type: GET_TESTUSER, organizationId, psuId }
}

/**
 * Get test user success
 * @param {Object} data - data received from the successful call
 */
export function getTestUserSuccess (data) {
  return { type: GET_TESTUSER_SUCCESS, data }
}

/**
 * Get test user error
 */
export function getTestUserError (error) {
  return { type: GET_TESTUSER_ERROR, error }
}

/**
 * Create test user action creator
 */
export function createTestUser (organizationId, data) {
  return { type: CREATE_TESTUSER, organizationId, data }
}

/**
 * Create test user success
 * @param {Object} data - data received from the successful call
 */
export function createTestUserSuccess (data) {
  return { type: CREATE_TESTUSER_SUCCESS, data }
}

/**
 * Create test user error
 */
export function createTestUserError (error) {
  return { type: CREATE_TESTUSER_ERROR, error }
}

/**
 * Update test user action creator
 */
export function updateTestUser (organizationId, psuId, psuData) {
  return { type: UPDATE_TESTUSER, organizationId, psuId, psuData }
}

/**
 * Update test user success
 * @param {Object} data - data received from the successful call
 */
export function updateTestUserSuccess (data) {
  return { type: UPDATE_TESTUSER_SUCCESS, data }
}

/**
 * Update test user error
 */
export function updateTestUserError (error) {
  return { type: UPDATE_TESTUSER_ERROR, error }
}

/**
 * Get test user accounts action creator
 */
export function getTestUserAccounts () {
  return { type: GET_TESTUSER_ACCOUNTS }
}

/**
 * Get test user account types success
 * @param {Object} data - data received from the successful call
 */
export function getTestUserAccountsSuccess (data) {
  return { type: GET_TESTUSER_ACCOUNTS_SUCCESS, data }
}

/**
 * Get test user account types error
 */
export function getTestUserAccountsError (error) {
  return { type: GET_TESTUSER_ACCOUNTS_ERROR, error }
}

/**
 * Get test user transactions action creator
 */
export function getTestUserTransactions (organizationId, resourceId) {
  return { type: GET_TESTUSER_TRANSACTIONS, organizationId, resourceId }
}

/**
 * Get test user transactions success
 * @param {Object} data - data received from the successful call
 */
export function getTestUserTransactionsSuccess (data) {
  return { type: GET_TESTUSER_TRANSACTIONS_SUCCESS, data }
}

/**
 * Get test user transactions error
 */
export function getTestUserTransactionsError (error) {
  return { type: GET_TESTUSER_TRANSACTIONS_ERROR, error }
}
