import update from 'immutability-helper'
import { AuthStore, AuthStoreActionTypes, AuthPayloads } from './types'
import { Reducer, AnyAction, Dispatch } from 'redux'
import { History } from 'history'
import cookie from 'js-cookie'

export const LOGIN = 'auth/LOGIN'
export const LOGIN_USER = 'auth/LOGIN_USER'
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'auth/LOGIN_ERROR'
const LOGIN_USER_SUCCESS = 'auth/LOGIN_USER_SUCCESS'
const LOGIN_USER_ERROR = 'auth/LOGIN_USER_ERROR'
const LOGOUT = 'auth/LOGOUT'

export const TOKEN_KEY = 'at'
export const TOKEN_MAX_AGE = 30 // <-- 1 month

const authToken = cookie.get(TOKEN_KEY) || ''

const initialState: AuthStore = {
  authToken,
  user: undefined,
  isAuthorizing: false,
}

const reducer: Reducer<AuthStore, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return update(state, {
        isAuthorizing: { $set: true },
      })
    }

    case LOGIN_USER: {
      return update(state, {
        isAuthorizing: { $set: true },
      })
    }

    case LOGIN_SUCCESS: {
      const { payload: { token } } = action as AuthStoreActionTypes['loginSuccess']
      return update(state, {
        authToken: { $set: token },
      })
    }

    case LOGIN_USER_SUCCESS: {
      const { payload: { user } } = action as AuthStoreActionTypes['loginUserSuccess']
      return update(state, {
        user: { $set: user },
        isAuthorizing: { $set: false },
      })
    }

    case LOGIN_ERROR:
    case LOGIN_USER_ERROR:
    case LOGOUT: {
      return update(state, {
        user: { $set: undefined },
        authToken: { $set: undefined },
        isAuthorizing: { $set: false },
      })
    }

    default:
      return state
  }
}

export const authActions = {
  login: (payload: AuthPayloads['login']) => ({ type: LOGIN, payload }),
  loginUser: (payload: AuthPayloads['loginUser']) => ({ type: LOGIN_USER, payload }),
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => ({ type: LOGIN_SUCCESS, payload }),
  loginError: (error: AuthPayloads['loginError']) => ({ type: LOGIN_ERROR, error }),
  loginUserSuccess: (payload: AuthPayloads['loginUserSuccess']) => ({ type: LOGIN_USER_SUCCESS, payload }),
  loginUserError: (error: AuthPayloads['loginUserError']) => ({ type: LOGIN_USER_ERROR, error }),
  logout: () => ({ type: LOGOUT }),
}

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  next(action)
  if (action.type === LOGIN_SUCCESS) {
    cookie.set(TOKEN_KEY, action.payload.token, {
      expires: TOKEN_MAX_AGE,
      path: '/',
    })
  } else if (action.type === LOGIN_USER_SUCCESS) {
    const location = history.location

    if (location.pathname === '/login') {
      // let nextPath = location.state && location.state.onSuccess ? location.state.onSuccess : '/'
      history.replace('/dashboard')
    }
  } else if (action.type === LOGIN_ERROR) {
    cookie.remove(TOKEN_KEY, { path: '/' })
  } else if (action.type === LOGOUT) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/login')
  }
}

export default reducer
