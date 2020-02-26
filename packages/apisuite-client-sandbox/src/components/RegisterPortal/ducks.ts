/**
 * @module Register/ducks
 */
import update from 'immutability-helper'

export const REGISTER_USER = 'Register/REGISTER_USER'
export const REGISTER_USER_SUCCESS = 'Register/REGISTER_USER_SUCCESS'
export const REGISTER_USER_ERROR = 'Register/REGISTER_USER_ERROR'
const LOGIN = 'auth/LOGIN'
const LOGOUT = 'auth/LOGOUT'

const initialState = {
  user: undefined,
  isRegistering: false,
  isRegistered: false,
  error: undefined,
}

export default function reducer (state = initialState, action: any) {
  switch (action.type) {
    case REGISTER_USER: {
      return update(state, {
        user: { $set: action.userData.name },
        isRegistering: { $set: true },
        isRegistered: { $set: false },
        error: { $set: undefined },
      })
    }

    case REGISTER_USER_SUCCESS: {
      return update(state, {
        isRegistering: { $set: false },
        isRegistered: { $set: true },
        error: { $set: undefined },
      })
    }

    case REGISTER_USER_ERROR: {
      return update(state, {
        isRegistering: { $set: false },
        user: { $set: undefined },
        error: { $set: action.error || 'Whoops, something went wrong...' },
      })
    }

    case LOGOUT:
    case LOGIN: {
      return update(state, {
        isRegistering: { $set: false },
        isRegistered: { $set: false },
        user: { $set: undefined },
        error: { $set: undefined },
      })
    }

    default:
      return state
  }
}

// export function registerUser (userData: UserData) {
//   return { type: REGISTER_USER, userData }
// }

export const registerActions = {
  registerUser: (userData: any) => ({ type: REGISTER_USER, userData }),
  registerUserSuccess: (payload: any) => ({ type: REGISTER_USER_SUCCESS, payload }),
  registerUserError: (error: any) => ({ type: REGISTER_USER_ERROR, error }),
}
