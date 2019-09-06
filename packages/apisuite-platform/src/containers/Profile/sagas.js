/**
 * @module Profile/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_ORGANIZATIONS,
  fetchOrganizationsSuccess,
  fetchOrganizationsError,
  UPDATE_ORGANIZATION,
  updateOrganizationSuccess,
  updateOrganizationError,
  GET_ONBOARDING_TOKEN,
  getOnboardingTokenSuccess,
  getOnboardingTokenError
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Fetch organizations saga worker
 * @param {Object} action
 */
function * fetchOrganizationsWorker (action) {
  const requestUrl = `${API_URL}/organizations`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchOrganizationsSuccess(response.data))
  } else {
    yield put(fetchOrganizationsError(response.err))
  }
}

/**
 * Fetch organizations saga
 */
export function * fetchOrganizationsSaga () {
  yield takeLatest(FETCH_ORGANIZATIONS, fetchOrganizationsWorker)
}

/**
 * Update organization saga worker
 * @param {Object} action
 * @param {data} action.appData
 */
function * updateOrganizationWorker (action) {
  const requestUrl = `${API_URL}/organizations/${action.id}`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.organizationData)

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body
  })

  if (!response.err) {
    yield put(updateOrganizationSuccess(response.data))
    yield put(showNotification('success', 'organisation.update.success'))
  } else {
    yield put(updateOrganizationError(response.err))
    yield put(showNotification('error', 'organisation.update.error'))
  }
}

/**
 * Update organization saga
 */
export function * updateOrganizationSaga () {
  yield takeLatest(UPDATE_ORGANIZATION, updateOrganizationWorker)
}

/**
 * Get onboarding access token saga worker
 * @param {Object} action
 */
function * getOnboardingTokenWorker (action) {
  const requestUrl = `${API_URL}/onboarding/token`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers
  })

  if (!response.err) {
    yield put(getOnboardingTokenSuccess(response.data))
    yield put(showNotification('success', 'organisation.onboardingToken.renew.success'))
  } else {
    yield put(getOnboardingTokenError(response.err))
    yield put(showNotification('error', 'organisation.onboardingToken.renew.error'))
  }
}

/**
 * Get onboarding access token saga
 */
export function * getOnboardingTokenSaga () {
  yield takeLatest(GET_ONBOARDING_TOKEN, getOnboardingTokenWorker)
}

export default [fetchOrganizationsSaga, updateOrganizationSaga, getOnboardingTokenSaga]
