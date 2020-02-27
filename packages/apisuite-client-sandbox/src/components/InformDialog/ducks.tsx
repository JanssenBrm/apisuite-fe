import update from 'immutability-helper'

import { AppStoreState, AppStoreActionCreators, AppStoreActionTypes } from './types'
import { Reducer } from 'redux'

export const OPEN_INFORM = 'App/OPEN_INFORM'
export const CLOSE_INFORM = 'App/CLOSE_INFORM'
export const INFORM = 'App/INFORM'
export const INFORM_SUCCESS = 'App/INFORM_SUCCESS'
export const INFORM_ERROR = 'App/INFORM_ERROR'

const initialState: AppStoreState = {
  requestingInform: false,
  requestInformErrorMessage: '',
  open: false,
}

const reducer: Reducer<AppStoreState> = function (state = initialState, action) {
  switch (action.type) {
    case OPEN_INFORM: {
      return update(state, {
        open: { $set: true },
      })
    }

    case CLOSE_INFORM: {
      return update(state, {
        open: { $set: false },
      })
    }

    case INFORM: {
      return update(state, {
        requestingInform: { $set: true },
        requestInformErrorMessage: { $set: '' },
      })
    }

    case INFORM_SUCCESS: {
      return update(state, {
        open: { $set: false },
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
  informOpen: () => ({ type: OPEN_INFORM }),
  informClose: () => ({ type: CLOSE_INFORM }),
  inform: (payload) => ({ type: INFORM, payload }),
  informSuccess: () => ({ type: INFORM_SUCCESS }),
  informError: (payload) => ({ type: INFORM_ERROR, payload }),
}
