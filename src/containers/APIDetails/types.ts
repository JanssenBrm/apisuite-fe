import { Action } from 'redux'
import {
  GET_API_VERSION,
  GET_API_VERSION_SUCCESS,
  GET_API_VERSION_ERROR,
} from './ducks'
import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'
import { APIVersion } from 'containers/Subscriptions/types'

export type APIVersionProps =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export type APIDetailParams = {
  apiId?: string,
  versionId?: string,
}

export type APIVersionStore = {
  requested: boolean,
  error: boolean,
  version: APIVersion,
}

/** Action types */
export interface GetAPIVersionAction extends Action {
  type: typeof GET_API_VERSION,
  payload: APIDetailParams,
}

export interface GetAPIVersionSuccessAction extends Action {
  type: typeof GET_API_VERSION_SUCCESS,
  version: APIVersion,
}

export interface GetAPIVersionErrorAction extends Action {
  type: typeof GET_API_VERSION_ERROR,
  error: Error,
}

export type APIVersionActions =
  GetAPIVersionAction |
  GetAPIVersionSuccessAction |
  GetAPIVersionErrorAction
