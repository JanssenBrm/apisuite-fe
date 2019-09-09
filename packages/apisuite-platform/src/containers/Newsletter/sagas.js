/**
 * @module Newsletter/sagas
 */

import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { API_URL } from 'constants/endpoints'
import {
  SEND_NEWSLETTER_FORM,
  sendNewsletterFormSuccess,
  sendNewsletterFormError,
  resetNewsletterForm,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * Send newsletter form saga worker
 * @param {Object} action
 * @param {data} action.data
 */
function * sendNewsletterForm (action) {
  const requestUrl = `${API_URL}/newsletter/subscribe`
  const body = JSON.stringify({ email: action.form })
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  headers['Content-Type'] = 'application/json'

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(sendNewsletterFormSuccess(response.data))
    yield put(showNotification('success', 'landing.subscribe.success'))
    yield put(resetNewsletterForm())
  } else {
    yield put(sendNewsletterFormError(response.err))
    yield put(showNotification('error', 'landing.subscribe.error'))
  }
}

/**
 * Send newsletter saga
 */
export function * sendNewsletterFormSaga () {
  yield takeLatest(SEND_NEWSLETTER_FORM, sendNewsletterForm)
}

export default [sendNewsletterFormSaga]
