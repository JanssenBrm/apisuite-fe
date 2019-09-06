/**
 * @module TestData/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_TESTDATA,
  fetchTestDataSuccess,
  fetchTestDataError,
  GET_TESTUSER,
  getTestUserSuccess,
  getTestUserError,
  CREATE_TESTUSER,
  createTestUserSuccess,
  createTestUserError,
  UPDATE_TESTUSER,
  updateTestUserSuccess,
  updateTestUserError,
  GET_TESTUSER_ACCOUNTS,
  getTestUserAccountsSuccess,
  getTestUserAccountsError,
  GET_TESTUSER_TRANSACTIONS,
  getTestUserTransactionsSuccess,
  getTestUserTransactionsError
} from './ducks'
import qs from 'qs'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Fetch test users saga worker
 * @param {Object} action
 */
function * fetchTestDataWorker (action) {
  const { page, pageSize } = action
  const queryParams = qs.stringify({ page, pageSize }, { addQueryPrefix: true })
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/organizations/${organizationId}/testdata${queryParams}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchTestDataSuccess(response.data))
  } else {
    yield put(fetchTestDataError(response.err))
  }
}

/**
 * Fetch test users saga
 */
export function * fetchTestDataSaga () {
  yield takeLatest(FETCH_TESTDATA, fetchTestDataWorker)
}

/**
 * Get test user saga worker
 * @param {Object} action
 * @param {data} action.appId
 */
function * getTestUserWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/testdata/${action.psuId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(getTestUserSuccess(response.data))
  } else {
    yield put(getTestUserError(response.err))
  }
}

/**
 * Get test user saga
 */
export function * getTestUserSaga () {
  yield takeLatest(GET_TESTUSER, getTestUserWorker)
}

/**
 * Create test user saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * createTestUserWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/testdata`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(createTestUserSuccess(response.data))
    yield put(showNotification('success', 'createTestUser.success'))
  } else {
    yield put(createTestUserError(response.err))
    yield put(showNotification('error', 'createTestUser.error'))
  }
}

/**
 * Create test user saga
 */
export function * createTestUserSaga () {
  yield takeLatest(CREATE_TESTUSER, createTestUserWorker)
}

/**
 * Update test user saga worker
 * @param {Object} action
 * @param {data} action.userData
 */
function * updateTestUserWorker (action) {
  const { psuId, psuData } = action
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/testdata/${psuId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(psuData)

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body
  })

  if (!response.err) {
    yield put(updateTestUserSuccess(response.data))
    yield put(showNotification('success', 'app.update.success'))
  } else {
    yield put(updateTestUserError(response.err))
    yield put(showNotification('error', 'app.update.error'))
  }
}

/**
 * Update test user saga
 */
export function * updateTestUserSaga () {
  yield takeLatest(UPDATE_TESTUSER, updateTestUserWorker)
}

/**
 * Get test user accounts saga worker
 * @param {Object} action
 * @param {data} action.appId
 */
function * getTestUserAccountsWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/testdata/form`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(getTestUserAccountsSuccess(response.data))
  } else {
    yield put(getTestUserAccountsError(response.err))
  }
}

/**
 * Get test user saga
 */
export function * getTestUserAccountsSaga () {
  yield takeLatest(GET_TESTUSER_ACCOUNTS, getTestUserAccountsWorker)
}

/**
 * Get test user transaction saga worker
 * @param {Object} action
 * @param {data} action.appId
 */
function * getTestUserTransactionsWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/testdata/${action.resourceId}/transactions`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(getTestUserTransactionsSuccess(response.data))
  } else {
    yield put(getTestUserTransactionsError(response.err))
  }
}

/**
 * Get test user saga
 */
export function * getTestUserTransactionsSaga () {
  yield takeLatest(GET_TESTUSER_TRANSACTIONS, getTestUserTransactionsWorker)
}

export default [fetchTestDataSaga, getTestUserSaga, createTestUserSaga, updateTestUserSaga, getTestUserAccountsSaga, getTestUserTransactionsSaga]
