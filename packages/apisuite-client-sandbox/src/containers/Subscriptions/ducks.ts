import update from 'immutability-helper'
import { SubStore, AppSubActions } from './types'
import { Reducer } from 'redux'

export const DELETE_APP_SUB = 'subscriptions/DELETE_APP_SUB'
export const DELETE_APP_SUB_SUCCESS = 'subscriptions/DELETE_APP_SUB_SUCCESS'
export const ADD_APP_SUB = 'subscriptions/ADD_APP'
export const ADD_APP_SUB_SUCCESS = 'subscriptions/ADD_APP_SUCCESS'
export const GET_USER_APPS_SUCCESS = 'Applications/GET_USER_APPS_SUCCESS'

const initialState: SubStore = {
  subscribedAPIs:
    [
      {
        id: 13,
        name: 'Petstore',
        versions: [
          {
            vName: 'Petstore API v1',
            vNumber: 'v 1.0.0',
          },
        ],
        apps: [],
        description: 'This Petstore API is amazing. I love dogs!',
      },
    ],
  userApps:
    [],
}

const reducer: Reducer<SubStore, AppSubActions> = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_APP_SUB: {
      const indx = state.subscribedAPIs.findIndex(api => api.id === action.APIid)
      return update(state, {
        subscribedAPIs: {
          [indx]: {
            apps: {
              [action.appNumber]: {
                isLoading: { $set: true },
              },
            },
          },
        },
      })
    }

    case DELETE_APP_SUB_SUCCESS: {
      const indx = state.subscribedAPIs.findIndex(api => api.id === action.APIid)
      return update(state, {
        subscribedAPIs: {
          [indx]: {
            apps: { $splice: [[action.appNumber, 1]] },
          },
        },
      })
    }

    case ADD_APP_SUB: {
      const indx = state.subscribedAPIs.findIndex(api => api.id === action.APIid)
      return update(state, {
        subscribedAPIs: {
          [indx]: {
            apps: {
              $push: [{
                name: action.appName,
                isLoading: true,
              }],
            },
          },
        },
      })
    }

    case ADD_APP_SUB_SUCCESS: {
      const indx = state.subscribedAPIs.findIndex(api => api.id === action.APIid)
      return update(state, {
        subscribedAPIs: {
          [indx]: {
            apps: {
              [action.newAppNumber]: {
                isLoading: { $set: false },
              },
            },
          },
        },
      })
    }

    case GET_USER_APPS_SUCCESS: {
      const userApps = action.userApps
      return update(state, {
        subscribedAPIs: {
          0: {
            apps: { $set: userApps.filter(app => app.enable).map(app => ({ name: app.name, isLoading: false })) },
          },
        },
      })
    }

    default:
      return state
  }
}

export function deleteAppSub (APIid: number, appNumber: number) {
  return { type: DELETE_APP_SUB, APIid, appNumber }
}

export function deleteAppSubSuccess (APIid: number, appNumber: number) {
  return { type: DELETE_APP_SUB_SUCCESS, APIid, appNumber }
}

export function addAppSub (APIid: number, appName: string, newAppNumber: number) {
  return { type: ADD_APP_SUB, APIid, appName, newAppNumber }
}

export function addAppSubSuccess (APIid: number, newAppNumber: number) {
  return { type: ADD_APP_SUB_SUCCESS, APIid, newAppNumber }
}

export default reducer
