import { Action } from 'redux'

import { AppData } from 'containers/Applications/types'
import { AuthStore } from 'containers/Auth/types'

import { SubscriptionsActionTypes } from './ducks'

/** State types */
export interface Api {
  apiVersions: APIVersion[],
  baseUri?: string,
  baseUriSandbox?: string,
  docs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
}

export interface SubscriptionsStore {
  apis: Api[],
}

export interface SubscriptionsProps {
  auth?: AuthStore,
  getAPIs: () => void,
  getUserApps: (userId: number) => void,
  subscriptions: SubscriptionsStore,
}

/** Action types */
export interface GetAPIsAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS,
}

export interface GetAPIsSuccessAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS_SUCCESS,
  apis: ApiResponse[],
}

export interface GetAPIsErrorAction extends Action {
  type: typeof SubscriptionsActionTypes.GET_APIS_ERROR,
}

export interface AddAppSubscriptionAction extends Action {
  type: typeof SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION,
  apiName: string,
  appId: number,
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
  apiName: string,
  appId: number,
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
  AddAppSubscriptionAction |
  AddAppSubscriptionErrorAction |
  AddAppSubscriptionSuccessAction |
  RemoveAppSubscriptionAction |
  RemoveAppSubscriptionErrorAction |
  RemoveAppSubscriptionSuccessAction |
  GetAPIsAction |
  GetAPIsErrorAction |
  GetAPIsSuccessAction

/** Endpoint response type */
export interface ApisResponse {
  pagination: {
    page: number,
    pageCount: number,
    pageSize: number,
    rowCount: number,
  },
  rows: ApiResponse[],
}

export interface ApiResponse {
  apiVersions: APIVersion[],
  baseUri?: string,
  baseUriSandbox?: string,
  createdAt: string,
  docs?: ApiDocs,
  id: number,
  name: string,
  publishedAt?: string,
  updatedAt: string,
}

export interface ApiDocs {
  createdAt: string,
  image?: string,
  info?: string,
  target: string,
  title?: string,
  updatedAt: string,
}

/** Selector types */
export type APIVersion = {
  apiId: number,
  createdAt: string,
  deprecated: boolean,
  id: number,
  live: boolean,
  spec: any | null,
  title: string,
  updatedAt: string,
  version: string,
}

export type AppInfo = {
  appId: number,
  appName: string,
}
