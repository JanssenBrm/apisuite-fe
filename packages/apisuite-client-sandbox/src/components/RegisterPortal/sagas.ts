/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER } from './ducks'
import { takeLatest, call } from 'redux-saga/effects'
import request from 'util/request'

function * registerUser (action) {
  const requestUrl = 'http://127.0.0.1:3001/auth/signup'
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
