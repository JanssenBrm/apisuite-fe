/**
 * @module RecoveryCodes/ducks
 */

import update from 'immutability-helper'

/**
 * Constants
 */
export const GET_CODES = 'RecoveryCodes/GET_CODES'
export const GET_CODES_SUCCESS = 'RecoveryCodes/GET_CODES_SUCCESS'
export const GET_CODES_ERROR = 'RecoveryCodes/GET_CODES_ERROR'
export const CLEAN_CODES = 'RecoveryCodes/CLEAN_CODES'

const initialState = {
  codes: [],
}

/**
 * Reducer
 * @param {state} [state=initialState] - Auth state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case GET_CODES_SUCCESS:
      return update(state, {
        codes: { $set: action.data },
      })
    case CLEAN_CODES:
    case GET_CODES_ERROR:
      return update(state, {
        codes: { $set: [] },
      })
    default:
      return state
  }
}

/**
 * Get codes action creator
 */
export function getCodes (pass) {
  return { type: GET_CODES, pass }
}

/**
 * Get codes success action creator
 */
export function getCodesSuccess (data) {
  return { type: GET_CODES_SUCCESS, data }
}

/**
 * Get codes error action creator
 */
export function getCodesError (error) {
  return { type: GET_CODES_ERROR, error }
}

/**
 * Clean codes action creator
 */
export function cleanCodes () {
  return { type: CLEAN_CODES }
}
