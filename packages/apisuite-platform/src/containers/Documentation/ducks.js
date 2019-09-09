/**
 * @module Documentation/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const CHANGE_TOPIC = 'documentation/CHANGE_TOPIC'

/**
 * Locale state
 * @typedef {Object} state
 * @prop {string[]} currentTopic - the current topic
 */
const initialState = {
  topic: null,
  child: null,
}

/**
 * Reducer
 * @param {state} state Locale state or initialState
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case CHANGE_TOPIC:
      return update(state, {
        topic: { $set: action.topic },
        child: { $set: action.child },
      })
    default:
      return state
  }
}

/**
 * change locale action creator
 * @param {string} locale - the locale string
 */
export function changeTopic (topic, child) {
  return { type: CHANGE_TOPIC, topic, child }
}
