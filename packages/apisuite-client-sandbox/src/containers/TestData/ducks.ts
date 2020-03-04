import { Reducer } from 'redux'
import { TestDataStore, TestDataActions } from './types'

export const GET_TEST_USERS_ACTION = 'TestData/GET_TEST_USERS_ACTION'
export const GET_TEST_USERS_SUCCESS_ACTION = 'TestData/GET_TEST_USERS_SUCCESS_ACTION'
export const GET_TEST_USERS_ERROR_ACTION = 'TestData/GET_TEST_USERS_ERROR_ACTION'
export const GET_TEST_USER_ACTION = 'TestData/GET_TEST_USER_ACTION'
export const GET_TEST_USER_SUCCESS_ACTION = 'TestData/GET_TEST_USER_SUCCESS_ACTION'
export const GET_TEST_USER_ERROR_ACTION = 'TestData/GET_TEST_USER_ERROR_ACTION'
export const CREATE_TEST_USER_ACTION = 'TestData/CREATE_TEST_USER_ACTION'
export const CREATE_TEST_USER_SUCCESS_ACTION = 'TestData/CREATE_TEST_USER_SUCCESS_ACTION'
export const CREATE_TEST_USER_ERROR_ACTION = 'TestData/CREATE_TEST_USER_ERROR_ACTION'
export const DELETE_TEST_USER_ACTION = 'TestData/DELETE_TEST_USER_ACTION'
export const DELETE_TEST_USER_SUCCESS_ACTION = 'TestData/DELETE_TEST_USER_SUCCESS_ACTION'
export const DELETE_TEST_USER_ERROR_ACTION = 'TestData/DELETE_TEST_USER_ERROR_ACTION'

const initialState: TestDataStore = {
  testUsers: [
    ['Thomas Edison', 'most active user'],
    ['Marie Curie', 'new'],
    ['Albert Einstein', 'novice user'],
    ['Nikola Tesla', 'average'],
    ['Pierre-Simon', 'novice user'],
    ['Thomas Edison', 'novice user'],
    ['Marie Curie', 'average'],
    ['Albert Einstein', 'idle user'],
    ['Nikola Tesla', 'new'],
    ['Pierre-Simon', 'new'],
    ['Maxwell', 'idle user'],
  ],
}

const reducer: Reducer<TestDataStore, TestDataActions> = (state = initialState, action) => {
  switch (action.type) {
    case GET_TEST_USERS_ACTION: {
      return state
    }
    default:
      return state
  }
}

export function getTestUsers () {
  return { type: GET_TEST_USERS_ACTION }
}

export default reducer
