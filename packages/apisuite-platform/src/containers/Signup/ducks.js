/**
 * @module Signup/ducks
 */

import update from 'immutability-helper'
import { LOGIN_USER } from 'containers/Auth/ducks'
import { GET_INVITATION_ERROR } from 'containers/Team/ducks'

/**
 * Constants
 */
export const SIGNUP_USER = 'Signup/SIGNUP_USER'
export const SIGNUP_USER_SUCCESS = 'Signup/SIGNUP_USER_SUCCESS'
export const SIGNUP_USER_ERROR = 'Signup/SIGNUP_USER_ERROR'
export const SIGNUP_ORGANIZATION = 'Signup/SIGNUP_ORGANIZATION'
export const SIGNUP_ORGANIZATION_SUCCESS = 'Signup/SIGNUP_ORGANIZATION_SUCCESS'
export const SIGNUP_ORGANIZATION_ERROR = 'Signup/SIGNUP_ORGANIZATION_ERROR'
export const SIGNUP_SECURITY = 'Signup/SIGNUP_SECURITY'
export const SIGNUP_SECURITY_SUCCESS = 'Signup/SIGNUP_SECURITY_SUCCESS'
export const SIGNUP_SECURITY_ERROR = 'Signup/SIGNUP_SECURITY_ERROR'
export const SEND_ACTIVATION_EMAIL = 'Signup/SEND_ACTIVATION_EMAIL'
export const SEND_ACTIVATION_EMAIL_SUCCESS = 'Signup/SEND_ACTIVATION_EMAIL_SUCCESS'
export const SEND_ACTIVATION_EMAIL_ERROR = 'Signup/SEND_ACTIVATION_EMAIL_ERROR'
export const GENERATE_QRCODE = 'Signup/GENERATE_QRCODE'
export const GENERATE_QRCODE_SUCCESS = 'Signup/GENERATE_QRCODE_SUCCESS'
export const GENERATE_QRCODE_ERROR = 'Signup/GENERATE_QRCODE_ERROR'
export const SEND_SMS_CODE = 'Signup/SEND_SMS_CODE'
export const SEND_SMS_CODE_SUCCESS = 'Signup/SEND_SMS_CODE_SUCCESS'
export const SEND_SMS_CODE_ERROR = 'Signup/SEND_SMS_CODE_ERROR'
export const SKIP_STEP = 'Signup/SKIP_STEP'
export const RESET_SIGNUP = 'Signup/RESET_SIGNUP'

/**
 * Sign up state
 * @typedef {Object} state
 * @prop {array} [data] - Sign up data
 */
const initialState = {
  ui: {
    loading: false
  },
  user: {},
  error: null,
  step: 1,
  qrcode: ''
}

/**
 * Reducer
 * @param {state} [state=initialState] - Signup state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SIGNUP_USER:
    case SIGNUP_ORGANIZATION:
    case SIGNUP_SECURITY:
      return update(state, {
        ui: {
          loading: { $set: true }
        }
      })
    case SIGNUP_USER_SUCCESS:
    case SIGNUP_SECURITY_SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false }
        },
        user: { $set: action.data },
        step: { $set: state.step + 1 },
        error: { $set: null }

      })
    case SIGNUP_ORGANIZATION_SUCCESS:
      return update(state, {
        ui: {
          loading: { $set: false }
        },
        step: { $set: state.step + 1 },
        error: { $set: null }

      })
    case SIGNUP_USER_ERROR:
    case SIGNUP_ORGANIZATION_ERROR:
    case SIGNUP_SECURITY_ERROR:
    case GET_INVITATION_ERROR:
      return update(state, {
        ui: {
          loading: { $set: false }
        },
        error: { $set: action.error },
        user: { $set: {} },
        step: { $set: 1 },
        qrcode: { $set: '' }
      })
    case GENERATE_QRCODE_SUCCESS:
      return update(state, {
        qrcode: { $set: action.data }
      })
    case SKIP_STEP:
      return update(state, {
        step: { $set: state.step + 1 },
        error: { $set: null }
      })
    case LOGIN_USER:
    case RESET_SIGNUP:
      return update(state, {
        ui: {
          loading: { $set: false }
        },
        error: { $set: null },
        user: { $set: {} },
        step: { $set: 1 },
        qrcode: { $set: '' }
      })
    default:
      return state
  }
}

/**
 * Send activation email action creator
 */
export function sendActivationEmail (data) {
  return { type: SEND_ACTIVATION_EMAIL, data }
}

/**
 * Send activation email success
 * @param {Object} data - data received from the successful call
 */
export function sendActivationEmailSuccess (data) {
  return { type: SEND_ACTIVATION_EMAIL_SUCCESS, data }
}

/**
 * Send activation email error
 */
export function sendActivationEmailError (error) {
  return { type: SEND_ACTIVATION_EMAIL_ERROR, error }
}

/**
 * Sign up - User details step action creator
 */
export function signupUser (userData) {
  return { type: SIGNUP_USER, userData }
}

/**
 * Sign up - User details step success
 * @param {Object} data - data received from the successful call
 */
export function signupUserSuccess (data) {
  return { type: SIGNUP_USER_SUCCESS, data }
}

/**
 * Sign up - User details step error
 */
export function signupUserError (error) {
  return { type: SIGNUP_USER_ERROR, error }
}

/**
 * Sign up - Organization details step action creator
 */
export function signupOrganization (organizationData) {
  return { type: SIGNUP_ORGANIZATION, organizationData }
}

/**
 * Sign up - Organization details step success
 * @param {Object} data - data received from the successful call
 */
export function signupOrganizationSuccess () {
  return { type: SIGNUP_ORGANIZATION_SUCCESS }
}

/**
 * Sign up - Organization details step error
 */
export function signupOrganizationError (error) {
  return { type: SIGNUP_ORGANIZATION_ERROR, error }
}

/**
 * Sign up - Security details step action creator
 */
export function signupSecurity (securityData) {
  return { type: SIGNUP_SECURITY, securityData }
}

/**
 * Sign up - Security details step success
 * @param {Object} data - data received from the successful call
 */
export function signupSecuritySuccess (data) {
  return { type: SIGNUP_SECURITY_SUCCESS, data }
}

/**
 * Sign up - Security details step error
 */
export function signupSecurityError (error) {
  return { type: SIGNUP_SECURITY_ERROR, error }
}

/**
 * Generate qrcode action creator
 */
export function generateQRCode () {
  return { type: GENERATE_QRCODE }
}

/**
 * Generate qrcode success
 * @param {Object} data - data received from the successful call
 */
export function generateQRCodeSuccess (data) {
  return { type: GENERATE_QRCODE_SUCCESS, data }
}

/**
 * Generate qrcode error
 */
export function generateQRCodeError (error) {
  return { type: GENERATE_QRCODE_ERROR, error }
}

/**
 * Send sms code action creator
 */
export function sendSMSCode () {
  return { type: SEND_SMS_CODE }
}

/**
 * Send sms code success
 * @param {Object} data - data received from the successful call
 */
export function sendSMSCodeSuccess (data) {
  return { type: SEND_SMS_CODE_SUCCESS, data }
}

/**
 * Send sms code error
 */
export function sendSMSCodeError (error) {
  return { type: SEND_SMS_CODE_ERROR, error }
}

/**
 * Skip Signup step
 */
export function skipStep () {
  return { type: SKIP_STEP }
}

/**
 * Reset Signup to initialState
 */
export function resetSignup () {
  return { type: RESET_SIGNUP }
}
