/**
 * @module AppsPage/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_APPS,
  fetchAppsSuccess,
  fetchAppsError,
  GET_APP,
  getAppSuccess,
  getAppError,
  UPDATE_APP,
  updateAppSuccess,
  updateAppError,
  DELETE_APP,
  deleteAppSuccess,
  deleteAppError,
  CREATE_APP,
  createAppSuccess,
  createAppError,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'
import { push } from 'connected-react-router'

/**
 * Fetch apps saga worker
 * @param {Object} action
 */
function * fetchAppsWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/sandbox-apps`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(fetchAppsSuccess(response.data))
  } else {
    yield put(fetchAppsError(response.err))
  }
}

/**
 * Fetch apps saga
 */
export function * fetchAppsSaga () {
  yield takeLatest(FETCH_APPS, fetchAppsWorker)
}

/**
 * Get app saga worker
 * @param {Object} action
 * @param {data} action.appId
 */
function * getAppWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/sandbox-apps/${action.appId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(getAppSuccess(response.data))
  } else {
    yield put(getAppError(response.err))
  }
}

/**
 * Get app saga
 */
export function * getAppSaga () {
  yield takeLatest(GET_APP, getAppWorker)
}

/**
 * Create App saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * createAppWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/sandbox-apps`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(createAppSuccess(response.data))
    yield put(showNotification('success', 'createApp.success'))
  } else {
    yield put(createAppError(response.err))
    yield put(showNotification('error', 'createApp.error'))
  }
}

/**
 * Create App saga
 */
export function * createAppSaga () {
  yield takeLatest(CREATE_APP, createAppWorker)
}

/**
 * Update app saga worker
 * @param {Object} action
 * @param {data} action.appData
 */
function * updateAppWorker (action) {
  const { appData } = action
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/sandbox-apps/${appData.id}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({
    name: appData.name,
    description: appData.description,
    icon: appData.icon,
    publicURL: appData.publicURL,
    redirectURLs: appData.redirectURLs,
    productIds: appData.productIds,
  })

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    const data = { ...response.data }
    yield put(updateAppSuccess(data))
    yield put(showNotification('success', 'app.update.success'))
  } else {
    yield put(updateAppError(response.err))
    yield put(showNotification('error', 'app.update.error'))
  }
}

/**
 * Update app saga
 */
export function * updateAppSaga () {
  yield takeLatest(UPDATE_APP, updateAppWorker)
}

/**
 * Delete app saga worker
 * @param {Object} action
 * @param {data} action.appId
 */
function * deleteAppWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/sandbox-apps/${action.appId}`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'DELETE',
    headers,
  })

  if (!response.err) {
    yield put(deleteAppSuccess(response.data))
    yield put(push('/apps'))
    yield put(showNotification('success', 'app.delete.success'))
  } else {
    yield put(deleteAppError(response.err))
    yield put(showNotification('error', 'app.delete.error'))
  }
}

/**
 * Delete app saga
 */
export function * deleteAppSaga () {
  yield takeLatest(DELETE_APP, deleteAppWorker)
}

export default [fetchAppsSaga, getAppSaga, createAppSaga, updateAppSaga, deleteAppSaga]
