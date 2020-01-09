/**
 * @module Register/ducks
 */

import { Action } from 'redux'
import { UserData } from './types'

export const REGISTER_USER = 'Register/REGISTER_USER'

const initialState = {}

export default function reducer (state = initialState, action: Action) {
  switch (action.type) {
    case REGISTER_USER: {
      return state
    }
    default:
      return state
  }
}

export function registerUser (userData: UserData) {
  return { type: REGISTER_USER, userData }
}
