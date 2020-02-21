import { History } from 'history'
import { Action } from 'redux'
import { CREATE_APP, UPDATE_APP, GET_APP_DETAILS, DELETE_APP, GET_APP_DETAILS_SUCCESS, GET_USER_APPS, GET_USER_APPS_SUCCESS } from './ducks'

export interface ApplicationRouteProps {
  history: History<any>,
}

export interface ApplicationsStore {
  currentApp: AppData,
  userApps: AppData[],
}

export interface AppData {
  name: string,
  description: string,
  redirectUrl: string,
  logo: string,
  userId: string,
  sandboxId: string,
  pubUrls: string,
}

export interface CreateAppAction extends Action {
  type: typeof CREATE_APP,
  appData: AppData,
}

export interface UpdateAppAction extends Action {
  type: typeof UPDATE_APP,
  appData: AppData,
  appId: string,
}

export interface DeleteAppAction extends Action {
  type: typeof DELETE_APP,
  appId: string,
}

export interface GetAppDetails extends Action {
  type: typeof GET_APP_DETAILS,
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
| GetAppDetailsSuccess | GetUserAppsAction | GetUserAppsActionSuccess
