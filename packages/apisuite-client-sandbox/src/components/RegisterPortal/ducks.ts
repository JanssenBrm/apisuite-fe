/**
 * @module Register/ducks
 */

export const REGISTER_USER = 'Register/REGISTER_USER'

const initialState = {}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case REGISTER_USER: {
      return state
    }
    default:
      return state
  }
}

export function registerUser (userData) {
  return { type: REGISTER_USER, userData }
}
