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
} from './ducks'
import {
  AUTH_URL,
  LOGIN_PORT,
  API_URL,
} from 'constants/endpoints'
import { roleNameOptions } from 'containers/Profile/types'
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
      url: `${API_URL}/users/forgot`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(action.payload),
    })

    yield put(authActions.recoverPasswordSuccess())
  } catch (error) {
    // TODO: change to action
    authActions.recoverPasswordError(error)
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUWorker)
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga)
  yield takeLatest(RECOVER_PASSWORD, recoverPasswordSaga)
}
export default rootSaga
