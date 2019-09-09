/**
 * @module Scenarios/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const FETCH_APIS = 'Scenarios/FETCH_APIS'
export const FETCH_APIS_SUCCESS = 'Scenarios/FETCH_APIS_SUCCESS'
export const FETCH_APIS_ERROR = 'Scenarios/FETCH_APIS_ERROR'
export const FETCH_ENDPOINTS = 'Scenarios/FETCH_ENDPOINTS'
export const FETCH_ENDPOINTS_SUCCESS = 'Scenarios/FETCH_ENDPOINTS_SUCCESS'
export const FETCH_ENDPOINTS_ERROR = 'Scenarios/FETCH_ENDPOINTS_ERROR'
export const FETCH_SCENARIOS = 'Scenarios/FETCH_SCENARIOS'
export const FETCH_SCENARIOS_SUCCESS = 'Scenarios/FETCH_SCENARIOS_SUCCESS'
export const FETCH_SCENARIOS_ERROR = 'Scenarios/FETCH_SCENARIOS_ERROR'
export const GET_SCENARIO = 'Scenarios/GET_SCENARIO'
export const GET_SCENARIO_SUCCESS = 'Scenarios/GET_SCENARIO_SUCCESS'
export const GET_SCENARIO_ERROR = 'Scenarios/GET_SCENARIO_ERROR'

/**
 * ScenariosPage state
 * @typedef {Object} state
 * @prop {array} [data] - Scenarios data
 */
const initialState = {
  data: [],
  scenario: {},
  endpoints: {},
  apis: [],
  ui: {
    loading: false,
  },
}

/**
 * Reducer
 * @param {state} [state=initialState] - Scenarios state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case FETCH_APIS:
    case FETCH_SCENARIOS:
    case FETCH_ENDPOINTS:
    case GET_SCENARIO:
      return update(state, {
        ui: {
          loading: { $set: true },
        },
      })
    case FETCH_APIS_SUCCESS:
      return update(state, {
        apis: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_APIS_ERROR:
      return update(state, {
        apis: { $set: [] },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_ENDPOINTS_SUCCESS:
      return update(state, {
        endpoints: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_ENDPOINTS_ERROR:
      return update(state, {
        endpoints: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_SCENARIOS_SUCCESS:
      return update(state, {
        data: { $set: action.data.records },
        scenario: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    case FETCH_SCENARIOS_ERROR:
      return update(state, {
        data: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    case GET_SCENARIO_SUCCESS:
      return update(state, {
        scenario: { $set: action.data },
        ui: {
          loading: { $set: false },
        },
      })
    case GET_SCENARIO_ERROR:
      return update(state, {
        scenario: { $set: {} },
        ui: {
          loading: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * Fetch APIs action creator
 */
export function fetchApis () {
  return { type: FETCH_APIS }
}

/**
 * Fetch APIs success
 * @param {Object} data - data received from the successful call
 */
export function fetchApisSuccess (data) {
  return { type: FETCH_APIS_SUCCESS, data }
}

/**
 * Fetch APIs error
 */
export function fetchApisError (error) {
  return { type: FETCH_APIS_ERROR, error }
}

/**
 * Fetch Endpoints action creator
 */
export function fetchEndpoints (apiName, version) {
  return { type: FETCH_ENDPOINTS, apiName, version }
}

/**
 * Fetch Endpoints success
 * @param {Object} data - data received from the successful call
 */
export function fetchEndpointsSuccess (data) {
  return { type: FETCH_ENDPOINTS_SUCCESS, data }
}

/**
 * Fetch Endpoints error
 */
export function fetchEndpointsError (error) {
  return { type: FETCH_ENDPOINTS_ERROR, error }
}

/**
 * Fetch Scenarios action creator
 */
export function fetchScenarios (endpoints) {
  return { type: FETCH_SCENARIOS, endpoints }
}

/**
 * Fetch Scenarios success
 * @param {Object} data - data received from the successful call
 */
export function fetchScenariosSuccess (data) {
  return { type: FETCH_SCENARIOS_SUCCESS, data }
}

/**
 * Fetch Scenarios error
 */
export function fetchScenariosError (error) {
  return { type: FETCH_SCENARIOS_ERROR, error }
}

/**
 * Get Scenario action creator
 */
export function getScenario (scenarioId) {
  return { type: GET_SCENARIO, scenarioId }
}

/**
 * Get Scenario success
 * @param {Object} data - data received from the successful call
 */
export function getScenarioSuccess (data) {
  return { type: GET_SCENARIO_SUCCESS, data }
}

/**
 * Get Scenario error
 */
export function getScenarioError (error) {
  return { type: GET_SCENARIO_ERROR, error }
}
