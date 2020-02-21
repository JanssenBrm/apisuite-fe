import update from 'immutability-helper'
import { Reducer } from 'redux'
import { AppData, ApplicationsStore, ApplicationsActions } from './types'

export const CREATE_APP = 'Applications/CREATE_APP'
export const CREATE_APP_SUCCESS = 'Applications/CREATE_APP_SUCCESS'
export const UPDATE_APP = 'Applications/UPDATE_APP'
export const UPDATE_APP_SUCCESS = 'Applications/APP_APP_SUCCESS'
export const DELETE_APP = 'Applications/DELETE_APP'
export const DELETE_APP_SUCCESS = 'Applications/DELETE_APP_SUCCESS'
export const GET_APP_DETAILS = 'Applications/GET_APP_DETAILS'
export const GET_APP_DETAILS_SUCCESS = 'Applications/GET_APP_DETAILS_SUCCESS'
export const GET_USER_APPS = 'Applications/GET_USER_APPS'
export const GET_USER_APPS_SUCCESS = 'Applications/GET_USER_APPS_SUCCESS'

const initialState: ApplicationsStore = {
  currentApp: {
    appId: 0,
    name: '',
    description: '',
    redirectUrl: '',
    logo: '',
    userId: 0,
    sandboxId: '',
    pubUrls: '',
    enable: false,
  },
  userApps: [],
}

const reducer: Reducer<ApplicationsStore, ApplicationsActions> = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APP: {
      return state
    }
    case UPDATE_APP: {
      return state
    }
    case DELETE_APP: {
      return state
    }
    case GET_APP_DETAILS: {
      return state
    }
    case GET_APP_DETAILS_SUCCESS: {
      return update(state, {
        currentApp: {
          appId: { $set: action.appData.appId },
          name: { $set: action.appData.name },
          description: { $set: action.appData.description },
          redirectUrl: { $set: action.appData.redirectUrl },
          logo: { $set: action.appData.logo },
          userId: { $set: action.appData.userId },
          sandboxId: { $set: action.appData.sandboxId },
          pubUrls: { $set: action.appData.pubUrls },
        },
      })
    }
    case GET_USER_APPS: {
      return state
    }
    case GET_USER_APPS_SUCCESS: {
      return update(state, {
        userApps: { $set: action.userApps },
      })
    }
    default:
      return state
  }
}

export function createApp (appData: AppData) {
  return { type: CREATE_APP, appData }
}

export function createAppSuccess () {
  return { type: CREATE_APP_SUCCESS }
}

export function updateApp (appData: AppData) {
  return { type: UPDATE_APP, appData }
}

export function updateAppSuccess () {
  return { type: UPDATE_APP_SUCCESS }
}

export function deleteApp (appId: number) {
  return { type: DELETE_APP, appId }
}

export function deleteAppSuccess () {
  return { type: DELETE_APP_SUCCESS }
}

export function getAppDetails (appId: number, userId: number) {
  return { type: GET_APP_DETAILS, appId, userId }
}

export function getAppDetailsSuccess (appData: AppData) {
  return { type: GET_APP_DETAILS_SUCCESS, appData }
}

export function getUserApps (userId: number) {
  return { type: GET_USER_APPS, userId }
}

export function getUserAppsSuccess (userApps: AppData[]) {
  return { type: GET_USER_APPS_SUCCESS, userApps }
}

export default reducer
