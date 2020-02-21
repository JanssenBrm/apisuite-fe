import update from 'immutability-helper'

import { AppStoreState, AppStoreActionCreators, AppStoreActionTypes } from './types'
import { Reducer } from 'redux'

export const INFORM = 'App/INFORM'
export const INFORM_SUCCESS = 'App/INFORM_SUCCESS'
export const INFORM_ERROR = 'App/INFORM_ERROR'

const initialState: AppStoreState = {
  requestingInform: false,
  requestInformErrorMessage: '',
}

const reducer: Reducer<AppStoreState> = function (state = initialState, action) {
  switch (action.type) {
    case INFORM: {
      return update(state, {
        requestingInform: { $set: true },
        requestInformErrorMessage: { $set: '' },
      })
    }

    case INFORM_SUCCESS: {
      return update(state, {
        requestingInform: { $set: false },
        requestInformErrorMessage: { $set: '' },
      })
    }
    case INFORM_ERROR: {
      const { payload: { message } } = action as AppStoreActionTypes['informError']

      return update(state, {
        requestingInform: { $set: false },
        requestInformErrorMessage: { $set: message },
      })
    }

    default:
      return state
  }
}

export default reducer

export const appStoreActionCreators: AppStoreActionCreators = {
  inform: (payload) => ({ type: INFORM, payload }),
  informSuccess: () => ({ type: INFORM_SUCCESS }),
  informError: (payload) => ({ type: INFORM_ERROR, payload }),
}
