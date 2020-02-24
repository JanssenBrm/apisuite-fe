import { put, call, takeLatest } from 'redux-saga/effects'
import request from 'util/request'
import { authActions, LOGIN, LOGIN_USER, LOGIN_SUCCESS } from './ducks'
import { AUTH_URL, LOGIN_PORT } from 'constants/endpoints'
import qs from 'qs'

import { AnyAction } from 'redux'

function * loginWorker (action: AnyAction) {
  try {
    const credentialsUrl = `${AUTH_URL}${LOGIN_PORT}/auth/apisuite`
    const loginUrl = `${AUTH_URL}/auth/login`

    const responseCred = yield call(request, {
      url: credentialsUrl,
      method: 'GET',
    })

    const challenge = responseCred.challenge

    const data = {
      challenge: challenge,
      email: action.payload.email,
      password: action.payload.password,
    }

    const { token } = yield call(request, {
      url: loginUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })

    yield put(authActions.loginSuccess({
      token,
    }))
  } catch (error) {
    yield put(authActions.loginError(error))
  }
}

function * loginUWorker (action: AnyAction) {
  try {
    const userInfoUrl = `${AUTH_URL}/userinfo`
    const userinfo = yield call(request, {
      url: userInfoUrl,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${action.payload.token}`,
      },
    })

    const user = userinfo.userinfo
    const userName = user.name.split(' ')
    const userId = user.id

    yield put(authActions.loginUserSuccess({
      user: { fName: userName[0], lName: userName[userName.length - 1], id: userId },
    }))
  } catch (error) {
    yield put(authActions.loginUserError(error))
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUWorker)
}
export default rootSaga
