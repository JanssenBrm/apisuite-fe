import { ErrorReason } from 'util/request'
import { AnyAction } from 'redux'
import { ReactType } from 'react'

export interface AuthStore {
  user?: User,
  authToken?: string,
  isAuthorizing: boolean,
  error?: string
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
  },
  loginError: ErrorReason,
  loginUser: {
    token?: string,
  },
  loginUserSuccess: {
    user: User,
  },
  loginUserError: ErrorReason,
}

export interface AuthStoreActionTypes {
  login: AnyAction & { payload: AuthPayloads['login'] },
  loginSuccess: AnyAction & { payload: AuthPayloads['loginSuccess'] },
  loginError: AnyAction & { error: AuthPayloads['loginError'] },
  loginUserSuccess: AnyAction & { payload: AuthPayloads['loginUserSuccess'] },
  loginUserError: AnyAction & { error: AuthPayloads['loginUserError'] },
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
  auth?: AuthStore,
}
