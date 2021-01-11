import { Action } from 'redux'
import {
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_REQUEST_ERROR,
  UPDATE_PASSWORD_REQUEST_SUCCESS,
} from './ducks'

export interface SecurityProps {
  updatePasswordRequest: (oldPassword: string, newPassword: string) => void,
}

// Action types
export interface UpdatePasswordRequestAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST,
  payload: {
    oldPassword: string,
    newPassword: string,
  },
}

export interface UpdatePasswordRequestSuccessAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST_SUCCESS,
}

export interface UpdatePasswordRequestErrorAction extends Action {
  type: typeof UPDATE_PASSWORD_REQUEST_ERROR,
}

export type SecurityActions =
  UpdatePasswordRequestAction |
  UpdatePasswordRequestErrorAction |
  UpdatePasswordRequestSuccessAction
