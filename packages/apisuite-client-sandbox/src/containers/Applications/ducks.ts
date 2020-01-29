import update from 'immutability-helper'
import { AnyAction } from 'redux'
import { AppData } from './types'

export const CREATE_APP = 'Applications/CREATE_APP'
export const UPDATE_APP = 'Applications/UPDATE_APP'
export const GET_APP_DETAILS = 'Applications/GET_APP_DETAILS'
export const GET_APP_DETAILS_SUCCESS = 'Applications/GET_APP_DETAILS_SUCCESS'

const initialState = {
  currentApp: {
    name: '',
    description: '',
    redirectUrl: '',
    logo: '',
    userId: '',
    sandboxId: '',
  },
}

export default function reducer (state = initialState, action: AnyAction) {
  switch (action.type) {
    case CREATE_APP: {
      return state
    }
    case UPDATE_APP: {
      return state
    }
    case GET_APP_DETAILS: {
      return state
    }
    case GET_APP_DETAILS_SUCCESS: {
      return update(state, {
        currentApp: {
          name: { $set: action.appData.name },
          description: { $set: action.appData.description },
          redirectUrl: { $set: action.appData.redirectUrl },
          logo: { $set: action.appData.logo },
          userId: { $set: action.appData.userId },
          sandboxId: { $set: action.appData.sandboxId },
        },
      })
    }
    default:
      return state
  }
}

export function createApp (appData: AppData) {
  return { type: CREATE_APP, appData }
}

export function updateApp (appData: AppData) {
  return { type: UPDATE_APP, appData }
}

export function getAppDetails () {
  return { type: GET_APP_DETAILS }
}

export function getAppDetailsSuccess (appData: AppData) {
  return { type: GET_APP_DETAILS_SUCCESS, appData }
}
