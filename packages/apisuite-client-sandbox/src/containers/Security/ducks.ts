import {
  SecurityActions,
  UpdatePasswordRequestAction,
  UpdatePasswordRequestErrorAction,
  UpdatePasswordRequestSuccessAction,
} from 'containers/Security/types'

// Initial state
const initialState = {}

// Action types
export const UPDATE_PASSWORD_REQUEST = 'UPDATE_PASSWORD_REQUEST'
export const UPDATE_PASSWORD_REQUEST_SUCCESS = 'UPDATE_PASSWORD_REQUEST_SUCCESS'
export const UPDATE_PASSWORD_REQUEST_ERROR = 'UPDATE_PASSWORD_REQUEST_ERROR'

// Reducer
export default function securityReducer (
  state = initialState,
  action: SecurityActions,
) {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      console.log('"UPDATE_PASSWORD_REQUEST" action is being called')
      return state
    case UPDATE_PASSWORD_REQUEST_SUCCESS:
    case UPDATE_PASSWORD_REQUEST_ERROR:
    default:
      return state
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
