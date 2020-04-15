import update from 'immutability-helper'
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
  GET_APIS_SUCCESS = 'GET_APIS_UCCESS',
  GET_APIS_ERROR = 'GET_APIS_ERROR',
  ADD_APP_SUBSCRIPTION = 'ADD_APP_SUBSCRIPTION',
  REMOVE_APP_SUBSCRIPTION = 'REMOVE_APP_SUBSCRIPTION'
}

// TODO: name all reducers according to feature and change them to named exports
/** Reducer */
export default function subscriptionsReducer (
  state = initialState,
  action: SubscriptionsActions,
): SubscriptionsStore {
  switch (action.type) {
    case SubscriptionsActionTypes.GET_APIS: {
      return state
    }

    case SubscriptionsActionTypes.GET_APIS_SUCCESS: {
      const apis: Api[] = action.apis.map(api => ({
        apiTitle: api.api_title,
        id: api.id,
        name: api.name,
        version: api.version,
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
