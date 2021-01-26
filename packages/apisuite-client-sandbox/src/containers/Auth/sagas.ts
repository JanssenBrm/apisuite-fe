import {
  call,
  delay,
  put,
  takeLatest,
  select,
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
  EXPIRED_SESSION,
  SSO_LOGIN,
  SSO_TOKEN_EXCHANGE,
  SSO_PROVIDERS,
} from './ducks'
import {
  API_URL,
} from 'constants/endpoints'
import { Profile } from 'containers/Profile/types'
import qs from 'qs'
import { openNotification } from 'containers/NotificationStack/ducks'
import { Store } from 'store/types'
import stateGenerator from 'util/stateGenerator'

import { AnyAction } from 'redux'

const STATE_STORAGE = 'ssoStateStorage'

function * loginWorker (action: AnyAction) {
  try {
    const loginUrl = `${API_URL}/auth/login`

    const data = {
      email: action.payload.email,
      password: action.payload.password,
    }

    yield call(request, {
      url: loginUrl,
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    })

    yield put(authActions.loginSuccess())
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

function * loginUWorker () {
  try {
    const profile: Profile = yield call(request, {
      url: `${API_URL}/users/profile`,
      method: 'GET',
    })

    const user = profile.user
    const userName = user.name.split(' ')
    const userId = user.id

    yield put(authActions.loginUserSuccess({
      user: {
        fName: userName[0],
        lName: userName[userName.length - 1],
        id: Number(userId),
        role: {
          id: profile.current_org.role.id,
          name: profile.current_org.role.name,
        },
      },
    }))
  } catch (error) {
    yield put(authActions.loginUserError(error.message.error))
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
    const logoutUrl = `${API_URL}/auth/logout`

    yield call(request, {
      url: logoutUrl,
      method: 'POST',
    })

    yield put(authActions.logoutSuccess())
  } catch (error) {
    yield put(authActions.logoutError({ error: error.message || 'Unknown error occurred.' }))
  }
}

function * expiredSessionWorker () {
  try {
    // try to exchange the refresh token for a new access tokn
    yield call(request, {
      url: `${API_URL}/auth/refresh`,
      method: 'POST',
    })
  } catch (error) {
    // if token expired logout
    const authToken = yield select((state: Store) => state.auth.authToken)
    // only logout if we have the session token
    if (authToken) {
      if ((error && error.response && error.response.status === 401) || (error && error.status === 401)) {
        yield put(openNotification('error', 'Your session has expired, you need to login again.', 5000))
        yield delay(1000)
        yield put(authActions.logout())
      }
    }
  }
}

function * getProviders () {
  const providers: string[] = ['keycloak', 'hydra']
  try {
    const settingsURL = `${API_URL}/settings`

    const response = yield call(request, {
      url: settingsURL,
      method: 'GET',
    })

    yield put(authActions.getSSOProvidersSuccess({ providers: response.sso || providers }))
  } catch (error) {
    yield put(authActions.getSSOProvidersSuccess({ providers }))
  }
}

function * ssoLoginWorker (action: AnyAction) {
  try {
    let state = localStorage.getItem(STATE_STORAGE)

    if (!state) {
      state = stateGenerator()
      localStorage.setItem(STATE_STORAGE, state)
    }

    const provider = action?.payload?.provider
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}?state=${state}`

    yield call(request, {
      url: ssoLoginUrl,
      method: 'GET',
    })

    yield put(authActions.loginSuccess())
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

function * ssoTokenExchangeWorker (action: AnyAction) {
  try {
    const provider = action?.payload?.provider
    const ssoLoginUrl = `${API_URL}/auth/oidc/${provider}/token`

    yield call(request, {
      url: ssoLoginUrl,
      method: 'POST',
    })

    yield put(authActions.loginSuccess())
    localStorage.removeItem(STATE_STORAGE)
  } catch (error) {
    yield put(authActions.loginError(error.message.error))
  }
}

export function * rootSaga () {
  yield takeLatest(LOGIN, loginWorker)
  yield takeLatest([LOGIN_SUCCESS, LOGIN_USER], loginUWorker)
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordSaga)
  yield takeLatest(RECOVER_PASSWORD, recoverPasswordSaga)
  yield takeLatest(LOGOUT, logoutWorker)
  yield takeLatest(EXPIRED_SESSION, expiredSessionWorker)
  yield takeLatest(SSO_LOGIN, ssoLoginWorker)
  yield takeLatest(SSO_TOKEN_EXCHANGE, ssoTokenExchangeWorker)
  yield takeLatest(SSO_PROVIDERS, getProviders)
}
export default rootSaga
