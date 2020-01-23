import update from 'immutability-helper'
import { AuthStore, AuthStoreActionTypes, AuthPayloads } from './types'
import { Reducer, AnyAction, Dispatch } from 'redux'
import { History } from 'history'

export const LOGIN = 'auth/LOGIN'
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS'
const LOGIN_ERROR = 'auth/LOGIN_ERROR'
const LOGOUT = 'auth/LOGOUT'

const initialState: AuthStore = {
  authToken: undefined,
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

    case LOGIN_SUCCESS: {
      const { payload: { token, user } } = action as AuthStoreActionTypes['loginSuccess']
      return update(state, {
        authToken: { $set: token },
        user: { $set: user },
        isAuthorizing: { $set: false },
      })
    }

    case LOGIN_ERROR:
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
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => ({ type: LOGIN_SUCCESS, payload }),
  loginError: (error: AuthPayloads['loginError']) => ({ type: LOGIN_ERROR, error }),
  logout: () => ({ type: LOGOUT }),
}

export const createAuthMiddleware = (history: History) => () => (next: Dispatch) => (action: AnyAction) => {
  if (action.type === LOGIN_SUCCESS) {
    history.replace('/dashboard')
  }
  next(action)
}

export default reducer
