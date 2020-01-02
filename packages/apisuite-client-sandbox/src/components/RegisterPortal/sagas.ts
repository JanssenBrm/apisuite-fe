/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER } from './ducks'
import { takeLatest, call } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL } from 'constants/endpoints'
import request from 'util/request'

function * registerUser (action: RegisterAction) {
  const requestUrl = `${API_URL}/auth/signup`
  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(action.userData),
  })
  console.log(response)
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
