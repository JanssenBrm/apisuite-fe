import { Reducer, AnyAction } from 'redux'
import update from 'immutability-helper'
import { SettingsData, SettingsStore, GetSettingsAction } from './types'

/** Initial state */
const initialState: SettingsStore = {
  portalName: '',
  clientName: '',
  documentationURL: '',
  supportURL: '',
  socialURLs: [],
}

/** Action types */
export const GET_SETTINGS = 'Settings/GET_SETTINGS'
export const GET_SETTINGS_SUCCESS = 'Settings/GET_SETTINGS_SUCCESS'

/** Reducer */
const reducer: Reducer<SettingsStore, AnyAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return state
    }
    case GET_SETTINGS_SUCCESS: {
      const { payload } = action as GetSettingsAction
      return update(state, {
        portalName: { $set: payload.portalName },
        clientName: { $set: payload.clientName },
        documentationURL: { $set: payload.documentationURL },
        supportURL: { $set: payload.supportURL },
        socialURLs: { $set: payload.socialURLs },
      })
    }
    default:
      return state
  }
}

/** Action builders */
export function getSettings () {
  return { type: GET_SETTINGS }
}

export function getSettingsSuccess (payload: SettingsData[]) {
  return { type: GET_SETTINGS_SUCCESS, payload }
}

export default reducer
