/**
 * @module ExceptionRules/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_APIS,
  fetchApisSuccess,
  fetchApisError,
  FETCH_ENDPOINTS,
  fetchEndpointsSuccess,
  fetchEndpointsError,
  FETCH_SCENARIOS,
  fetchScenariosSuccess,
  fetchScenariosError,
  GET_SCENARIO,
  getScenarioSuccess,
  getScenarioError,
} from './ducks'
import qs from 'qs'

/**
 * Fetch endpoints
 * @param {Object} action
 */
function * fetchApis (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/apis`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchApisSuccess(response.data))
  } else {
    yield put(fetchApisError(response.err))
  }
}

/**
 * Fetch endpoints
 * @param {Object} action
 */
function * fetchEndpoints (action) {
  const { page, pageSize, apiName, version } = action
  const queryParams = qs.stringify({ page, pageSize, apiName, version }, { addQueryPrefix: true })
  const state = yield select()
  const requestUrl = `${API_URL}/endpoints${queryParams}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchEndpointsSuccess(response.data))
  } else {
    yield put(fetchEndpointsError(response.err))
  }
}

/**
 * Fetch scenarios
 * @param {Object} action
 */
function * fetchScenarios (action) {
  const { endpoints } = action
  const queryParams = qs.stringify({ endpoints }, { addQueryPrefix: true })
  const state = yield select()
  const requestUrl = `${API_URL}/scenarios${queryParams}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchScenariosSuccess(response.data))
  } else {
    yield put(fetchScenariosError(response.err))
  }
}

/**
 * Get scenario
 * @param {Object} action
 * @param {data} action.scenarioId
 */
function * getScenario (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/scenarios/${action.scenarioId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(getScenarioSuccess(response.data))
  } else {
    yield put(getScenarioError(response.err))
  }
}

export function * rootSaga () {
  yield takeLatest(FETCH_APIS, fetchApis)
  yield takeLatest(FETCH_ENDPOINTS, fetchEndpoints)
  yield takeLatest(FETCH_SCENARIOS, fetchScenarios)
  yield takeLatest(GET_SCENARIO, getScenario)
}

export default rootSaga
