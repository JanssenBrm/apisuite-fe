import update from 'immutability-helper'

import { LOGOUT } from 'containers/Auth/ducks'
import { AuthStoreActionTypes } from 'containers/Auth/types'

import {
  ApiResponse,
  GetAPIsAction,
  GetAPIsErrorAction,
  GetAPIsSuccessAction,
  SubscriptionsActions,
  SubscriptionsStore,
} from './types'

/** Initial state */
const initialState: SubscriptionsStore = {
  apis: [],
}

/** Action types */
export enum SubscriptionsActionTypes {
  ADD_APP_SUBSCRIPTION = 'ADD_APP_SUBSCRIPTION',
  ADD_APP_SUBSCRIPTION_ERROR = 'ADD_APP_SUBSCRIPTION_ERROR',
  ADD_APP_SUBSCRIPTION_SUCCESS = 'ADD_APP_SUBSCRIPTION_SUCCESS',
  GET_APIS = 'GET_APIS',
  GET_APIS_ERROR = 'GET_APIS_ERROR',
  GET_APIS_SUCCESS = 'GET_APIS_SUCCESS',
  REMOVE_APP_SUBSCRIPTION = 'REMOVE_APP_SUBSCRIPTION',
  REMOVE_APP_SUBSCRIPTION_ERROR = 'REMOVE_APP_SUBSCRIPTION_ERROR',
  REMOVE_APP_SUBSCRIPTION_SUCCESS = 'REMOVE_APP_SUBSCRIPTION_SUCCESS',
}

// TODO: name all reducers according to feature and change them to named exports
/** Reducer */
export default function subscriptionsReducer (
  state = initialState,
  action: SubscriptionsActions | AuthStoreActionTypes['logout'],
): SubscriptionsStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case SubscriptionsActionTypes.GET_APIS: {
      return state
    }

    case SubscriptionsActionTypes.GET_APIS_SUCCESS: {
      return update(state, {
        apis: { $set: action.apis },
      })
    }

    case SubscriptionsActionTypes.GET_APIS_ERROR: {
      return state
    }

    default:
      return state
  }
}

/** Action builders */
export const getAPIs = (): GetAPIsAction => ({
  type: SubscriptionsActionTypes.GET_APIS,
})

export const getAPIsSuccess = (apis: ApiResponse[]): GetAPIsSuccessAction => ({
  type: SubscriptionsActionTypes.GET_APIS_SUCCESS,
  apis: apis,
})

export const getAPIsError = (): GetAPIsErrorAction => ({
  type: SubscriptionsActionTypes.GET_APIS_ERROR,
})
