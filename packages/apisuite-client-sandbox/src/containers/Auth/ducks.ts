import update from 'immutability-helper'
import { AuthStore, AuthStoreActionTypes, AuthPayloads } from './types'
import { Reducer, AnyAction, Dispatch } from 'redux'
import { History } from 'history'
import cookie from 'js-cookie'
import { LOCATION_CHANGE } from 'connected-react-router'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_USER = 'auth/LOGIN_USER'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'auth/LOGIN_ERROR'
const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS'
const LOGIN_USER_ERROR = 'auth/LOGIN_USER_ERROR'
export const LOGOUT = 'auth/LOGOUT'
const LOGOUT_SUCCESS = 'auth/LOGOUT_SUCCESS'
const LOGOUT_ERROR = 'auth/LOGOUT_ERROR'
export const EXPIRED_SESSION = 'auth/EXPIRED_SESSION'

export const FORGOT_PASSWORD = 'auth/FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'auth/FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'auth/FORGOT_PASSWORD_ERROR'

export const RECOVER_PASSWORD = 'auth/RECOVER_PASSWORD'
export const RECOVER_PASSWORD_ERROR = 'auth/RECOVER_PASSWORD_ERROR'
export const RECOVER_PASSWORD_SUCCESS = 'auth/RECOVER_PASSWORD_SUCCESS'

export const SSO_LOGIN = 'auth/SSO_LOGIN'
export const SSO_LOGIN_SUCCESS = 'auth/SSO_LOGIN_SUCCESS'
export const SSO_LOGIN_ERROR = 'auth/SSO_LOGIN_ERROR'
export const SSO_TOKEN_EXCHANGE = 'auth/SSO_TOKEN_EXCHANGE'
export const SSO_TOKEN_EXCHANGE_SUCCESS = 'auth/SSO_TOKEN_EXCHANGE_SUCCESS'
export const SSO_TOKEN_EXCHANGE_ERROR = 'auth/SSO_TOKEN_EXCHANGE_ERROR'

export const SSO_PROVIDERS = 'auth/SSO_PROVIDERS'
export const SSO_PROVIDERS_SUCCESS = 'auth/SSO_PROVIDERS_SUCCESS'

export const COO_KEY = 'apiSuiteSession'
export const COO_KEY_MAX_AGE = 30 // <-- 1 month

const authToken = cookie.get(COO_KEY) || ''

const initialState: AuthStore = {
  authToken,
  user: undefined,
  isAuthorizing: false,
  isRecoveringPassword: false,
  error: undefined,
  providers: null,
}

const reducer: Reducer<AuthStore, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return update(state, {
        isAuthorizing: { $set: true },
        error: { $set: undefined },
      })
    }

    case LOGIN_USER: {
      return update(state, {
        isAuthorizing: { $set: true },
      })
    }

    case LOGIN_SUCCESS: {
      return update(state, {
        authToken: { $set: 'TOKEN_COMES_FROM_BE_IN_COOKIE' },
        error: { $set: undefined },
      })
    }

    case LOGIN_USER_SUCCESS: {
      const { payload: { user } } = action as AuthStoreActionTypes['loginUserSuccess']
      return update(state, {
        user: { $set: user },
        isAuthorizing: { $set: false },
      })
    }

    case FORGOT_PASSWORD: {
      return update(state, {
        isRecoveringPassword: { $set: true },
      })
    }

    case FORGOT_PASSWORD_SUCCESS: {
      return update(state, {
        isRecoveringPassword: { $set: false },
      })
    }

    case LOGIN_ERROR:
    case LOGIN_USER_ERROR: {
      return update(state, {
        error: { $set: action.error || 'Whoops, something went wrong...' },
        isAuthorizing: { $set: false },
      })
    }

    case LOGOUT: {
      return initialState
    }

    /* TODO: An alternative solution is to be explored in the future (and if possible):

    When a login attempt is not successful, an appropriate error message is displayed.
    Unfortunately, it remains on the screen even if, at some point, we move back to other points
    of the API Suite project and return to the Login screen, and so, in an attempt at correcting
    this issue, this was the only solution that was found (which is not ideal, as it runs for
    every 'LOCATION_CHANGE' action that is triggered throughout the project).

    Refer to APIS-342 for more details. */
    case LOCATION_CHANGE: {
      if (action.payload.action === 'POP') {
        return update(state, {
          error: { $set: undefined },
          providers: { $set: null },
        })
      }

      return state
    }

    case SSO_PROVIDERS_SUCCESS: {
      return update(state, {
        providers: { $set: action.payload.providers }
      })
    }

    default:
      return state
  }
}

export const authActions = {
  login: (payload: AuthPayloads['login']) => ({ type: LOGIN, payload }),
  loginUser: (payload: AuthPayloads['loginUser']) => ({ type: LOGIN_USER, payload }),
  loginSuccess: () => ({ type: LOGIN_SUCCESS }),
  loginError: (error: AuthPayloads['loginError']) => ({ type: LOGIN_ERROR, error }),
  loginUserSuccess: (payload: AuthPayloads['loginUserSuccess']) => ({ type: LOGIN_USER_SUCCESS, payload }),
  loginUserError: (error: AuthPayloads['loginUserError']) => ({ type: LOGIN_USER_ERROR, error }),
  forgotPassword: (payload: AuthPayloads['forgotPassword']) => ({ type: FORGOT_PASSWORD, payload }),
  forgotPasswordError: (payload: AuthPayloads['forgotPasswordError']) => ({ type: FORGOT_PASSWORD_ERROR, payload }),
  forgotPasswordSuccess: () => ({ type: FORGOT_PASSWORD_SUCCESS }),
  recoverPassword: (payload: AuthPayloads['recoverPassword'], history: History) => ({ type: RECOVER_PASSWORD, payload, history }),
  recoverPasswordError: (payload: AuthPayloads['recoverPasswordError']) => ({ type: RECOVER_PASSWORD_ERROR, payload }),
  recoverPasswordSuccess: () => ({ type: RECOVER_PASSWORD_SUCCESS }),
  logout: () => ({ type: LOGOUT }),
  logoutSuccess: () => ({ type: LOGOUT_SUCCESS }),
  logoutError: (payload: AuthPayloads['logoutError']) => ({ type: LOGOUT_ERROR, payload }),
  handleSessionExpire: () => ({ type: EXPIRED_SESSION }),
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => ({ type: SSO_LOGIN, payload }),
  ssoLoginSuccess: (payload: AuthPayloads['sso']['ssoLoginSuccess']) => ({ type: SSO_LOGIN_SUCCESS, payload }),
  ssoLoginError: (error: AuthPayloads['sso']['ssoLoginError']) => ({ type: SSO_LOGIN_ERROR, error }),
  getSSOProviders: () => ({ type: SSO_PROVIDERS }),
  getSSOProvidersSuccess: (payload: AuthPayloads['sso']['ssoProvidersSuccess']) => ({ type: SSO_PROVIDERS_SUCCESS, payload }),
}

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action)

  if (action.type === LOGIN_SUCCESS) {
    cookie.set(COO_KEY, 'TOKEN_COMES_FROM_BE_IN_COOKIE', {
      expires: new Date(new Date().getTime() + COO_KEY_MAX_AGE * 60 * 1000),
      path: '/',
    })
  } else if (action.type === LOGIN_USER_SUCCESS) {
    const location = history.location

    if (location.pathname.startsWith('/auth')) {
      if (action.payload.user?.role?.name === 'admin') {
        history.replace('/dashboard')
      } else {
        history.replace('/')
      }
    }
  } else if (action.type === LOGIN_ERROR || action.type === LOGIN_USER_ERROR) {
    cookie.remove(COO_KEY, { path: '/' })
    history.replace('/auth/login')
  } else if (action.type === LOGOUT || action.type === LOGOUT_ERROR) {
    cookie.remove(COO_KEY, { path: '/' })
    history.replace('/auth/login')
  }
}

export default reducer
