import update from 'immutability-helper'
import { AppData, ApplicationsStore, ApplicationsActions } from './types'
import { SubscriptionsActionTypes } from 'containers/Subscriptions/ducks'
import { SubscriptionsActions } from 'containers/Subscriptions/types'
import { AuthStoreActionTypes } from 'containers/Auth/types'
import { LOGOUT } from 'containers/Auth/ducks'

/** Initial state */
const initialState: ApplicationsStore = {
  currentApp: {
    appId: 0,
    name: '',
    description: '',
    redirectUrl: '',
    logo: 'http://logo.png',
    orgId: 0,
    subscriptions: [],
    visibility: 'private',
    pubUrls: [{
      url: '',
      type: 'client',
    }],
    enable: true,
    clientId: '',
    clientSecret: '',
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
  subscribing: {
    isRequesting: false,
    isError: false,
  },
}

/** Action types */
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
export const RESET_CURRENT_APP = 'Applications/RESET_CURRENT_APP'

// TODO: name all reducers according to feature and change them to named exports
/** Reducer */
export default function reducer (
  state = initialState,
  action: ApplicationsActions | SubscriptionsActions | AuthStoreActionTypes['logout'],
): ApplicationsStore {
  switch (action.type) {
    case LOGOUT: {
      return state
    }
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
          name: { $set: action.appData.name },
          description: { $set: action.appData.description },
          redirectUrl: { $set: action.appData.redirectUrl },
          logo: { $set: action.appData.logo },
          orgId: { $set: action.appData.orgId },
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
          orgId: { $set: action.appData.orgId },
          subscriptions: { $set: action.appData.subscriptions },
          pubUrls: { $set: action.appData.pubUrls },
          createdAt: { $set: action.appData.createdAt },
          updatedAt: { $set: action.appData.updatedAt },
          clientId: { $set: action.appData.clientId },
          clientSecret: { $set: action.appData.clientSecret },
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

    /** Actions related to adding and removing app subscriptions to APIs */
    case SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION: {
      return update(state, {
        subscribing: {
          isRequesting: { $set: true },
        },
      })
    }

    case SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_SUCCESS: {
      return update(state, {
        userApps: { [action.updatedAppIndx]: { $set: action.updatedApp } },
        subscribing: { isRequesting: { $set: false } },
      })
    }

    case SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_ERROR: {
      return update(state, {
        subscribing: { isRequesting: { $set: false } },
      })
    }

    case SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION: {
      return update(state, {
        subscribing: {
          isRequesting: { $set: true },
        },
      })
    }

    case SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_SUCCESS: {
      return update(state, {
        userApps: { [action.updatedAppIndx]: { $set: action.updatedApp } },
        subscribing: { isRequesting: { $set: false } },
      })
    }

    case SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_ERROR: {
      return update(state, {
        subscribing: { isRequesting: { $set: false } },
      })
    }

    default:
      return state
  }
}

/** Action builders */
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

export function deleteApp (appId: number, orgId?: number) {
  return { type: DELETE_APP, appId, orgId }
}

export function deleteAppSuccess () {
  return { type: DELETE_APP_SUCCESS }
}

export function deleteAppError () {
  return { type: DELETE_APP_ERROR }
}

export function getAppDetails (appId: number, orgId: number) {
  return { type: GET_APP_DETAILS, appId, orgId }
}

export function getAppDetailsSuccess (appData: AppData) {
  return { type: GET_APP_DETAILS_SUCCESS, appData }
}

export function getUserApps (orgId: number) {
  return { type: GET_USER_APPS, orgId }
}

export function getUserAppsSuccess (userApps: AppData[]) {
  return { type: GET_USER_APPS_SUCCESS, userApps }
}

export function addAppSubscription (appId: number, apiName: string) {
  return { type: SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION, appId, apiName }
}

export function addAppSubscriptionSuccess (updatedApp: AppData, updatedAppIndx: number) {
  return { type: SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_SUCCESS, updatedAppIndx, updatedApp }
}

export function addAppSubscriptionError () {
  return { type: SubscriptionsActionTypes.ADD_APP_SUBSCRIPTION_ERROR }
}

export function removeAppSubscription (appId: number, apiName: string) {
  return { type: SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION, appId, apiName }
}

export function removeAppSubscriptionSuccess (updatedApp: AppData, updatedAppIndx: number) {
  return { type: SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_SUCCESS, updatedAppIndx, updatedApp }
}

export function removeAppSubscriptionError () {
  return { type: SubscriptionsActionTypes.REMOVE_APP_SUBSCRIPTION_ERROR }
}
