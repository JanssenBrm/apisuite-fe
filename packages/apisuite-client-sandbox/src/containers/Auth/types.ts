import { ErrorReason } from 'util/request'
import { AnyAction } from 'redux'
import { ReactType } from 'react'
import { Store } from 'store/types'

export interface AuthStore {
  user?: User,
  authToken?: string,
  isAuthorizing: boolean,
}

export interface User {
  fName: string,
  lName: string,
  avatar: string,
}

export interface AuthPayloads {
  login: {
    email: string,
    password: string,
  },
  loginSuccess: {
    token: string,
    user: User,
  },
  loginError: ErrorReason,
}

export interface AuthStoreActionTypes {
  login: AnyAction & { payload: AuthPayloads['login'] },
  loginSuccess: AnyAction & { payload: AuthPayloads['loginSuccess'] },
  loginError: AnyAction & { error: AuthPayloads['loginError'] },
  logout: AnyAction,
}

export interface AuthStoreActionCreators {
  login: (payload: AuthPayloads['login']) => AuthStoreActionTypes['login'],
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => AuthStoreActionTypes['loginSuccess'],
  loginError: (error: AuthPayloads['loginError']) => AuthStoreActionTypes['loginError'],
  logout: () => AuthStoreActionTypes['logout'],
}

export interface RequireAuthProps {
  component: ReactType,
  user: Store['auth']['user'],
}
