import { Action } from 'redux'
import { SubscriptionsActionTypes } from './ducks'

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

export type SubscriptionsActions =
  GetApisAction |
  GetApisSuccessAction |
  GetApisErrorAction

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
