import update from 'immutability-helper'
import { AuthStoreActionTypes } from 'containers/Auth/types'
import { LOGOUT } from 'containers/Auth/ducks'
import {
  APIVersionStore,
  APIDetailParams,
  GetAPIVersionAction,
  GetAPIVersionSuccessAction,
  GetAPIVersionErrorAction,
  APIVersionActions,
} from './types'
import { APIVersion } from 'containers/Subscriptions/types'

/** Initial state */
const initialState: APIVersionStore = {
  requested: true,
  error: false,
  version: {
    id: 0,
    apiId: 0,
    title: '',
    version: '',
    spec: null,
    live: false,
    deprecated: false,
    createdAt: '',
    updatedAt: '',
  },
}

/** Action types */
export const GET_API_VERSION = 'API/Version/GET_API_VERSION'
export const GET_API_VERSION_SUCCESS = 'API/Version/GET_API_VERSION_SUCCESS'
export const GET_API_VERSION_ERROR = 'API/Version/GET_API_VERSION_ERROR'

/** Reducer */
export default function apiVersionReducer (
  state = initialState,
  action: APIVersionActions | AuthStoreActionTypes['logout'],
): APIVersionStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case GET_API_VERSION: {
      return update(state, {
        requested: { $set: false },
      })
    }

    case GET_API_VERSION_SUCCESS: {
      return update(state, {
        requested: { $set: true },
        version: { $set: action.version },
      })
    }

    case GET_API_VERSION_ERROR: {
      return update(state, {
        requested: { $set: true },
        error: { $set: true },
      })
    }

    default:
      return state
  }
}

/** Action builders */
export function getApiVersion (payload: APIDetailParams): GetAPIVersionAction {
  return { type: GET_API_VERSION, payload }
}

export function getApiVersionSuccess (version: APIVersion): GetAPIVersionSuccessAction {
  return { type: GET_API_VERSION_SUCCESS, version }
}

export function getApiVersionError (error: Error): GetAPIVersionErrorAction {
  return { type: GET_API_VERSION_ERROR, error }
}
