/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_ERROR, registerActions } from './ducks'
import { takeLatest, put, call } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'

export function * registerUser (action: RegisterAction) {
  const requestUrl = `${API_URL}${SIGNUP_PORT}/users/register`
  const response = yield call(request, {
    url: requestUrl,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify(action.userData),
  })

  if (!response.err) {
    yield put(registerActions.registerUserSuccess(response.data))
  } else {
    yield put(registerActions.registerUserError(response.err))
  }
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
