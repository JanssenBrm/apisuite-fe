/**
 * @module Profile/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  FETCH_API,
  getApiDocsSuccess,
  getApiDocsError,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Fetch api saga worker
 * @param {Object} action
 */
function * getApiDocsWorker (action) {
  const requestUrl = `${API_URL}/api-docs/${action.brand}/${action.productId}/${action.role}/${action.version}`

  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(getApiDocsSuccess(response.data))
  } else {
    yield put(getApiDocsError(response.err))
    yield put(showNotification('error', 'api.docs.error'))
  }
}

/**
 * Fetch api saga
 */
export function * getApiDocsSaga () {
  yield takeLatest(FETCH_API, getApiDocsWorker)
}

export default [getApiDocsSaga]
