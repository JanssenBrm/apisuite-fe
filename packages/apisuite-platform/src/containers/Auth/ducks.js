/**
 * @module Auth/ducks
 */

import cookie from 'js-cookie'
import update from 'immutability-helper'
import { SIGNUP_SECURITY_SUCCESS, RESET_SIGNUP } from '../Signup/ducks'
import { GET_CODES_SUCCESS, CLEAN_CODES } from '../RecoveryCodes/ducks'

/**
 * Constants
 */
export const TOKEN_KEY = 'a_t'
export const TOKEN_MAX_AGE = 30 // <-- 1 month
export const LOGIN_USER = 'Auth/LOGIN_USER'
export const LOGIN_USER_SUCCESS = 'Auth/LOGIN_USER_SUCCESS'
export const LOGIN_USER_ERROR = 'Auth/LOGIN_USER_ERROR'
export const LOGIN_USER_TWOFA = 'Auth/LOGIN_USER_TWOFA'
export const LOGIN_USER_TWOFA_AUTH = 'Auth/LOGIN_USER_TWOFA_AUTH'
export const LOGIN_USER_TWOFA_AUTH_SUCCESS = 'Auth/LOGIN_USER_TWOFA_AUTH_SUCCESS'
export const LOGIN_USER_TWOFA_AUTH_ERROR = 'Auth/LOGIN_USER_TWOFA_AUTH_ERROR'
export const GITHUB_LOGIN_USER = 'Auth/GITHUB_LOGIN_USER'
export const GITHUB_LOGIN_USER_SUCCESS = 'Auth/GITHUB_LOGIN_USER_SUCCESS'
export const GITHUB_LOGIN_USER_ERROR = 'Auth/GITHUB_LOGIN_USER_ERROR'
export const GET_ME = 'Auth/GET_ME'
export const GET_ME_SUCCESS = 'Auth/GET_ME_SUCCESS'
export const GET_ME_ERROR = 'Auth/GET_ME_ERROR'
export const LOGOUT_USER = 'Auth/LOGOUT_USER'
export const LOGOUT_USER_SUCCESS = 'Auth/LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_ERROR = 'Auth/LOGOUT_USER_ERROR'
export const FORGOT_PASSWORD = 'Auth/FORGOT_PASSWORD'
export const FORGOT_PASSWORD_SUCCESS = 'Auth/FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_ERROR = 'Auth/FORGOT_PASSWORD_ERROR'
export const RESET_PASSWORD = 'Auth/RESET_PASSWORD'
export const RESET_PASSWORD_SUCCESS = 'Auth/RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_ERROR = 'Auth/RESET_PASSWORD_ERROR'
export const TWOFA_UPDATE = 'Auth/TWOFA_UPDATE'
export const TWOFA_UPDATE_SUCCESS = 'Auth/TWOFA_UPDATE_SUCCESS'
export const TWOFA_UPDATE_ERROR = 'Auth/TWOFA_UPDATE_ERROR'
export const TWOFA_VERIFY = 'Auth/TWOFA_VERIFY'
export const TWOFA_VERIFY_SUCCESS = 'Auth/TWOFA_VERIFY_SUCCESS'
export const TWOFA_VERIFY_ERROR = 'Auth/TWOFA_VERIFY_ERROR'
export const UPDATE_USER = 'Settings/UPDATE_USER'
export const UPDATE_USER_SUCCESS = 'Settings/UPDATE_USER_SUCCESS'
export const UPDATE_USER_ERROR = 'Settings/UPDATE_USER_ERROR'
export const UPDATE_PASSWORD = 'Settings/UPDATE_PASSWORD'
export const UPDATE_PASSWORD_SUCCESS = 'Settings/UPDATE_PASSWORD_SUCCESS'
export const UPDATE_PASSWORD_ERROR = 'Settings/UPDATE_PASSWORD_ERROR'
export const UPDATE_PASSWORD_RBAC = 'Settings/UPDATE_PASSWORD_RBAC'
export const UPDATE_PASSWORD_RBAC_SUCCESS = 'Settings/UPDATE_PASSWORD_RBAC_SUCCESS'
export const UPDATE_PASSWORD_RBAC_ERROR = 'Settings/UPDATE_PASSWORD_RBAC_ERROR'
export const REMOVE_ACCOUNT = 'Settings/REMOVE_ACCOUNT'
export const REMOVE_ACCOUNT_SUCCESS = 'Settings/REMOVE_ACCOUNT_SUCCESS'
export const REMOVE_ACCOUNT_ERROR = 'Settings/REMOVE_ACCOUNT_ERROR'
export const OPEN_LOGIN_MODAL = 'Auth/OPEN_LOGIN_MODAL'
export const RESET_LOGIN_MODAL = 'Auth/RESET_LOGIN_MODAL'
export const VERIFY_RECOVERY_CODE = 'Auth/VERIFY_RECOVERY_CODE'
export const VERIFY_RECOVERY_CODE_SUCCESS = 'Auth/VERIFY_RECOVERY_CODE_SUCCESS'
export const VERIFY_RECOVERY_CODE_ERROR = 'Auth/VERIFY_RECOVERY_CODE_ERROR'
export const GENERATE_QRCODE = 'Auth/GENERATE_QRCODE'
export const GENERATE_QRCODE_SUCCESS = 'Auth/GENERATE_QRCODE_SUCCESS'
export const GENERATE_QRCODE_ERROR = 'Auth/GENERATE_QRCODE_ERROR'
export const SEND_SMS_CODE = 'Auth/SEND_SMS_CODE'
export const SEND_SMS_CODE_SUCCESS = 'Auth/SEND_SMS_CODE_SUCCESS'
export const SEND_SMS_CODE_ERROR = 'Auth/SEND_SMS_CODE_ERROR'

/**
 * Auth state
 * @typedef {Object} state
 * @prop {string} [authtoken] - token provided after login or loaded from cookies
 * @prop {Object} user - user object
 * @prop {boolean} isAuthorizing - flag to tell if the API was called to authenticate the user
 * @prop {boolean} isBlocked - flag to tell if the User has been blocked in some unauthorized route
 */
const initialState = {
  authToken: cookie.get(TOKEN_KEY) || null,
  user: {},
  isAuthorizing: false,
  isLoggingIn: false,
  isBlocked: false,
  forgot: {
    email: '',
    sent: false,
    reason: null,
  },
  TwoFA: {
    active: false,
    success: false,
    error: false,
    qrcode: null,
    verify: false,
    method: '',
    sms: {
      sent: false,
    },
  },
  ui: {
    success: false,
    error: false,
    scope: null,
    loading: false,
    showLoginModal: false,
    showTwoFaModal: false,
  },
}

/**
 * Reducer
 * @param {state} [state=initialState] - Auth state or initial state
 * @param {object} action - the action type and payload
 */
export default function reducer (state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
    case GITHUB_LOGIN_USER:
    case GET_ME:
      return update(state, {
        isAuthorizing: { $set: true },
        ui: {
          loading: { $set: true },
        },
      })
    case LOGIN_USER_SUCCESS:
    case GITHUB_LOGIN_USER_SUCCESS:
    case VERIFY_RECOVERY_CODE_SUCCESS:
      return update(state, {
        authToken: { $set: action.data.access_token },
        isAuthorizing: { $set: false },
        isLoggingIn: { $set: true },
        ui: {
          loading: { $set: false },
          showLoginModal: { $set: false },
          showTwoFaModal: { $set: false },
        },
      })
    case LOGIN_USER_TWOFA_AUTH_SUCCESS:
      return update(state, {
        authToken: { $set: action.data.access_token },
        isAuthorizing: { $set: false },
        ui: {
          showLoginModal: { $set: false },
          showTwoFaModal: { $set: false },
        },
      })
    case LOGIN_USER_TWOFA:
      return update(state, {
        authToken: { $set: action.data.access_token },
        isAuthorizing: { $set: false },
        TwoFA: {
          active: { $set: true },
          method: { $set: action.data.two_factor_authentication_method },
        },
        ui: {
          showLoginModal: { $set: true },
          showTwoFaModal: { $set: true },
          loading: { $set: false },
        },
      })
    case GET_ME_SUCCESS:
      return update(state, {
        user: { $set: { ...action.data, role: 'user' } },
        isAuthorizing: { $set: false },
        isLoggingIn: { $set: false },
        ui: {
          loading: { $set: false },
        },
      })
    case LOGIN_USER_ERROR:
    case OPEN_LOGIN_MODAL:
      return update(state, {
        authToken: { $set: null },
        user: { $set: {} },
        isAuthorizing: { $set: false },
        isLoggingIn: { $set: false },
        isBlocked: { $set: Boolean(action.unauthorized) },
        ui: {
          loading: { $set: false },
          showTwoFaModal: { $set: false },
          showLoginModal: { $set: true },
        },
      })
    case GET_ME_ERROR:
    case GITHUB_LOGIN_USER_ERROR:
    case LOGOUT_USER_SUCCESS:
      return update(state, {
        authToken: { $set: null },
        user: { $set: {} },
        isAuthorizing: { $set: false },
        isLoggingIn: { $set: false },
        isBlocked: { $set: false },
        ui: {
          loading: { $set: false },
          showLoginModal: { $set: false },
        },
      })
    case FORGOT_PASSWORD_SUCCESS:
      return update(state, {
        forgot: {
          email: { $set: action.data.email },
          sent: { $set: true },
        },
      })
    case FORGOT_PASSWORD_ERROR:
      return update(state, {
        forgot: {
          sent: { $set: false },
        },
      })
    case RESET_PASSWORD_SUCCESS:
      return update(state, {
        ui: {
          success: { $set: true },
        },
      })
    case RESET_PASSWORD_ERROR:
      return update(state, {
        ui: {
          error: { $set: true },
        },
      })
    case TWOFA_UPDATE_SUCCESS:
      return update(state, {
        TwoFA: {
          success: { $set: true },
          error: { $set: false },
          qrcode: { $set: action.data.qrcode },
          verify: { $set: false },
        },
        user: { $set: { ...state.user, twoFA: true } },
      })
    case TWOFA_VERIFY:
      return update(state, {
        TwoFA: {
          verify: { $set: false },
        },
      })
    case TWOFA_VERIFY_SUCCESS:
      return update(state, {
        TwoFA: {
          verify: { $set: action.data },
          qrcode: { $set: null },
        },
        user: { $set: { ...state.user, twoFA: true } },
        ui: {
          success: { $set: true },
        },
      })
    case TWOFA_VERIFY_ERROR:
    case LOGIN_USER_TWOFA_AUTH_ERROR:
      return update(state, {
        TwoFA: {
          verify: { $set: false },
        },
        ui: {
          loading: { $set: false },
          showTwoFaModal: { $set: true },
          showLoginModal: { $set: true },
        },
      })
    case UPDATE_PASSWORD_SUCCESS:
    case UPDATE_PASSWORD_RBAC_SUCCESS:
      return update(state, {
        ui: {
          scope: { $set: 'password' },
          success: { $set: true },
        },
      })
    case UPDATE_PASSWORD_ERROR:
    case UPDATE_PASSWORD_RBAC_ERROR:
      return update(state, {
        ui: {
          scope: { $set: 'password' },
          error: { $set: true },
        },
      })
    case REMOVE_ACCOUNT_SUCCESS:
      return update(state, {
        ui: {
          success: { $set: true },
          scope: { $set: 'account' },
        },
      })
    case REMOVE_ACCOUNT_ERROR:
      return update(state, {
        ui: {
          scope: { $set: 'account' },
          error: { $set: true },
        },
      })
    case RESET_PASSWORD:
      return update(state, {
        ui: {
          scope: { $set: null },
          success: { $set: false },
          error: { $set: false },
        },
      })
    case GENERATE_QRCODE_SUCCESS:
      return update(state, {
        TwoFA: {
          qrcode: { $set: action.data },
        },
      })
    case SEND_SMS_CODE_SUCCESS:
      return update(state, {
        TwoFA: {
          sms: {
            sent: { $set: true },
          },
        },
      })
    case GET_CODES_SUCCESS:
      return update(state, {
        user: {
          $set: {
            ...state.user,
            codes: action.data,
          },
        },
        TwoFA: {
          verify: { $set: false },
        },
      })
    case RESET_LOGIN_MODAL:
    case RESET_SIGNUP:
      return update(state, {
        isBlocked: { $set: false },
        ui: {
          showTwoFaModal: { $set: false },
          showLoginModal: { $set: false },
        },
      })
    case CLEAN_CODES:
      return update(state, {
        TwoFA: {
          verify: { $set: false },
        },
      })
    default:
      return state
  }
}

/**
 * User email and password
 * @typedef {Object} credentials
 * @prop {string} email - user email
 * @prop {string} password - user password
 */

/**
 * login action creator
 * @param {credentials} credentials
 */
export function login (credentials) {
  return { type: LOGIN_USER, credentials }
}

/**
 * login success action creator
 * @param {Object} data - data received from the successful call
 */
export function loginSuccess (data) {
  return { type: LOGIN_USER_SUCCESS, data }
}

/**
 * login error action creator
 * @param {ServerError} error
 */
export function loginError (error) {
  return { type: LOGIN_USER_ERROR, error }
}

/**
 * 2FA partial login action creator
 * @param {Object} data - data received from the successful call
 */
export function loginTwoFa (data) {
  return { type: LOGIN_USER_TWOFA, data }
}

/**
 * 2FA authentication action creator
 * @param {String} pass - code pass for 2FA validation
 */
export function twoFaAuth (pass) {
  return { type: LOGIN_USER_TWOFA_AUTH, pass }
}

/**
 * 2FA authentication success action creator
 * @param {Object} data - data received from the successful call
 */
export function twoFaAuthSuccess (data) {
  return { type: LOGIN_USER_TWOFA_AUTH_SUCCESS, data }
}

/**
 * 2FA authentication error action creator
 * @param {ServerError} error
 */
export function twoFaAuthError (error) {
  return { type: LOGIN_USER_TWOFA_AUTH_ERROR, error }
}

/**
 * gitHub login action creator
 * @param {credentials} credentials
 */
export function ghLogin (accessToken) {
  return { type: GITHUB_LOGIN_USER, access_token: accessToken }
}

/**
 * gitHub login success action creator
 * @param {Object} data - data received from the successful call
 */
export function ghLoginSuccess (data) {
  return { type: GITHUB_LOGIN_USER_SUCCESS, data }
}

/**
 * gitHub login error action creator
 * @param {ServerError} error
 */
export function ghLoginError (error) {
  return { type: GITHUB_LOGIN_USER_ERROR, error }
}

/**
 * automatic login action creator
 * @param {string} token - the token string saved in local storage
 */
export function getMe () {
  return { type: GET_ME }
}

/**
 * automatic login success action creator
 * @param {Object} data - data received from the successful call
 */
export function getMeSuccess (data) {
  return { type: GET_ME_SUCCESS, data }
}

/**
 * automatic login error action creator
 */
export function getMeError (error) {
  return { type: GET_ME_ERROR, error }
}

/**
 * logout action
 */
export function logout () {
  return { type: LOGOUT_USER }
}

/**
 * logout success action
 */
export function logoutSuccess () {
  return { type: LOGOUT_USER_SUCCESS }
}

/**
 * logout success action
 */
export function logoutError (error) {
  return { type: LOGOUT_USER_ERROR, error }
}

/**
 * Forgot password reset
 */
export function forgotPassword (email) {
  return { type: FORGOT_PASSWORD, data: { email } }
}

/**
 * Forgot password reset success action creator
 */
export function forgotPasswordSuccess (data) {
  return { type: FORGOT_PASSWORD_SUCCESS, data }
}

/**
 * Forgot password reset error action creator
 */
export function forgotPasswordError (errors) {
  return { type: FORGOT_PASSWORD_ERROR, errors }
}

/**
 * Request password reset
 */
export function resetPassword (token, password) {
  return { type: RESET_PASSWORD, data: { token, password } }
}

/**
 * Request password reset success action creator
 */
export function resetPasswordSuccess (data) {
  return { type: RESET_PASSWORD_SUCCESS, data }
}

/**
 * Request password reset error action creator
 */
export function resetPasswordError (errors) {
  return { type: RESET_PASSWORD_ERROR, errors }
}

/**
 * Request password update
 */
export function updatePasswordRBAC (userId, password) {
  return { type: UPDATE_PASSWORD_RBAC, userId, password }
}

/**
 * Request password update success action creator
 */
export function updatePasswordRBACSuccess (data) {
  return { type: UPDATE_PASSWORD_RBAC_SUCCESS, data }
}

/**
 * Request password update error action creator
 */
export function updatePasswordRBACError (errors) {
  return { type: UPDATE_PASSWORD_RBAC_ERROR, errors }
}

/**
 * 2FA update action creator
 */
export function twoFaUpdate (data) {
  return { type: TWOFA_UPDATE, data }
}

/**
 * 2FA update success action creator
 */
export function twoFaUpdateSuccess (data) {
  return { type: TWOFA_UPDATE_SUCCESS, data }
}

/**
 * 2FA update error action creator
 */
export function twoFaUpdateError (errors) {
  return { type: TWOFA_UPDATE_ERROR, errors }
}

/**
 * 2FA validate action creator
 */
export function twoFaVerify (pass) {
  return { type: TWOFA_VERIFY, pass }
}

/**
 * 2FA validate success action creator
 */
export function twoFaVerifySuccess (data) {
  return { type: TWOFA_VERIFY_SUCCESS, data }
}

/**
 * Validate recovery code action creator
 */
export function verifyRecoveryCode (code) {
  return { type: VERIFY_RECOVERY_CODE, code }
}

/**
 * Validate recovery code success action creator
 */
export function verifyRecoveryCodeSuccess (data) {
  return { type: VERIFY_RECOVERY_CODE_SUCCESS, data }
}

/**
 * Validate recovery code error action creator
 */
export function verifyRecoveryCodeError (errors) {
  return { type: VERIFY_RECOVERY_CODE_ERROR, errors }
}

/**
 * 2FA validate error action creator
 */
export function twoFaVerifyError (errors) {
  return { type: TWOFA_VERIFY_ERROR, errors }
}

/**
 * Update user action creator
 */
export function updateUser (userData) {
  return { type: UPDATE_USER, userData }
}

/**
 * Update user success
 * @param {Object} data - data received from the successful call
 */
export function updateUserSuccess (data) {
  return { type: UPDATE_USER_SUCCESS, data }
}

/**
 * Update user error
 */
export function updateUserError (error) {
  return { type: UPDATE_USER_ERROR, error }
}

/**
 * Update password action creator
 */
export function updatePassword (passwordData) {
  return { type: UPDATE_PASSWORD, passwordData }
}

/**
 * Update password success
 * @param {Object} data - data received from the successful call
 */
export function updatePasswordSuccess (data) {
  return { type: UPDATE_PASSWORD_SUCCESS, data }
}

/**
 * Update password error
 */
export function updatePasswordError (error) {
  return { type: UPDATE_PASSWORD_ERROR, error }
}

/**
 * Remove user account action creator
 */
export function removeAccount (userId) {
  return { type: REMOVE_ACCOUNT, userId }
}

/**
 * Remove user account success
 * @param {Object} data - data received from the successful call
 */
export function removeAccountSuccess (data) {
  return { type: REMOVE_ACCOUNT_SUCCESS, data }
}

/**
 * Remove user account error
 */
export function removeAccountError (error) {
  return { type: REMOVE_ACCOUNT_ERROR, error }
}

/**
 * Generate qrcode action creator
 */
export function meGenerateQRCode () {
  return { type: GENERATE_QRCODE }
}

/**
 * Generate qrcode success
 * @param {Object} data - data received from the successful call
 */
export function meGenerateQRCodeSuccess (data) {
  return { type: GENERATE_QRCODE_SUCCESS, data }
}

/**
 * Generate qrcode error
 */
export function meGenerateQRCodeError (error) {
  return { type: GENERATE_QRCODE_ERROR, error }
}

/**
 * Send sms code action creator
 */
export function meSendSMSCode () {
  return { type: SEND_SMS_CODE }
}

/**
 * Send sms code success
 * @param {Object} data - data received from the successful call
 */
export function meSendSMSCodeSuccess (data) {
  return { type: SEND_SMS_CODE_SUCCESS, data }
}

/**
 * Send sms code error
 */
export function meSendSMSCodeError (error) {
  return { type: SEND_SMS_CODE_ERROR, error }
}

/**
 * Reset login modal action creator
 */
export function resetLoginModal () {
  return { type: RESET_LOGIN_MODAL }
}

/**
 * Open login modal action creator
 * * @param {Boolean} unauthorized - Boolean value flagging if the user comes from a self triggered modal or
 *                                   an authorized action popup.
 *                           In case of an unauthorized action, the user needs to be redirected back, upon modal close.
 */
export function openLoginModal (unauthorized) {
  return { type: OPEN_LOGIN_MODAL, unauthorized }
}

/**
 * Auth/Login store middleware
 *
 * Intercepts login and auth success and errors and sets or
 * removes a cookie accordingly. This way we can keep users
 * logged in if the user resets the application.
 * i.e. when the page is reloaded.
 */
export const createAuthMiddleware = (history) => (store) => (next) => (action) => {
  const state = store.getState()

  next(action)
  if (
    action.type === LOGIN_USER_SUCCESS || action.type === GITHUB_LOGIN_USER_SUCCESS ||
    action.type === LOGIN_USER_TWOFA_AUTH_SUCCESS
  ) {
    cookie.set(TOKEN_KEY, action.data.access_token, {
      path: '/',
      expires: TOKEN_MAX_AGE,
      secure: process.env.DEV_PORTAL_CLIENT_ID !== 'cl0ud0k001',
    })
  } else if (action.type === GET_ME_ERROR) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/')
  } else if (action.type === LOGOUT_USER) {
    cookie.remove(TOKEN_KEY, { path: '/' })
    history.replace('/')
  } else if (state.auth.authToken && state.auth.user.activated && action.type === SIGNUP_SECURITY_SUCCESS) {
    history.replace('/dashboard')
  } else if (state.auth.isLoggingIn && action.type === GET_ME_SUCCESS) {
    history.replace('/dashboard')
  }
}
