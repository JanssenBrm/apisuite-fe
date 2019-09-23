/**
 * @module Auth/sagas
 */

import qs from 'qs'
import request from 'util/request'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import { replace } from 'connected-react-router'
import { API_URL } from 'constants/endpoints'
import {
  LOGIN_USER,
  LOGIN_USER_TWOFA_AUTH,
  GITHUB_LOGIN_USER,
  GET_ME,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
  TWOFA_UPDATE,
  TWOFA_VERIFY,
  loginSuccess,
  loginError,
  loginTwoFa,
  twoFaAuthSuccess,
  twoFaAuthError,
  ghLoginSuccess,
  ghLoginError,
  getMe,
  getMeSuccess,
  getMeError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
  twoFaUpdateSuccess,
  twoFaUpdateError,
  twoFaVerifySuccess,
  twoFaVerifyError,
  LOGIN_USER_TWOFA_AUTH_SUCCESS,
  GITHUB_LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  logoutSuccess,
  logoutError,
  UPDATE_USER,
  UPDATE_PASSWORD,
  UPDATE_PASSWORD_RBAC,
  REMOVE_ACCOUNT,
  updateUserSuccess,
  updateUserError,
  updatePasswordSuccess,
  updatePasswordRBACSuccess,
  updatePasswordError,
  updatePasswordRBACError,
  removeAccountSuccess,
  removeAccountError,
  VERIFY_RECOVERY_CODE,
  verifyRecoveryCodeSuccess,
  verifyRecoveryCodeError,
  VERIFY_RECOVERY_CODE_SUCCESS,
  GENERATE_QRCODE,
  meGenerateQRCodeSuccess,
  meGenerateQRCodeError,
  SEND_SMS_CODE,
  meSendSMSCodeSuccess,
  meSendSMSCodeError,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'

/**
 * User email and password
 * @typedef {Object} credentials
 * @prop {string} email - user email
 * @prop {string} password - user password
 */

/**
 * login saga worker
 * @param {Object} action
 * @param {credentials} action.credentials
 */
function * loginWorker (action) {
  const requestUrl = `${API_URL}/oauth2/token`
  const { email, password } = action.credentials

  const headers = getDefaultHeaders({ type: 'basic' })

  const body = qs.stringify({
    grant_type: 'password',
    username: email,
    password,
  })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(loginSuccess(response.data))
    yield put(loginTwoFa(response.data))
  } else {
    yield put(loginError(response.err))
    yield put(showNotification('error', 'login.error'))
  }
}

/**
 * login saga
 */
export function * loginSaga () {
  yield takeLatest(LOGIN_USER, loginWorker)
}

/**
 * 2FA authentication saga worker
 * @param {Object} action
 * @param {credentials} action.credentials
 */
function * login2FAWorker (action) {
  const requestUrl = `${API_URL}/oauth2/tfa`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({ pass: action.pass })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(twoFaAuthSuccess(response.data))
    yield put(showNotification('success', 'twofa.login.success'))
  } else {
    yield put(twoFaAuthError(response.err))
    yield put(showNotification('error', 'twofa.login.error'))
  }
}

/**
 * 2FA authentication saga
 */
export function * login2FASaga () {
  yield takeLatest(LOGIN_USER_TWOFA_AUTH, login2FAWorker)
}

/**
 * Github login saga worker
 * @param {Object} action
 */
function * ghLoginWorker (action) {
  const actionToken = action.access_token

  if (!actionToken || !actionToken.length) {
    yield put(ghLoginError('Invalid token'))
  } else {
    yield put(ghLoginSuccess({ access_token: actionToken }))
  }
}

/**
 * Github login saga
 */
export function * ghLoginSaga () {
  yield takeLatest(GITHUB_LOGIN_USER, ghLoginWorker)
}

/**
 * logout saga worker
 */
function * logoutWorker () {
  const requestUrl = `${API_URL}/oauth2/revoke`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({ token: state.auth.authToken })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(logoutSuccess())
  } else {
    yield put(logoutError(response.err))
  }
}

/**
 * logout saga
 */
export function * logoutSaga () {
  yield takeLatest(LOGOUT_USER, logoutWorker)
}

/**
 * automatic login saga worker
 */
function * getMeWorker () {
  const requestUrl = `${API_URL}/users/me`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, { headers })

  if (!response.err) {
    yield put(getMeSuccess(response.data))
  } else {
    yield put(getMeError(response.err))
  }
}

/**
 * automatic login saga
 */
export function * getMeSaga () {
  yield takeLatest(GET_ME, getMeWorker)
  yield takeLatest(VERIFY_RECOVERY_CODE_SUCCESS, getMeWorker)
  yield takeLatest(LOGIN_USER_TWOFA_AUTH_SUCCESS, getMeWorker)
  yield takeLatest(GITHUB_LOGIN_USER_SUCCESS, getMeWorker)
}

/**
 * Request password reset worker
 */
function * forgotPasswordWorker (action) {
  const requestUrl = `${API_URL}/forgot`
  const headers = { 'Content-Type': 'application/json' }
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(forgotPasswordSuccess(action.data))
    yield put(showNotification('success', 'forgotPassword.success'))
  } else {
    yield put(forgotPasswordError(response.err))
    yield put(showNotification('error', 'forgotPassword.error'))
  }
}

/**
 * Request password reset saga
 */
export function * forgotPasswordSaga () {
  yield takeLatest(FORGOT_PASSWORD, forgotPasswordWorker)
}

/**
 * Reset password worker
 */
function * resetPasswordWorker (action) {
  const requestUrl = `${API_URL}/recover`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer', token: action.data.token })
  const body = JSON.stringify({ password: action.data.password })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(resetPasswordSuccess(response.data))
    yield put(showNotification('success', 'resetPassword.success'))
  } else {
    yield put(resetPasswordError(response.err))
    yield put(showNotification('error', 'resetPassword.error'))
  }
}

/**
 * Reset password saga
 */
export function * resetPasswordSaga () {
  yield takeLatest(RESET_PASSWORD, resetPasswordWorker)
}

/**
 * 2FA update saga worker
 * @param {Object} action
 * @param {String} action.data.method - the 2fa selected method
 * @param {String} action.data.confirmationCode - the confirmationCode received to update the 2fa method
 */
function * twoFaUpdateWorker (action) {
  const requestUrl = `${API_URL}/users/me/2fa/configure`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.data)

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    yield put(twoFaUpdateSuccess(response.data))
    yield put(getMe())
    yield put(showNotification('success', 'twofa.update.success'))
  } else {
    yield put(twoFaUpdateError(response.err))
    yield put(showNotification('error', 'twofa.update.error'))
  }
}

/**
 * 2FA update saga
 */
export function * twoFaUpdateSaga () {
  yield takeLatest(TWOFA_UPDATE, twoFaUpdateWorker)
}

/**
 * 2FA verify saga worker
 * @param {Object} action
 */
function * twoFaVerifyWorker (action) {
  const requestUrl = `${API_URL}/oauth2/tfa/validate`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({ pass: action.pass })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(twoFaVerifySuccess(response.data))
    yield put(showNotification('success', 'profile.twofa.validation.success'))
  } else {
    yield put(twoFaVerifyError(response.err))
    yield put(showNotification('error', 'profile.twofa.validation.error'))
  }
}

/**
 * 2FA verify saga
 */
export function * twoFaVerifySaga () {
  yield takeLatest(TWOFA_VERIFY, twoFaVerifyWorker)
}

/**
 * Update user saga worker
 * @param {Object} action
 * @param {data} action.userData
 */
function * updateUser (action) {
  const requestUrl = `${API_URL}/users/me`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.userData)

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    yield put(updateUserSuccess(response.data))
    yield put(getMe())
    yield put(showNotification('success', 'settings.update.success'))
  } else {
    yield put(updateUserError(response.err))
    yield put(showNotification('error', 'settings.update.error'))
  }
}

/**
 * Update user saga
 */
export function * updateUserSaga () {
  yield takeLatest(UPDATE_USER, updateUser)
}

/**
 * Update password saga worker
 * @param {Object} action
 * @param {data} action.passwordData
 */
function * updatePassword (action) {
  const requestUrl = `${API_URL}/users/me/password`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify(action.passwordData)

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    yield put(updatePasswordSuccess(response.data))
    yield put(getMe())
    yield put(showNotification('success', 'settings.updatePassword.success'))
  } else {
    yield put(updatePasswordError(response.err))
    yield put(showNotification('error', 'settings.updatePassword.error'))
  }
}

/**
 * Update password saga
 */
export function * updatePasswordSaga () {
  yield takeLatest(UPDATE_PASSWORD, updatePassword)
}

/**
 * Update password rbac saga worker
 * @param {Object} action
 * @param {data} action.passwordData
 */
function * updatePasswordRBAC (action) {
  const state = yield select()
  const organizationId = state.auth.user.organizations[0].id
  const requestUrl = `${API_URL}/team/${organizationId}/user/${action.userId}/password`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({ password: action.password })

  const response = yield call(request, requestUrl, {
    method: 'PUT',
    headers,
    body,
  })

  if (!response.err) {
    yield put(updatePasswordRBACSuccess(response.data))
    yield put(getMe())
    yield put(showNotification('success', 'settings.updatePasswordRBAC.success'))
  } else {
    yield put(updatePasswordRBACError(response.err))
    yield put(showNotification('error', 'settings.updatePasswordRBAC.error'))
  }
}

/**
 * Update password saga
 */
export function * updatePasswordRBACSaga () {
  yield takeLatest(UPDATE_PASSWORD_RBAC, updatePasswordRBAC)
}

/**
 * Remove user account saga worker
 * @param {Object} action
//  * @param {data} action.userId
 */
function * removeAccount () {
  const requestUrl = `${API_URL}/users/me`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })

  const response = yield call(request, requestUrl, {
    method: 'DELETE',
    headers,
  })

  if (!response.err) {
    yield put(removeAccountSuccess(response.data))
    yield put(logoutSuccess())
    yield put(replace('/'))
  } else {
    yield put(removeAccountError(response.err))
    yield put(showNotification('error', 'settings.remove.error'))
  }
}

/**
 * Remove user account saga
 */
export function * removeAccountSaga () {
  yield takeLatest(REMOVE_ACCOUNT, removeAccount)
}

/**
 * Generate QRCode saga worker
 * @param {Object} action
 */
function * meGenerateQRCode () {
  const requestUrl = `${API_URL}/users/me/2fa/qrcode`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(meGenerateQRCodeSuccess(response.data))
  } else {
    yield put(meGenerateQRCodeError(response.err))
    yield put(showNotification('error', 'twofa.qrcode.error'))
  }
}

/**
 * Generate QRCode saga
 */
export function * meGenerateQRCodeSaga () {
  yield takeLatest(GENERATE_QRCODE, meGenerateQRCode)
}

/**
 * Send SMS code saga worker
 * @param {Object} action
 */
function * meSendSMSCode () {
  const requestUrl = `${API_URL}/users/me/sms_code`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers,
  })

  if (!response.err) {
    yield put(meSendSMSCodeSuccess(response.data))
    yield put(showNotification('success', 'twofa.sms.success'))
  } else {
    yield put(meSendSMSCodeError(response.err))
    yield put(showNotification('error', 'twofa.sms.error'))
  }
}

/**
 * Send SMS code saga
 */
export function * meSendSMSCodeSaga () {
  yield takeLatest(SEND_SMS_CODE, meSendSMSCode)
}

/**
 * Verify recovery code saga worker
 * @param {Object} action
 */
function * verifyRecoveryCodeWorker (action) {
  const requestUrl = `${API_URL}/users/me/recovery_codes/verify`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const body = JSON.stringify({ code: action.code })

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body,
  })

  if (!response.err) {
    yield put(verifyRecoveryCodeSuccess(response.data))
  } else {
    yield put(verifyRecoveryCodeError(response.err))
    yield put(showNotification('error', 'twofa.recovery.error'))
  }
}

/**
 * Verify recovery code saga
 */
export function * verifyRecoveryCodeSaga () {
  yield takeLatest(VERIFY_RECOVERY_CODE, verifyRecoveryCodeWorker)
}

export default [
  loginSaga,
  ghLoginSaga,
  getMeSaga,
  forgotPasswordSaga,
  resetPasswordSaga,
  logoutSaga,
  twoFaUpdateSaga,
  twoFaVerifySaga,
  login2FASaga,
  updateUserSaga,
  removeAccountSaga,
  updatePasswordSaga,
  updatePasswordRBACSaga,
  verifyRecoveryCodeSaga,
  meSendSMSCodeSaga,
  meGenerateQRCodeSaga,
]
