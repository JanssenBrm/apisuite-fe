import {
  put,
  call,
  takeLatest,
} from 'redux-saga/effects'
import request from 'util/request'
import {
  authActions,
  LOGIN,
  LOGIN_USER,
  LOGIN_SUCCESS,
  FORGOT_PASSWORD,
  RECOVER_PASSWORD,
  LOGOUT,
} from './ducks'
import {
  AUTH_URL,
  LOGIN_PORT,
  API_URL,
} from 'constants/endpoints'
import { roleNameOptions } from 'containers/Profile/types'
import qs from 'qs'
import { openNotification } from 'containers/NotificationStack/ducks'

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
    const errorMessage = error.response.data.error
    yield put(authActions.loginError(errorMessage))
  }
}

function * loginUWorker (action: AnyAction) {
  try {
    const userinfo = yield call(request, {
      url: `${AUTH_URL}/userinfo`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${action.payload.token}`,
      },
    })

    const user = userinfo.userinfo
    const userName = user.name.split(' ')
    const userId = user.id

    yield put(authActions.loginUserSuccess({
      user: {
        fName: userName[0],
        lName: userName[userName.length - 1],
        id: userId,
        role: {
          id: user.role_id,
          name: roleNameOptions[user.role_id - 1],
        },
      },
    }))
  } catch (error) {
    yield put(authActions.loginUserError(error))
  }
}

function * forgotPasswordSaga (action: AnyAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/forgot`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(authActions.forgotPasswordSuccess())
  } catch (error) {
    // TODO: change to action
    authActions.forgotPasswordError(error)
  }
}

function * recoverPasswordSaga (action: AnyAction) {
  try {
    yield call(request, {
      url: `${API_URL}/users/recover`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(authActions.recoverPasswordSuccess())
    action.history.replace('auth/login')
    yield put(openNotification('success', 'Password changed, you can login.', 3000))
  } catch (error) {
    // TODO: change to action
    authActions.recoverPasswordError(error)
  }
}

function * logoutWorker () {
  try {
    const logoutSessionUrl = `${AUTH_URL}/auth/session/logout`
    const logoutUrl = `${AUTH_URL}/auth/logout`

    try {
      // try to logout via session
      yield call(request, {
        url: logoutSessionUrl,
        method: 'GET',
      })
    } catch (_) {
      // if it fails try callback call to remove active session if exists
      yield call(request, {
        url: logoutUrl,
        method: 'GET',
      })
    }

    yield put(authActions.logoutSuccess())
  } catch (error) {
    const errorMessage = error ? error.response.data.error : undefined
    yield put(authActions.logoutError({ error: errorMessage || 'Unknown error occurred.' }))
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUWorker)
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga)
  yield takeLatest(RECOVER_PASSWORD, recoverPasswordSaga)
  yield takeLatest(LOGOUT, logoutWorker)
}
export default rootSaga
