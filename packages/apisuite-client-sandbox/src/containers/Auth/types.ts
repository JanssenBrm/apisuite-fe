import { ErrorReason } from 'util/request'
import { Action, AnyAction } from 'redux'
import { Role } from 'containers/Profile/types'
import { History } from 'history'
import { RoleRequirement } from '@apisuite/extension-ui-types'
import { LOGOUT, SSO_PROVIDERS } from './ducks'

export interface AuthStore {
  user?: User,
  authToken?: string,
  isAuthorizing: boolean,
  isRecoveringPassword: boolean,
  error?: string,
  providers: null|string[],
}

export interface User {
  photo?: string,
  fName: string,
  lName: string,
  id: number,
  role: Role,
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
  forgotPassword: {
    email: string,
  },
  forgotPasswordError: ErrorReason,
  recoverPassword: {
    password: string,
    token: string,
  },
  recoverPasswordError: any,
  logoutError: {
    error: string,
  },
  expireSession: {
    error: any,
  },
  sso: {
    ssoLogin: {
      provider: string,
    },
    ssoLoginSuccess: {
      code: string,
    },
    ssoLoginError: {
      error: ErrorReason,
    },
    ssoExchangeToken: {
      provider: string,
      code: string,
    },
    ssoExchangeTokenSuccess: {
      token: string,
    },
    ssoExchangeTokenError: {
      error: ErrorReason,
    },
    ssoProvidersSuccess: {
      providers: string[],
    },
  },
}

export interface AuthStoreActionTypes {
  login: AnyAction & { payload: AuthPayloads['login'] },
  loginSuccess: AnyAction & { payload: AuthPayloads['loginSuccess'] },
  loginError: AnyAction & { error: AuthPayloads['loginError'] },
  loginUserSuccess: AnyAction & { payload: AuthPayloads['loginUserSuccess'] },
  loginUserError: AnyAction & { error: AuthPayloads['loginUserError'] },
  forgotPassword: AnyAction & { payload: AuthPayloads['forgotPassword']},
  forgotPasswordError: AnyAction & { payload: AuthPayloads['forgotPasswordError']},
  forgotPasswordSuccess: AnyAction,
  recoverPassword: AnyAction & { payload: AuthPayloads['recoverPassword']} & { history: History<any> },
  recoverPasswordError: AnyAction & { payload: AuthPayloads['recoverPasswordError']},
  recoverPasswordSuccess: AnyAction,
  logout: Action<typeof LOGOUT>,
  ssoLogin: AnyAction & { payload: AuthPayloads['sso']['ssoLogin'] },
  ssoLoginSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoLoginSuccess'] },
  ssoLoginError: AnyAction & { error: AuthPayloads['sso']['ssoLoginError'] },
  ssoExchange: AnyAction & { payload: AuthPayloads['sso']['ssoExchangeToken'] },
  ssoExchangeSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoExchangeTokenSuccess'] },
  ssoExchangeError: AnyAction & { error: AuthPayloads['sso']['ssoExchangeTokenError'] },
  ssoProviders: Action<typeof SSO_PROVIDERS>,
  ssoProvidersSuccess: AnyAction & { payload: AuthPayloads['sso']['ssoProvidersSuccess'] },
}

export interface AuthStoreActionCreators {
  login: (payload: AuthPayloads['login']) => AuthStoreActionTypes['login'],
  loginSuccess: (payload: AuthPayloads['loginSuccess']) => AuthStoreActionTypes['loginSuccess'],
  loginError: (error: AuthPayloads['loginError']) => AuthStoreActionTypes['loginError'],
  logout: () => AuthStoreActionTypes['logout'],
  ssoLogin: (payload: AuthPayloads['sso']['ssoLogin']) => AuthStoreActionTypes['ssoLogin'],
  ssoLoginSuccess: (payload: AuthPayloads['sso']['ssoLoginSuccess']) => AuthStoreActionTypes['ssoLoginSuccess'],
  ssoLoginError: (error: AuthPayloads['sso']['ssoLoginError']) => AuthStoreActionTypes['ssoLoginError'],
  getSSOProviders: () => AuthStoreActionTypes['ssoProviders'],
  getSSOProvidersSuccess: (payload: AuthPayloads['sso']['ssoProvidersSuccess']) => AuthStoreActionTypes['ssoProvidersSuccess'],
}

export interface RequireAuthProps {
  requireAuth: boolean,
  component: JSX.Element,
  auth?: AuthStore,
  role?: RoleRequirement,
}
