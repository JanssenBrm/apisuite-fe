/**
 * @module Auth/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { push } from 'react-router-redux'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  GET_CODES,
  getCodesSuccess,
  getCodesError
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Get recovery codes saga worker
 * @param {Object} action
 */
function * getCodesWorker (action) {
  const requestUrl = `${API_URL}/users/me/recovery_codes`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({pass: action.pass})

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(getCodesSuccess(response.data.codes))
    yield put(push('/recovery-codes'))
  } else {
    yield put(getCodesError(response.err))
    yield put(showNotification('error', 'twofa.recoverycodes.error'))
  }
}

/**
 * Get recovery codes saga
 */
export function * getCodesSaga () {
  yield takeLatest(GET_CODES, getCodesWorker)
}

export default [
  getCodesSaga
]
