/**
 * @module Signup/sagas
 */

import request from 'util/request'
import { push } from 'react-router-redux'
import { takeLatest, call, put, select } from 'redux-saga/effects'
import getDefaultHeaders from 'util/getDefaultHeaders'
import { API_URL } from 'constants/endpoints'
import {
  SIGNUP_USER,
  signupUserSuccess,
  signupUserError,
  SIGNUP_ORGANIZATION,
  signupOrganizationSuccess,
  signupOrganizationError,
  SIGNUP_SECURITY,
  signupSecuritySuccess,
  signupSecurityError,
  SEND_ACTIVATION_EMAIL,
  sendActivationEmailSuccess,
  sendActivationEmailError,
  generateQRCodeSuccess,
  generateQRCodeError,
  GENERATE_QRCODE,
  sendSMSCodeSuccess,
  sendSMSCodeError,
  SEND_SMS_CODE
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'
import qs from 'qs'

/**
 * Send activation email saga worker
 * @param {Object} action
 * @param {String} action.data.userId
 * @param {String} action.data.email
 */
function * sendActivationEmail (action) {
  const requestUrl = `${API_URL}/users/send_activation`
  const state = yield select()
  const body = JSON.stringify(action.data)
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer' })
  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(sendActivationEmailSuccess(response.data))
    yield put(showNotification('success', 'signup.activation.success'))
  } else {
    yield put(showNotification('error', 'signup.activation.error'))
    yield put(sendActivationEmailError(response.err))
  }
}

/**
 * Send activation email saga
 */
export function * sendActivationEmailSaga () {
  yield takeLatest(SEND_ACTIVATION_EMAIL, sendActivationEmail)
}

/**
 * Sign up - user details saga worker
 * @param {Object} action
 * @param {userData} action.userData
 */
function * signupUser (action) {
  const state = yield select()
  const queryParams = qs.stringify({ invitation: state.team.ticket.invitationCode }, { addQueryPrefix: true })
  const requestUrl = `${API_URL}/users_registration/user_details${queryParams}`
  const body = JSON.stringify(action.userData)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    body
  })

  if (!response.err) {
    yield put(signupUserSuccess(response.data))
  } else {
    yield put(signupUserError(response.err))
    yield put(showNotification('error', response.err.message, true))
  }
}

/**
 * Sign up - user details saga
 */
export function * signupUserSaga () {
  yield takeLatest(SIGNUP_USER, signupUser)
}

/**
 * Sign up - organization details saga worker
 * @param {Object} action
 * @param {userData} action.organizationData
 */
function * signupOrganization (action) {
  const requestUrl = `${API_URL}/users_registration/organization_details`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer', token: state.signup.user.token })
  const body = JSON.stringify(action.organizationData)

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(signupOrganizationSuccess())
  } else {
    yield put(signupOrganizationError(response.err))
    yield put(showNotification('error', response.err.message, true))
  }
}

/**
 * Sign up - organization details saga
 */
export function * signupOrganizationSaga () {
  yield takeLatest(SIGNUP_ORGANIZATION, signupOrganization)
}

/**
 * Sign up - security details saga worker
 * @param {Object} action
 * @param {userData} action.securityData
 */
function * signupSecurity (action) {
  const state = yield select()
  const requestUrl = `${API_URL}/users_registration/security_details`
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer', token: state.signup.user.token })
  const body = JSON.stringify(action.securityData)
  const isInvitation = state.team.ticket.invitationCode

  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers,
    body
  })

  if (!response.err) {
    yield put(signupSecuritySuccess(response.data))
    yield put(showNotification('success', isInvitation ? 'signup.security.success.2' : 'signup.security.success.1'))
    yield put(push('/signup/done'))
  } else {
    yield put(showNotification('error', 'signup.security.error'))
    yield put(signupSecurityError(response.err))
    yield put(push('/signup'))
  }
}

/**
 * Sign up - security details saga
 */
export function * signupSecuritySaga () {
  yield takeLatest(SIGNUP_SECURITY, signupSecurity)
}

/**
 * Generate QRCode saga worker
 * @param {Object} action
 */
function * generateQRCode (action) {
  const requestUrl = `${API_URL}/users_registration/2fa/qrcode`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer', token: state.signup.user.token })
  const response = yield call(request, requestUrl, {
    method: 'GET',
    headers
  })

  if (!response.err) {
    yield put(generateQRCodeSuccess(response.data))
  } else {
    yield put(generateQRCodeError(response.err))
    yield put(showNotification('error', 'twofa.qrcode.error'))
  }
}

/**
 * Generate QRCode saga
 */
export function * generateQRCodeSaga () {
  yield takeLatest(GENERATE_QRCODE, generateQRCode)
}

/**
 * Send SMS code saga worker
 * @param {Object} action
 * @param {String} action.data.email
 * @param {String} action.data.number
 */
function * sendSMSCode (action) {
  const requestUrl = `${API_URL}/users_registration/sms_code`
  const state = yield select()
  const headers = yield call(getDefaultHeaders, { state, type: 'bearer', token: state.signup.user.token })
  const response = yield call(request, requestUrl, {
    method: 'POST',
    headers
  })

  if (!response.err) {
    yield put(sendSMSCodeSuccess(response.data))
    yield put(showNotification('success', 'twofa.sms.success'))
  } else {
    yield put(sendSMSCodeError(response.err))
    yield put(showNotification('error', 'twofa.sms.error'))
  }
}

/**
 * Send SMS code saga
 */
export function * sendSMSCodeSaga () {
  yield takeLatest(SEND_SMS_CODE, sendSMSCode)
}

export default [signupUserSaga, signupOrganizationSaga, signupSecuritySaga, sendActivationEmailSaga, generateQRCodeSaga, sendSMSCodeSaga]
