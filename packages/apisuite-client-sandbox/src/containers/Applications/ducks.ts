import { Action } from 'redux'

export const CREATE_APP = 'Applications/CREATE_APP'

const initinalState = {}

export default function reducer (state = initinalState, action: Action) {
  switch (action.type) {
    case CREATE_APP: {
      return state
    }
    default:
      return state
  }
}

export function createApp () {
  return { type: CREATE_APP }
}
