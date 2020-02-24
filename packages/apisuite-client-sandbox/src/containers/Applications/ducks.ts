import update from 'immutability-helper'
import { Reducer } from 'redux'
import { AppData, ApplicationsStore, ApplicationsActions } from './types'

export const CREATE_APP = 'Applications/CREATE_APP'
export const CREATE_APP_SUCCESS = 'Applications/CREATE_APP_SUCCESS'
export const CREATE_APP_ERROR = 'Applications/CREATE_APP_ERROR'
export const UPDATE_APP = 'Applications/UPDATE_APP'
export const UPDATE_APP_SUCCESS = 'Applications/UPDATE_APP_SUCCESS'
export const UPDATE_APP_ERROR = 'Applications/UPDATE_APP_ERROR'
export const DELETE_APP = 'Applications/DELETE_APP'
export const DELETE_APP_SUCCESS = 'Applications/DELETE_APP_SUCCESS'
export const DELETE_APP_ERROR = 'Applications/DELETE_APP_ERROR'
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
    enable: true,
  },
  userApps: [],
  resCreate: {
    isRequesting: false,
    isError: false,
  },
  resUpdate: {
    isRequesting: false,
    isError: false,
  },
  resDelete: {
    isRequesting: false,
    isError: false,
  },
}

const reducer: Reducer<ApplicationsStore, ApplicationsActions> = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_APP: {
      return update(state, {
        resCreate: {
          isRequesting: { $set: true },
          isError: { $set: false },
        },
      })
    }
    case CREATE_APP_SUCCESS: {
      return update(state, {
        resCreate: {
          isRequesting: { $set: false },
        },
      })
    }
    case CREATE_APP_ERROR: {
      return update(state, {
        resCreate: {
          isRequesting: { $set: false },
          isError: { $set: true },
        },
      })
    }
    case UPDATE_APP: {
      return update(state, {
        resUpdate: {
          isRequesting: { $set: true },
          isError: { $set: false },
        },
      })
    }
    case UPDATE_APP_SUCCESS: {
      return update(state, {
        resUpdate: {
          isRequesting: { $set: false },
        },
        currentApp: {
          appId: { $set: action.appData.appId },
          name: { $set: action.appData.description },
          description: { $set: action.appData.description },
          redirectUrl: { $set: action.appData.redirectUrl },
          logo: { $set: action.appData.logo },
          userId: { $set: action.appData.userId },
          pubUrls: { $set: action.appData.pubUrls },
          enable: { $set: action.appData.enable },
        },
      })
    }
    case UPDATE_APP_ERROR: {
      return update(state, {
        resUpdate: {
          isRequesting: { $set: false },
          isError: { $set: true },
        },
      })
    }
    case DELETE_APP: {
      return update(state, {
        resDelete: {
          isRequesting: { $set: true },
          isError: { $set: false },
        },
      })
    }
    case DELETE_APP_SUCCESS: {
      return update(state, {
        resDelete: {
          isRequesting: { $set: false },
        },
      })
    }
    case DELETE_APP_ERROR: {
      return update(state, {
        resDelete: {
          isRequesting: { $set: false },
          isError: { $set: true },
        },
      })
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

export function createAppError () {
  return { type: CREATE_APP_ERROR }
}

export function updateApp (appData: AppData) {
  return { type: UPDATE_APP, appData }
}

export function updateAppSuccess (appData: AppData) {
  return { type: UPDATE_APP_SUCCESS, appData }
}

export function updateAppError () {
  return { type: UPDATE_APP_ERROR }
}

export function deleteApp (appId: number, userId?: number) {
  return { type: DELETE_APP, appId, userId }
}

export function deleteAppSuccess () {
  return { type: DELETE_APP_SUCCESS }
}

export function deleteAppError () {
  return { type: DELETE_APP_ERROR }
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
