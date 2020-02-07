import { History } from 'history'
import { Action } from 'redux'

export interface ApplicationRouteProps {
  history: History<any>,
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

export interface ApplicationsStore {
  currentApp: AppData,
}

export interface CreateAppAction extends Action {
  type: 'CREATE_APP',
  appData: AppData,
}

export interface UpdateAppAction extends Action {
  type: 'UPDATE_APP',
  appData: AppData,
  appId: string,
}

export interface DeleteAppAction extends Action {
  type: 'DELETE_APP',
  appId: string,
}
