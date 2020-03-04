import { Action } from 'redux'
import { History } from 'history'
import { GET_TEST_USERS_ACTION, GET_TEST_USERS_SUCCESS_ACTION, GET_TEST_USERS_ERROR_ACTION, GET_TEST_USER_ACTION, GET_TEST_USER_SUCCESS_ACTION, GET_TEST_USER_ERROR_ACTION, CREATE_TEST_USER_ACTION, CREATE_TEST_USER_SUCCESS_ACTION, CREATE_TEST_USER_ERROR_ACTION, DELETE_TEST_USER_ACTION, DELETE_TEST_USER_SUCCESS_ACTION, DELETE_TEST_USER_ERROR_ACTION } from './ducks'

export interface TestDataProps {
  history: History,
}

export interface TestDataStore {
  testUsers: string[][],
}

export interface GetTestUsersAction extends Action {
  type: typeof GET_TEST_USERS_ACTION,
}

export interface GetTestUsersSuccessAction extends Action {
  type: typeof GET_TEST_USERS_SUCCESS_ACTION,
}

export interface GetTestUsersErrorAction extends Action {
  type: typeof GET_TEST_USERS_ERROR_ACTION,
}

export interface GetTestUserAction extends Action {
  type: typeof GET_TEST_USER_ACTION,
}

export interface GetTestUserSuccessAction extends Action {
  type: typeof GET_TEST_USER_SUCCESS_ACTION,
}

export interface GetTestUserErrorAction extends Action {
  type: typeof GET_TEST_USER_ERROR_ACTION,
}

export interface CreateTestUserAction extends Action {
  type: typeof CREATE_TEST_USER_ACTION,
}

export interface CreateTestUserSuccessAction extends Action {
  type: typeof CREATE_TEST_USER_SUCCESS_ACTION,
}

export interface CreateTestUserErrorAction extends Action {
  type: typeof CREATE_TEST_USER_ERROR_ACTION,
}

export interface DeleteTestUserAction extends Action {
  type: typeof DELETE_TEST_USER_ACTION,
}

export interface DeleteTestUserSuccessAction extends Action {
  type: typeof DELETE_TEST_USER_SUCCESS_ACTION,
}

export interface DeleteTestUserErrorAction extends Action {
  type: typeof DELETE_TEST_USER_ERROR_ACTION,
}

export type TestDataActions = GetTestUsersAction | GetTestUsersSuccessAction | GetTestUsersErrorAction
| GetTestUserAction | GetTestUserSuccessAction | GetTestUserErrorAction
| CreateTestUserAction | CreateTestUserSuccessAction | CreateTestUserErrorAction
| DeleteTestUserAction | DeleteTestUserSuccessAction | DeleteTestUserErrorAction
