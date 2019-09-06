import update from 'immutability-helper'

/**
* Constants
*/
export const OPEN_SUPPORT_MODAL = 'Support/OPEN_SUPPORT_MODAL'
export const RESET_SUPPORT_MODAL = 'Support/RESET_SUPPORT_MODAL'
export const SAVE_CAPTCHA = 'Support/SAVE_CAPTCHA'
export const RESET_CAPTCHA = 'Support/RESET_CAPTCHA'
export const SEND_SUPPORT_FORM = 'Support/SEND_SUPPORT_FORM'
export const SEND_SUPPORT_FORM_SUCCESS = 'Support/SEND_SUPPORT_FORM_SUCCESS'
export const SEND_SUPPORT_FORM_ERROR = 'Support/SEND_SUPPORT_FORM_ERROR'

/**
* Support state
* @typedef {Object} state
* @prop {bool} open - Indicates if the support modal should be opened.
* @prop {string} option - The type of inquiry selected
*/
const initialState = {
  open: false,
  option: null,
  captcha: {
    value: null
  },
  form: null
}

/**
 * Reducer
 * @param {state} [state=initialState] - Support state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case OPEN_SUPPORT_MODAL:
      return update(state, {
        open: { $set: true },
        option: { $set: action.option }
      })
    case RESET_SUPPORT_MODAL:
      return update(state, {
        open: { $set: false },
        option: { $set: null }
      })
    case SAVE_CAPTCHA:
      return update(state, {
        captcha: {
          value: { $set: action.value }
        }
      })
    case RESET_CAPTCHA:
      return update(state, {
        captcha: {
          value: { $set: null }
        }
      })
    case SEND_SUPPORT_FORM:
      return update(state, {
        captcha: {
          value: { $set: null }
        },
        form: { $set: action.form }
      })
    case SEND_SUPPORT_FORM_SUCCESS:
      return update(state, {
        captcha: {
          value: { $set: null }
        },
        form: { $set: action.data }
      })
    case SEND_SUPPORT_FORM_ERROR:
      return update(state, {
        captcha: {
          value: { $set: null }
        },
        form: { $set: null }
      })
    default:
      return state
  }
}

/**
 * open support modal action creator
 */
export function openSupportModal (option) {
  return { type: OPEN_SUPPORT_MODAL, option }
}

/**
 * reset support modal action creator
 */
export function resetSupportModal () {
  return { type: RESET_SUPPORT_MODAL }
}

/**
 * Save captcha action creator
 */
export function saveCaptcha (value) {
  return { type: SAVE_CAPTCHA, value }
}

/**
 * Reset captcha action
 */
export function resetCaptcha () {
  return { type: RESET_CAPTCHA }
}

/**
 * Send support form action creator
 */
export function sendSupportForm (form) {
  return { type: SEND_SUPPORT_FORM, form }
}

/**
 * Send support form success
 * @param {Object} data - data received from the successful call
 */
export function sendSupportFormSuccess (data) {
  return { type: SEND_SUPPORT_FORM_SUCCESS, data }
}

/**
 * Send support form error
 */
export function sendSupportFormError (error) {
  return { type: SEND_SUPPORT_FORM_ERROR, error }
}
