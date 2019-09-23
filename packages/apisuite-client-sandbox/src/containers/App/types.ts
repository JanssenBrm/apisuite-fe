import { Location, History } from 'history'
import { RouteProps } from 'react-router-dom'
import { AnyAction } from 'redux'

export interface AppProps {
  location: Location<any>,
  history: History<any>,
}

export interface AppState {
  currentTab: number,
}

export type AppRouteProps = RouteProps

export interface AppStoreState {
  requestingInform: boolean,
  requestInformErrorMessage: string,
}

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
