/**
 * @module RegisterPortal/sagas
 */

import { REGISTER_USER, registerActions } from './ducks'
import { takeLatest, put, call } from 'redux-saga/effects'
import { RegisterAction } from './types'
import { API_URL, SIGNUP_PORT } from 'constants/endpoints'
import request from 'util/request'

export function * registerUser (action: RegisterAction) {
  try {
    const requestUrl = `${API_URL}${SIGNUP_PORT}/users/register`
    const response = yield call(request, {
      url: requestUrl,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(action.userData),
    })

    yield put(registerActions.registerUserSuccess(response))
  } catch (error) {
    yield put(registerActions.registerUserError(error))
  }
}

function * rootSaga () {
  yield takeLatest(REGISTER_USER, registerUser)
}

export default rootSaga
