/**
 * @module ApiSubscriptions/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_API_SUBSCRIPTIONS,
  fetchApiSubscriptionsSuccess,
  fetchApiSubscriptionsError,
  CREATE_API_SUBSCRIPTION,
  createApiSubscriptionSuccess,
  createApiSubscriptionError
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Fetch API Subscriptions saga worker
 * @param {Object} action
 */
function * fetchApiSubscriptionsWorker (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/organizations/${organizationId}/products`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchApiSubscriptionsSuccess(response.data))
  } else {
    yield put(fetchApiSubscriptionsError(response.err))
  }
}

/**
 * Fetch API Subscriptions saga
 */
export function * fetchApiSubscriptionsSaga () {
  yield takeLatest(FETCH_API_SUBSCRIPTIONS, fetchApiSubscriptionsWorker)
}

/**
 * Create API Subscription saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * createApiSubscriptionWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/organizations/${action.organizationId}/products`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({
    productIds: action.productIds
  })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(createApiSubscriptionSuccess(response.data))
    yield put(showNotification('success', 'apiSubscriptions.create.success'))
  } else {
    yield put(createApiSubscriptionError(response.err))
    yield put(showNotification('error', 'apiSubscriptions.create.error'))
  }
}

/**
 * Create API Subscription saga
 */
export function * createApiSubscriptionSaga () {
  yield takeLatest(CREATE_API_SUBSCRIPTION, createApiSubscriptionWorker)
}

export default [fetchApiSubscriptionsSaga, createApiSubscriptionSaga]
