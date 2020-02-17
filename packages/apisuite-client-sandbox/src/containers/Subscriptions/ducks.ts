import update from 'immutability-helper'
import { SubStore } from './types'
import { Reducer, AnyAction } from 'redux'

export const DELETE_APP_SUB = 'subscriptions/DELETE_APP_SUB'
export const DELETE_APP_SUB_SUCCESS = 'subscriptions/DELETE_APP_SUB_SUCCESS'
export const ADD_APP_SUB = 'subscriptions/ADD_APP'
export const ADD_APP_SUB_SUCCESS = 'subscriptions/ADD_APP_SUCCESS'

const initialState: SubStore = {
  subscribedAPIs:
    [
      {
        name: 'PSD2 Payment Initiation',
        versions: [
          {
            vName: 'Payment Initiation API v1',
            vNumber: 'v 1.04.3.2',
          },
          {
            vName: 'Payment Initiation API v2',
            vNumber: 'v 2.01.0',
          },
        ],
        apps: [
          {
            name: 'TA',
            isLoading: false,
          },
          {
            name: 'T2',
            isLoading: false,
          },
        ],
        description: 'With PSD2 the European Commission has published a new directive on payment services in the EEA internal market. Among others PSD2 contains regulations of new services to be operated by…',
      },
      {
        name: 'Petstore',
        versions: [
          {
            vName: 'Petstore API v1',
            vNumber: 'v 1.2.34',
          },
        ],
        apps: [
          {
            name: 'TA',
            isLoading: false,
          },
        ],
        description: 'This Petstore API is amazing. I love dogs!',
      },
      {
        name: 'PSD2 Account Information',
        versions: [
          {
            vName: 'AIS STET API v1',
            vNumber: 'v 1.06',
          },
        ],
        apps: [],
        description: 'Offer personalized information to your clients with the PSD2 Account Information API',
      },
    ],
  userApps:
    [
      {
        name: 'TZ1',
        isLoading: false,
      },
      {
        name: 'TZ3',
        isLoading: false,
      },
      {
        name: 'TA',
        isLoading: false,
      },
      {
        name: 'T2',
        isLoading: false,
      },
      {
        name: 'PUBB',
        isLoading: false,
      },
    ],
}

const reducer: Reducer<SubStore, AnyAction> = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_APP_SUB: {
      return update(state, {
        subscribedAPIs: {
          [action.APIid]: {
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
      return update(state, {
        subscribedAPIs: {
          [action.APIid]: {
            apps: { $splice: [[action.appNumber, 1]] },
          },
        },
      })
    }

    case ADD_APP_SUB: {
      return update(state, {
        subscribedAPIs: {
          [action.APIid]: {
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
      return update(state, {
        subscribedAPIs: {
          [action.APIid]: {
            apps: {
              [action.newAppNumber]: {
                isLoading: { $set: false },
              },
            },
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
