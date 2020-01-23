/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER } from './ducks'
import { takeLatest, call } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'

export function * registerUser (action: RegisterAction) {
  const requestUrl = `${API_URL}${SIGNUP_PORT}/users/register`
  yield call(request, requestUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.userData),
  })
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
