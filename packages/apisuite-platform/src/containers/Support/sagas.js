/**
 * @module Support/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  SEND_SUPPORT_FORM,
  sendSupportFormSuccess,
  sendSupportFormError,
  resetSupportModal
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Send support form saga worker
 * @param {Object} action
 * @param {userData} action.userData
 */
function * sendSupportForm (action) {
  const requestUrl = `${API_URL}/support/ticket`
  const body = JSON.stringify(action.form)

  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  headers['Content-Type'] = 'application/json'

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(sendSupportFormSuccess(response.data))
    yield put(showNotification('success', 'support.success'))
    yield put(resetSupportModal())
  } else {
    yield put(sendSupportFormError(response.err))
    yield put(showNotification('error', 'support.error'))
  }
}

/**
 * Sign up saga
 */
export function * sendSupportFormSaga () {
  yield takeLatest(SEND_SUPPORT_FORM, sendSupportForm)
}

export default [sendSupportFormSaga]
