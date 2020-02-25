import { Action } from 'redux'
import { DELETE_APP_SUB, DELETE_APP_SUB_SUCCESS, ADD_APP_SUB, ADD_APP_SUB_SUCCESS } from './ducks'
import { GetUserAppsActionSuccess } from 'containers/Applications/types'

export interface APIversion {
  vName: string,
  vNumber: string,
}

export interface App {
  name: string,
  isLoading: boolean,
}

export interface API {
  id: number,
  name: string,
  versions: APIversion[],
  apps: App[],
  description: string,
}

export interface SubStore {
  subscribedAPIs: API[],
  userApps: App[],
}

export interface DeleteAppSubAction extends Action {
  type: typeof DELETE_APP_SUB,
  APIid: number,
  appNumber: number,
}

export interface DeleteAppSubSuccessAction extends Action {
  type: typeof DELETE_APP_SUB_SUCCESS,
  APIid: number,
  appNumber: number,
}

export interface AddAppSubAction extends Action {
  type: typeof ADD_APP_SUB,
  APIid: number,
  appName: string,
  newAppNumber: number,
}

export interface AddAppSubSuccessAction extends Action {
  type: typeof ADD_APP_SUB_SUCCESS,
  APIid: number,
  newAppNumber: number,
}

export type AppSubActions = DeleteAppSubAction | DeleteAppSubSuccessAction | AddAppSubAction
| AddAppSubSuccessAction | GetUserAppsActionSuccess
