import update from 'immutability-helper'
import {
  SecurityActions,
  UpdatePasswordRequestAction,
  UpdatePasswordRequestErrorAction,
  UpdatePasswordRequestSuccessAction,
} from 'containers/Security/types'

// Initial state
const initialState = {
  isRequesting: false,
}

// Action types
export const UPDATE_PASSWORD_REQUEST = 'SECURITY/UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_REQUEST_SUCCESS = 'SECURITY/UPDATE_PASSWORD_REQUEST_SUCCESS'
export const UPDATE_PASSWORD_REQUEST_ERROR = 'SECURITY/UPDATE_PASSWORD_REQUEST_ERROR'

// Reducer
export default function securityReducer (
  state = initialState,
  action: SecurityActions,
) {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return update(state, {
        isRequesting: { $set: true },
      })
    case UPDATE_PASSWORD_REQUEST_SUCCESS:
    case UPDATE_PASSWORD_REQUEST_ERROR:
    default:
      return update(state, {
        isRequesting: { $set: true },
      })
  }
}

// Action builders
export const updatePasswordRequestAction = (oldPassword: string, newPassword: string): UpdatePasswordRequestAction => ({
  type: UPDATE_PASSWORD_REQUEST,
  payload: {
    oldPassword: oldPassword,
    newPassword: newPassword,
  },
})

export const updatePasswordRequestSuccessAction = (): UpdatePasswordRequestSuccessAction => ({
  type: UPDATE_PASSWORD_REQUEST_SUCCESS,
})

export const updatePasswordRequestErrorAction = (): UpdatePasswordRequestErrorAction => ({
  type: UPDATE_PASSWORD_REQUEST_ERROR,
})
