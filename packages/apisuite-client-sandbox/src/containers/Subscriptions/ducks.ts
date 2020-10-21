import update from 'immutability-helper'
import { AuthStoreActionTypes } from 'containers/Auth/types'
import { LOGOUT } from 'containers/Auth/ducks'
import {
  SubscriptionsStore,
  SubscriptionsActions,
  Api,
  ApiResponse,
  GetApisAction,
  GetApisSuccessAction,
  GetApisErrorAction,
} from './types'

/** Initial state */
const initialState: SubscriptionsStore = {
  apis: [],
}

/** Action types */
export enum SubscriptionsActionTypes {
  GET_APIS = 'GET_APIS',
  GET_APIS_SUCCESS = 'GET_APIS_SUCCESS',
  GET_APIS_ERROR = 'GET_APIS_ERROR',
  ADD_APP_SUBSCRIPTION = 'ADD_APP_SUBSCRIPTION',
  ADD_APP_SUBSCRIPTION_SUCCESS = 'ADD_APP_SUBSCRIPTION_SUCCESS',
  ADD_APP_SUBSCRIPTION_ERROR = 'ADD_APP_SUBSCRIPTION_ERROR',
  REMOVE_APP_SUBSCRIPTION = 'REMOVE_APP_SUBSCRIPTION',
  REMOVE_APP_SUBSCRIPTION_SUCCESS = 'REMOVE_APP_SUBSCRIPTION_SUCCESS',
  REMOVE_APP_SUBSCRIPTION_ERROR = 'REMOVE_APP_SUBSCRIPTION_ERROR',
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
      const apis: Api[] = action.apis.map(api => ({
        baseUri: api.baseUri,
        id: api.id,
        name: api.name,
        baseUriSandbox: api.baseUriSandbox,
        docs: api.docs,
      }))

      return update(state, {
        apis: { $set: apis },
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
export const getApis = (): GetApisAction => ({
  type: SubscriptionsActionTypes.GET_APIS,
})

export const getApisSuccess = (apis: ApiResponse[]): GetApisSuccessAction => ({
  type: SubscriptionsActionTypes.GET_APIS_SUCCESS,
  apis: apis,
})

export const getApisError = (): GetApisErrorAction => ({
  type: SubscriptionsActionTypes.GET_APIS_ERROR,
})
