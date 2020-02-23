import { History } from 'history'
import { Action } from 'redux'
import { CREATE_APP, UPDATE_APP, GET_APP_DETAILS, DELETE_APP, GET_APP_DETAILS_SUCCESS, GET_USER_APPS, GET_USER_APPS_SUCCESS, CREATE_APP_SUCCESS, UPDATE_APP_SUCCESS, DELETE_APP_SUCCESS, CREATE_APP_ERROR, UPDATE_APP_ERROR, DELETE_APP_ERROR } from './ducks'

export interface ApplicationRouteProps {
  history: History,
}

export interface Response {
  isRequesting: boolean,
  isSuccess: boolean,
  isError: boolean,
}

export interface ApplicationsStore {
  currentApp: AppData,
  userApps: AppData[],
  resCreate: Response,
  resUpdate: Response,
  resDelete: Response,
}

export interface RouteParams {
  id: string,
}

export interface AppData {
  appId: number,
  name: string,
  description: string,
  redirectUrl: string,
  logo: string,
  userId: number,
  sandboxId: string,
  pubUrls: string,
  enable: boolean,
}

export interface CreateAppAction extends Action {
  type: typeof CREATE_APP,
  appData: AppData,
  userId: number,
}

export interface CreateAppSuccessAction extends Action {
  type: typeof CREATE_APP_SUCCESS,
}

export interface CreateAppErrorAction extends Action {
  type: typeof CREATE_APP_ERROR,
}

export interface UpdateAppAction extends Action {
  type: typeof UPDATE_APP,
  appData: AppData,
  appId: number,
}

export interface UpdateAppSuccessAction extends Action {
  type: typeof UPDATE_APP_SUCCESS,
  appData: AppData,
}

export interface UpdateAppErrorAction extends Action {
  type: typeof UPDATE_APP_ERROR,
}

export interface DeleteAppAction extends Action {
  type: typeof DELETE_APP,
  appId: number,
  userId?: number,
}

export interface DeleteAppSuccessAction extends Action {
  type: typeof DELETE_APP_SUCCESS,
}

export interface DeleteAppErrorAction extends Action {
  type: typeof DELETE_APP_ERROR,
}

export interface GetAppDetails extends Action {
  type: typeof GET_APP_DETAILS,
  appId: number,
  userId: number,
}

export interface GetAppDetailsSuccess extends Action {
  type: typeof GET_APP_DETAILS_SUCCESS,
  appData: AppData,
}

export interface GetUserAppsAction extends Action {
  type: typeof GET_USER_APPS,
  userId: number,
}

export interface GetUserAppsActionSuccess extends Action {
  type: typeof GET_USER_APPS_SUCCESS,
  userApps: AppData[],
}

export type ApplicationsActions = CreateAppAction | UpdateAppAction | DeleteAppAction | GetAppDetails
| GetAppDetailsSuccess | GetUserAppsAction | GetUserAppsActionSuccess | CreateAppErrorAction
| UpdateAppErrorAction | DeleteAppErrorAction | CreateAppSuccessAction | UpdateAppSuccessAction
| DeleteAppSuccessAction
