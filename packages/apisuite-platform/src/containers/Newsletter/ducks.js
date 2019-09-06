import update from 'immutability-helper'

/**
 * Constants
 */
export const SEND_NEWSLETTER_FORM = 'Newsletter/SEND_NEWSLETTER_FORM'
export const SEND_NEWSLETTER_FORM_SUCCESS = 'Newsletter/SEND_NEWSLETTER_FORM_SUCCESS'
export const SEND_NEWSLETTER_FORM_ERROR = 'Newsletter/SEND_NEWSLETTER_FORM_ERROR'
export const RESET_NEWSLETTER_FORM = 'Newsletter/RESET_NEWSLETTER_FORM'

/**
 * Support state
 * @typedef {Object} state
 * @prop {string} option - The type of inquiry selected
 */
const initialState = {
  form: null,
  success: null,
  error: null
}

/**
 * Reducer
 * @param {state} [state=initialState] - Newsletter state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SEND_NEWSLETTER_FORM:
      return update(state, {
        form: {$set: action.form},
        success: {$set: null},
        error: {$set: null}
      })
    case SEND_NEWSLETTER_FORM_SUCCESS:
      return update(state, {
        success: {$set: action.data}
      })
    case SEND_NEWSLETTER_FORM_ERROR:
      return update(state, {
        error: {$set: action.error}
      })
    case RESET_NEWSLETTER_FORM:
      return update(state, {
        form: {$set: null},
        success: {$set: null},
        error: {$set: null}
      })
    default:
      return state
  }
}

/**
 * Send support form action creator
 */
export function sendNewsletterForm (form) {
  return {type: SEND_NEWSLETTER_FORM, form}
}

/**
 * Send support form success
 * @param {Object} data - data received from the successful call
 */
export function sendNewsletterFormSuccess (data) {
  return {type: SEND_NEWSLETTER_FORM_SUCCESS, data}
}

/**
 * Send newsletter form error
 */
export function sendNewsletterFormError (error) {
  return {type: SEND_NEWSLETTER_FORM_ERROR, error}
}

/**
 * reset newsletter form
 */
export function resetNewsletterForm () {
  return {type: RESET_NEWSLETTER_FORM}
}
