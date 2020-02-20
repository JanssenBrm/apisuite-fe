import { RouteProps } from 'react-router-dom'
import { AuthPayloads, AuthStore } from 'containers/Auth/types'
import { History } from 'history'
import { AnyAction } from 'redux'

export interface AppProps extends AppDispatchToProps {
  history: History<any>,
  auth: AuthStore,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export interface AppDispatchToProps {
  loginUser: (payload: AuthPayloads['loginUser']) => void,
}

export interface AppStoreState {
  requestingInform: boolean,
  requestInformErrorMessage: string,
}

export type AppRouteProps = RouteProps

export type InformTarget = 'portal' | 'sandbox' | 'marketplace' | 'sso'

export interface AppStorePayloads {
  inform: {
    email: string,
    target: InformTarget,
  },
  informError: { message: string },
}

export interface AppStoreActionTypes {
  inform: AnyAction & { payload: AppStorePayloads['inform'] },
  informSuccess: AnyAction,
  informError: AnyAction & { payload: AppStorePayloads['informError'] },
}

export interface AppStoreActionCreators {
  inform: (payload: AppStorePayloads['inform']) => AppStoreActionTypes['inform'],
  informSuccess: () => AppStoreActionTypes['informSuccess'],
  informError: (payload: AppStorePayloads['informError']) => AppStoreActionTypes['informError'],
}
