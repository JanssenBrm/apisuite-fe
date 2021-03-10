import update from 'immutability-helper'

import { AnyAction, Reducer } from 'redux'

import { GetSettingsAction, SettingsData, SettingsStore } from './types'

/** Initial state */
const initialState: SettingsStore = {
  clientName: '',
  documentationURL: '',
  logoURL: '',
  portalName: '',
  socialURLs: [],
  supportURL: '',
}

/** Action types */
export const GET_SETTINGS = 'Settings/GET_SETTINGS'
export const GET_SETTINGS_SUCCESS = 'Settings/GET_SETTINGS_SUCCESS'

/** Reducer */
const reducer: Reducer<SettingsStore, AnyAction> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case GET_SETTINGS: {
      return state
    }

    case GET_SETTINGS_SUCCESS: {
      const { payload } = action as GetSettingsAction
      return update(state, {
        clientName: { $set: payload.clientName },
        documentationURL: { $set: payload.documentationURL },
        logoURL: { $set: payload.logoURL },
        portalName: { $set: payload.portalName },
        socialURLs: { $set: payload.socialURLs },
        supportURL: { $set: payload.supportURL },
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
