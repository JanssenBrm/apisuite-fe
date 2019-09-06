/**
 * @module ApiSubscriptions/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_LATEST_NOTIFICATION,
  fetchLatestNotificationSuccess,
  fetchLatestNotificationError
} from './ducks'

/**
 * Fetch Portal Latest Notification saga worker
 * @param {Object} action
 */
function * fetchLatestNotificationWorker (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/notifications/latest`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(fetchLatestNotificationSuccess(response.data))
  } else {
    yield put(fetchLatestNotificationError(response.err))
  }
}

/**
 * Fetch Latest notification saga
 */
export function * fetchLatestNotificationSaga () {
  yield takeLatest(FETCH_LATEST_NOTIFICATION, fetchLatestNotificationWorker)
}

export default [fetchLatestNotificationSaga]
