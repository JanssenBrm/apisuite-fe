import { Action } from 'redux'
import { SubscriptionsActionTypes } from './ducks'
import { AppData } from 'containers/Applications/types'

/** State types */
export interface Api {
  id: number,
  name: string,
  apiTitle: string,
  version: string,
}

export interface SubscriptionsStore {
  apis: Api[],
}

/** Action types */
export interface GetApisAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS,
}

export interface GetApisSuccessAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS_SUCCESS,
  apis: ApiResponse[],
}

export interface GetApisErrorAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS_ERROR,
}

export interface AddAppSubscriptionAction extends Action {
  type: typeof SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION,
  appId: number,
  apiName: string,
}

export interface AddAppSubscriptionSuccessAction extends Action {
  type: typeof SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_SUCCESS,
  updatedApp: AppData,
  updatedAppIndx: number,
}

export interface AddAppSubscriptionErrorAction extends Action {
  type: typeof SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_ERROR,
}

export interface RemoveAppSubscriptionAction extends Action {
  type: typeof SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION,
  appId: number,
  apiName: string,
}

export interface RemoveAppSubscriptionSuccessAction extends Action {
  type: typeof SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_SUCCESS,
  updatedApp: AppData,
  updatedAppIndx: number,
}

export interface RemoveAppSubscriptionErrorAction extends Action {
  type: typeof SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_ERROR,
}

export type SubscriptionsActions =
  GetApisAction |
  GetApisSuccessAction |
  GetApisErrorAction |
  AddAppSubscriptionAction |
  AddAppSubscriptionSuccessAction |
  AddAppSubscriptionErrorAction |
  RemoveAppSubscriptionAction |
  RemoveAppSubscriptionSuccessAction |
  RemoveAppSubscriptionErrorAction

/** Endpoint response type */
export interface ApisResponse {
  apis: {
    pagination: {
      page: number,
      pageCount: number,
      pageSize: number,
      rowCount: number,
    },
    rows: ApiResponse[],
  },
  message: string,
  success: boolean,
}

export interface ApiResponse {
  api_title: string,
  createdAt: string,
  id: number,
  name: string,
  route: {
    paths: string,
  },
  updatedAt: string,
  version: string,
}

/** Selector types */
export interface VersionInfo {
  versionName: string,
  apiTitle: string,
  apiId: number,
}

export interface AppInfo {
  appName: string,
  appId: number,
}
