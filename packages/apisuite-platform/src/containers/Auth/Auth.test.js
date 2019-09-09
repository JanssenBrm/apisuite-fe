import React from 'react'
import { mountWithIntl } from 'util/test-utils'
import request from 'util/request'
import { expectSaga } from 'redux-saga-test-plan'
import * as matchers from 'redux-saga-test-plan/matchers'
import {
  loginSaga,
  login2FASaga,
  logoutSaga,
  getMeSaga,
  resetPasswordSaga,
  forgotPasswordSaga,
  twoFaVerifySaga,
  twoFaUpdateSaga,
  updateUserSaga,
  updatePasswordSaga,
  updatePasswordRBACSaga,
  removeAccountSaga,
  meGenerateQRCodeSaga,
  meSendSMSCodeSaga,
  verifyRecoveryCodeSaga,
} from './sagas'
import RequireAuth from 'containers/Auth/RequireAuth'
import ForgotPassword from 'containers/Auth/ForgotPassword'
import ResetPassword from 'containers/Auth/ResetPassword'
import reducer, {
  login,
  loginSuccess,
  loginError,
  getMe,
  getMeSuccess,
  getMeError,
  logout,
  logoutSuccess,
  logoutError,
  createAuthMiddleware,
  TOKEN_KEY,
  resetPassword,
  resetPasswordSuccess,
  resetPasswordError,
  forgotPassword,
  forgotPasswordSuccess,
  forgotPasswordError,
  twoFaUpdate,
  twoFaUpdateSuccess,
  twoFaUpdateError,
  twoFaVerify,
  twoFaVerifySuccess,
  twoFaVerifyError,
  loginTwoFa,
  twoFaAuth,
  twoFaAuthSuccess,
  twoFaAuthError,
  updatePasswordSuccess,
  updatePasswordError,
  updatePasswordRBACSuccess,
  updatePasswordRBACError,
  removeAccountSuccess,
  removeAccountError,
  meGenerateQRCodeSuccess,
  meSendSMSCodeSuccess,
  resetLoginModal,
  updateUserSuccess,
  updateUser,
  updateUserError,
  updatePassword,
  updatePasswordRBAC,
  removeAccount,
  meGenerateQRCode,
  meGenerateQRCodeError,
  meSendSMSCode,
  meSendSMSCodeError,
  verifyRecoveryCodeError,
  verifyRecoveryCode,
  verifyRecoveryCodeSuccess,
  openLoginModal,
} from './ducks'
import { showNotification } from 'containers/NotificationManager/ducks'
import { translationMessages, formats } from 'util/i18n'
import { IntlProvider } from 'react-intl'
import { signupSecuritySuccess } from '../Signup/ducks'
import { replace } from 'connected-react-router'

const intlProvider = new IntlProvider({ locale: 'en', messages: translationMessages.en, formats })
const { intl } = intlProvider.getChildContext()

const props = {
  history: { replace: jest.fn() },
  location: { pathname: '/' },
  user: {},
  ui: {
    showLoginModal: true,
  },
  isAuthorizing: false,
  isLoggingIn: false,
  Component: () => (<div />),
  roleRequired: 'user',
  openLoginModal: jest.fn(),
}

describe('Auth', () => {
  const wrapper = mountWithIntl(<RequireAuth {...props} />)

  it('should not be authorized by default', () => {
    expect(wrapper.state().isAuthorized).toEqual(false)
  })

  it('should check authorization when it receives new props', () => {
    const checkAuthSpy = jest.spyOn(wrapper.instance(), 'checkAuth')
    wrapper.setProps({ user: { role: 'user' }, isAuthorizing: false })

    expect(checkAuthSpy).toHaveBeenCalled()
  })
})

const credentialsMock = { email: 'foo', password: 'bar' }
const twoFaCredentialsMock = { pass: '123456' }
const tokenMock = 'abc.123.xxx'
const initialState = {
  authToken: null,
  user: {},
  isAuthorizing: false,
  isBlocked: false,
  isLoggingIn: false,
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
const dataMock = { id: 0, name: 'Zé', role: 'user', access_token: tokenMock }
const errorMock = { message: 'error-stub' }
const fullState = {
  authToken: 'abc.123.xxx',
  user: dataMock,
  isAuthorizing: true,
  isBlocked: false,
  isLoggingIn: false,
  forgot: {
    email: '',
    sent: false,
    reason: null,
  },
  ui: {
    success: false,
    error: false,
    scope: null,
    loading: false,
    showLoginModal: false,
    showTwoFaModal: false,
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
}
const mockOrganization = { id: 208, name: 'myOrg', state: 'NON_VALIDATED' }
const mockState = {
  auth: {
    authToken: '123',
    user: {
      organizations: [
        mockOrganization,
      ],
    },
  },
}

const userMock = {
  fullName: 'Test User',
  bio: 'hello',
  email: 'test@gmail.com',
  phone: '+351961111111',
  avatar: '',
  confirmationCode: '',
  method: '1',
}

const passMock = { oldPassword: 'old', newPassword: 'new' }

describe('Auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState)
  })

  it('should set authorizing flag on LOGIN_USER', () => {
    expect(reducer(initialState, login(credentialsMock))).toEqual({
      ...initialState,
      isAuthorizing: true,
      ui: { ...initialState.ui, loading: true },
    })
  })

  it('should set authorizing flag on GET_ME', () => {
    expect(reducer(initialState, getMe(tokenMock))).toEqual({
      ...initialState,
      isAuthorizing: true,
      ui: { ...initialState.ui, loading: true },
    })
  })

  it('should set the token and set authorizing flag on LOGIN_USER_SUCCESS', () => {
    expect(
      reducer(
        { ...initialState, isAuthorizing: true, isLoggingIn: true },
        loginSuccess(dataMock)
      )).toEqual({ ...initialState, authToken: dataMock.access_token, isLoggingIn: true })
  })

  it('should set the user and authorizing flag on ME_SUCCESS', () => {
    expect(
      reducer(
        { ...initialState, isAuthorizing: true, authToken: 'abc.123.xxx' },
        getMeSuccess(dataMock)
      )).toEqual({ ...initialState, user: dataMock, authToken: 'abc.123.xxx' })
  })

  it('should reset state on LOGIN_USER_ERROR', () => {
    expect(reducer({ ...fullState }, loginError(errorMock))).toEqual({
      ...initialState,
      ui: { loading: false, success: false, error: false, scope: null, showLoginModal: true, showTwoFaModal: false },
    })
  })

  it('should reset state on ME_ERROR', () => {
    expect(reducer({ ...fullState }, getMeError(errorMock))).toEqual({ ...initialState })
  })

  it('should reset state on LOGOUT_USER_SUCCESS', () => {
    expect(reducer({ ...fullState }, logoutSuccess())).toEqual({ ...initialState })
  })

  it('should reset state on LOGOUT_USER_ERROR', () => {
    expect(reducer({ ...fullState }, logoutError(errorMock))).toEqual({
      ...initialState,
      user: dataMock,
      authToken: 'abc.123.xxx',
      isAuthorizing: true,
    })
  })

  it('should update state on RESET_PASSWORD_SUCCESS', () => {
    expect(reducer(initialState, resetPasswordSuccess({ authToken: 'abc.123.xxx', password: 'password-stub' }))).toEqual({
      ...initialState,
      ui: { loading: false, success: true, error: false, scope: null, showLoginModal: false, showTwoFaModal: false },
    })
  })

  it('should update state on RESET_PASSWORD_ERROR', () => {
    expect(reducer(initialState, resetPasswordError(errorMock))).toEqual({
      ...initialState,
      ui: { loading: false, success: false, error: true, scope: null, showLoginModal: false, showTwoFaModal: false },
    })
  })

  it('should update state on FORGOT_PASSWORD_SUCCESS', () => {
    expect(reducer(initialState, forgotPasswordSuccess({ email: 'email@example.com' }))).toEqual({
      ...initialState,
      forgot: { email: 'email@example.com', sent: true, reason: null },
    })
  })

  it('should update state on FORGOT_PASSWORD_ERROR', () => {
    expect(reducer(initialState, forgotPasswordError(errorMock))).toEqual({
      ...initialState,
      forgot: { email: '', sent: false, reason: null },
    })
  })

  it('should update state on LOGIN_USER_TWOFA', () => {
    const data = { access_token: tokenMock, two_factor_authentication_method: 'authorizationApp' }
    expect(reducer(initialState, loginTwoFa(data))).toEqual({
      ...initialState,
      isAuthorizing: false,
      authToken: tokenMock,
      TwoFA: { ...initialState.TwoFA, active: true, method: 'authorizationApp' },
      ui: { ...initialState.ui, showLoginModal: true, showTwoFaModal: true },
    })
  })

  it('should update state on LOGIN_USER_TWOFA_AUTH_SUCCESS', () => {
    const data = { access_token: tokenMock }
    expect(reducer(initialState, twoFaAuthSuccess(data))).toEqual({
      ...initialState,
      isAuthorizing: false,
      authToken: tokenMock,
      ui: { ...initialState.ui, showLoginModal: false, showTwoFaModal: false },
    })
  })

  it('should update state on LOGIN_USER_TWOFA_AUTH_ERROR', () => {
    expect(reducer(initialState, twoFaAuthError(errorMock))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, showLoginModal: true, showTwoFaModal: true },
    })
  })

  it('should update state on TWOFA_VERIFY_SUCCESS', () => {
    const isValid = true
    expect(reducer(initialState, twoFaVerifySuccess(isValid))).toEqual({
      ...initialState,
      TwoFA: { ...initialState.TwoFA, verify: true, qrcode: null },
      user: { twoFA: true },
      ui: { ...initialState.ui, success: true },
    })
  })

  it('should update state on TWOFA_VERIFY_ERROR', () => {
    expect(reducer(initialState, twoFaVerifyError(errorMock))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, showLoginModal: true, showTwoFaModal: true, loading: false },
    })
  })

  it('should update state on TWOFA_UPDATE_SUCCESS', () => {
    const data = { qrcode: 'xxx' }
    expect(reducer(initialState, twoFaUpdateSuccess(data))).toEqual({
      ...initialState,
      TwoFA: { ...initialState.TwoFA, success: true, qrcode: data.qrcode },
      user: { twoFA: true },
    })
  })

  it('should update state on UPDATE_PASSWORD_SUCCESS', () => {
    expect(reducer(initialState, updatePasswordSuccess({}))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, success: true, scope: 'password' },
    })
  })

  it('should update state on UPDATE_PASSWORD_ERROR', () => {
    expect(reducer(initialState, updatePasswordError(errorMock))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, scope: 'password', error: true },
    })
  })

  it('should update state on REMOVE_ACCOUNT_SUCCESS', () => {
    expect(reducer(initialState, removeAccountSuccess({}))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, success: true, scope: 'account' },
    })
  })

  it('should update state on REMOVE_ACCOUNT_ERROR', () => {
    expect(reducer(initialState, removeAccountError(errorMock))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, error: true, scope: 'account' },
    })
  })

  it('should update state on RESET_PASSWORD', () => {
    expect(reducer(initialState, resetPassword({}))).toEqual({
      ...initialState,
      ui: { ...initialState.ui, success: false, error: false, scope: null },
    })
  })

  it('should update state on GENERATE_QRCODE_SUCCESS', () => {
    const data = 'qrcode'
    expect(reducer(initialState, meGenerateQRCodeSuccess(data))).toEqual({
      ...initialState,
      TwoFA: { ...initialState.TwoFA, qrcode: data },
    })
  })

  it('should update state on SEND_SMS_CODE_SUCCESS', () => {
    expect(reducer(initialState, meSendSMSCodeSuccess())).toEqual({
      ...initialState,
      TwoFA: { ...initialState.TwoFA, sms: { sent: true } },
    })
  })

  it('should update state on RESET_LOGIN_MODAL', () => {
    expect(reducer(initialState, resetLoginModal())).toEqual({ ...initialState })
  })

  it('should update state on OPEN_LOGIN_MODAL', () => {
    expect(reducer({ ...fullState }, openLoginModal())).toEqual({
      ...initialState,
      ui: { loading: false, success: false, error: false, scope: null, showLoginModal: true, showTwoFaModal: false },
    })
  })
})

describe('Auth integration', () => {
  it('should call login API and return a user object', () => {
    const fakeCredentials = { email: 'foo', password: 'bar' }
    const fakeUser = { name: 'John', role: 'user' }
    const fakeResponse = { data: fakeUser }

    return expectSaga(loginSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(loginSuccess(fakeUser))
      .dispatch(login(fakeCredentials))
      .silentRun()
  })

  it('should call login API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(loginSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(loginError(errorMock))
      .dispatch(login(credentialsMock))
      .silentRun()
  })

  it('should call twoFaAuth API and return an access token', () => {
    const dataMock = { access_token: tokenMock }
    const fakeResponse = { data: dataMock }

    return expectSaga(login2FASaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaAuthSuccess(dataMock))
      .put(showNotification('success', 'twofa.login.success'))
      .dispatch(twoFaAuth(twoFaCredentialsMock))
      .silentRun()
  })

  it('should call twoFaAuth API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(login2FASaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaAuthError(errorMock))
      .put(showNotification('error', 'twofa.login.error'))
      .dispatch(twoFaAuth(twoFaCredentialsMock))
      .silentRun()
  })

  it('should call logout API', () =>
    expectSaga(logoutSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), {}]])
      .put(logoutSuccess())
      .dispatch(logout())
      .silentRun()
  )

  it('should call logout API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(logoutSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(logoutError(errorMock))
      .dispatch(logout())
      .silentRun()
  })

  it('should call authorization API and return user object', () => {
    const fakeResponse = { data: dataMock }

    return expectSaga(getMeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getMeSuccess(dataMock))
      .dispatch(getMe(tokenMock))
      .silentRun()
  })

  it('should call authorization API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(getMeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(getMeError(errorMock))
      .dispatch(getMe(tokenMock))
      .silentRun()
  })

  it('should call forgot password API', () => {
    const email = 'email@example.be'
    const fakeResponse = { data: email }

    return expectSaga(forgotPasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(forgotPasswordSuccess({ email }))
      .dispatch(forgotPassword(email))
      .silentRun()
  })

  it('should call forgot password API and handle the error', () => {
    const email = 'email@example.be'
    const fakeResponse = { err: errorMock }

    return expectSaga(forgotPasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(forgotPasswordError(errorMock))
      .dispatch(forgotPassword(email))
      .silentRun()
  })

  it('should call reset password API', () => {
    const password = 'my super password'
    const fakeResponse = { data: password }

    return expectSaga(resetPasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(resetPasswordSuccess(password))
      .put(showNotification('success', 'resetPassword.success'))
      .dispatch(resetPassword(password))
      .silentRun()
  })

  it('should call reset password API and handle the error', () => {
    const password = 'my super password'
    const fakeResponse = { err: errorMock }

    return expectSaga(resetPasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(resetPasswordError(errorMock))
      .put(showNotification('error', 'resetPassword.error'))
      .dispatch(resetPassword(password))
      .silentRun()
  })

  it('should call twofa verify API', () => {
    const pass = '123456'
    const fakeResponse = { data: pass }

    return expectSaga(twoFaVerifySaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaVerifySuccess(pass))
      .dispatch(twoFaVerify(pass))
      .silentRun()
  })

  it('should call twofa verify API and handle the error', () => {
    const pass = '123456'
    const fakeResponse = { err: errorMock }

    return expectSaga(twoFaVerifySaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaVerifyError(errorMock))
      .dispatch(twoFaVerify(pass))
      .silentRun()
  })

  it('should call twofa update API', () => {
    const enable = true
    const fakeResponse = { data: enable }

    return expectSaga(twoFaUpdateSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaUpdateSuccess(enable))
      .dispatch(twoFaUpdate(enable))
      .silentRun()
  })

  it('should call twofa update API and handle the error', () => {
    const enable = true
    const fakeResponse = { err: errorMock }

    return expectSaga(twoFaUpdateSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(twoFaUpdateError(errorMock))
      .dispatch(twoFaUpdate(enable))
      .silentRun()
  })

  it('should call update user API', () => {
    const fakeResponse = { data: userMock }

    return expectSaga(updateUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateUserSuccess(userMock))
      .dispatch(updateUser(userMock))
      .silentRun()
  })

  it('should call update user API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(updateUserSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updateUserError(errorMock))
      .dispatch(updateUser(userMock))
      .silentRun()
  })

  it('should call update password API', () => {
    const fakeResponse = { data: passMock }

    return expectSaga(updatePasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updatePasswordSuccess(passMock))
      .put(getMe())
      .put(showNotification('success', 'settings.updatePassword.success'))
      .dispatch(updatePassword(passMock))
      .silentRun()
  })

  it('should call update password API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(updatePasswordSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updatePasswordError(errorMock))
      .put(showNotification('error', 'settings.updatePassword.error'))
      .dispatch(updatePassword(passMock))
      .silentRun()
  })

  it('should call update password RBAC API', () => {
    const fakeResponse = { data: passMock }

    return expectSaga(updatePasswordRBACSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updatePasswordRBACSuccess(passMock))
      .put(getMe())
      .put(showNotification('success', 'settings.updatePasswordRBAC.success'))
      .dispatch(updatePasswordRBAC(passMock))
      .silentRun()
  })

  it('should call update password RBAC API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(updatePasswordRBACSaga)
      .withState(mockState)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(updatePasswordRBACError(errorMock))
      .put(showNotification('error', 'settings.updatePasswordRBAC.error'))
      .dispatch(updatePasswordRBAC(passMock))
      .silentRun()
  })

  it('should call remove account API', () => {
    const userId = 1
    const fakeResponse = {}

    return expectSaga(removeAccountSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(removeAccountSuccess())
      .put(logoutSuccess())
      .put(replace('/'))
      .dispatch(removeAccount(userId))
      .silentRun()
  })

  it('should call remove account API and handle the error', () => {
    const userId = 1
    const fakeResponse = { err: errorMock }

    return expectSaga(removeAccountSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(removeAccountError(errorMock))
      .put(showNotification('error', 'settings.remove.error'))
      .dispatch(removeAccount(userId))
      .silentRun()
  })

  it('should call generate QRCode API', () => {
    const fakeResponse = { data: {} }

    return expectSaga(meGenerateQRCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(meGenerateQRCodeSuccess({}))
      .dispatch(meGenerateQRCode())
      .silentRun()
  })

  it('should call generate QR Code API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(meGenerateQRCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(meGenerateQRCodeError(errorMock))
      .put(showNotification('error', 'twofa.qrcode.error'))
      .dispatch(meGenerateQRCode())
      .silentRun()
  })

  it('should call send SMS code API', () => {
    const fakeResponse = { data: {} }

    return expectSaga(meSendSMSCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(meSendSMSCodeSuccess({}))
      .put(showNotification('success', 'twofa.sms.success'))
      .dispatch(meSendSMSCode())
      .silentRun()
  })

  it('should call send SMS code API and handle the error', () => {
    const fakeResponse = { err: errorMock }

    return expectSaga(meSendSMSCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(meSendSMSCodeError(errorMock))
      .put(showNotification('error', 'twofa.sms.error'))
      .dispatch(meSendSMSCode())
      .silentRun()
  })

  it('should call verify recovery code  API', () => {
    const code = '123456'
    const fakeResponse = { data: {} }

    return expectSaga(verifyRecoveryCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(verifyRecoveryCodeSuccess({}))
      .dispatch(verifyRecoveryCode(code))
      .silentRun()
  })

  it('should call verify recovery code API and handle the error', () => {
    const code = '123456'
    const fakeResponse = { err: errorMock }

    return expectSaga(verifyRecoveryCodeSaga)
      .provide([[matchers.call.fn(request), fakeResponse]])
      .put(verifyRecoveryCodeError(errorMock))
      .put(showNotification('error', 'twofa.recovery.error'))
      .dispatch(verifyRecoveryCode(code))
      .silentRun()
  })
})

describe('Auth middleware', () => {
  const create = () => {
    const state = {
      auth: {
        isLoggingIn: true,
        authToken: 'xxx',
        user: {
          activated: true,
        },
      },
    }
    const history = {
      replace: jest.fn(),
      location: {},
    }
    const store = {
      getState: jest.fn(() => (state)),
      dispatch: jest.fn(),
    }

    const next = jest.fn()

    const invoke = (action) => createAuthMiddleware(history)(store)(next)(action)

    return { store, next, invoke, history }
  }

  it('should allways call next with the action and not perform any action', () => {
    const { next, invoke, history } = create()
    const action = { type: 'TEST' }
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(history.replace).not.toHaveBeenCalled()
    expect(global.document.cookie).toEqual('')
  })

  it('should save a token cookie on LOGIN_USER_SUCCESS and replace the path', () => {
    const { next, invoke } = create()
    const action = loginSuccess(dataMock)
    const cookie = process.env.DEV_PORTAL_CLIENT_ID === 'cl0ud0k001' ? `${TOKEN_KEY}=${tokenMock}` : ''

    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(global.document.cookie).toEqual(cookie)
  })

  it('should remove the token cookie on ME_ERROR', () => {
    const { next, invoke } = create()
    const action = getMeError(errorMock)
    const cookie = process.env.DEV_PORTAL_CLIENT_ID === 'cl0ud0k001' ? `${TOKEN_KEY}=${tokenMock}` : ''
    expect(global.document.cookie).toEqual(cookie)

    invoke(action)

    expect(global.document.cookie).toEqual('')
    expect(next).toHaveBeenCalledWith(action)
  })

  it('should remove the token cookie on LOGOUT_USER and replace the path', () => {
    const { next, invoke, history } = create()
    invoke(loginSuccess(dataMock))

    const action = logout()
    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(global.document.cookie).toEqual('')
    expect(history.replace).toHaveBeenCalledTimes(1)
  })

  it('should redirect to dashboard on GET_ME_SUCCESS', () => {
    const { next, invoke, history } = create()
    const action = getMeSuccess(dataMock)

    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(history.replace).toHaveBeenCalledTimes(1)
    expect(history.replace).toHaveBeenCalledWith('/dashboard')
  })

  it('should redirect to dashboard on SIGNUP_SECURITY_SUCCESS', () => {
    const { next, invoke, history } = create()
    const action = signupSecuritySuccess()

    invoke(action)

    expect(next).toHaveBeenCalledWith(action)
    expect(history.replace).toHaveBeenCalledTimes(1)
    expect(history.replace).toHaveBeenCalledWith('/dashboard')
  })
})

describe('<ForgotPassword />', () => {
  const props = {
    intl,
    history: { push: jest.fn() },
    forgotPassword: jest.fn(),
    goBack: jest.fn(),
    forgot: {
      sent: false,
    },
    ui: {
      loading: false,
    },
  }

  const wrapper = mountWithIntl(<ForgotPassword {...props} />)

  it('should not call onButtonClick if email empty', () => {
    wrapper.find('.forgot-send-button').first().simulate('click')
    expect(props.forgotPassword).not.toHaveBeenCalled()
  })

  it('should call onButtonClick if email not empty', () => {
    const email = 'example@mail.com'
    wrapper.setState({ email })
    wrapper.find('.forgot-send-button').first().simulate('click')
    expect(props.forgotPassword).toHaveBeenCalled()
  })

  it('should hide input field after sending email', () => {
    wrapper.setProps({ forgot: { ...props.forgot, sent: true } })
    expect(wrapper.find('.forgot-input').length).toEqual(0)
  })

  it('should call history goBack on Back click', () => {
    const back = wrapper.find('.forgot-back-button').last()
    back.simulate('click')
    expect(props.goBack).toHaveBeenCalled()
  })
})

describe('<ResetPassword />', () => {
  const props = {
    intl,
    history: { push: jest.fn(), goBack: jest.fn() },
    location: { pathname: '/' },
    resetPassword: jest.fn(),
    updatePasswordRBAC: jest.fn(),
    resetModal: jest.fn(),
    match: { params: { token: 'token' } },
    ui: {
      success: false,
    },
  }

  const wrapper = mountWithIntl(<ResetPassword {...props} />)

  it('should not call resetPassword onButtonClick if passwords empty', () => {
    wrapper.find('.recover-submit').first().simulate('click')
    expect(props.resetPassword).not.toHaveBeenCalled()
  })

  it('should call resetPassword onButtonClick if passwords match', () => {
    const passPhrase = '1234567891234'
    const token = '87defec4-5346-4c42-9628-b3baeb71cd3a'
    wrapper.setState({ form: { passPhrase }, token })
    wrapper.find('.recover-submit').first().simulate('click')
    expect(props.resetPassword).toHaveBeenCalled()
  })

  it('should call resetPassword RBAC onButtonClick if passwords match', () => {
    props.userId = 202
    const wrapper = mountWithIntl(<ResetPassword {...props} />)
    const passPhrase = '1234567891234'
    wrapper.setState({ form: { passPhrase } })
    wrapper.find('.recover-submit').first().simulate('click')
    expect(props.updatePasswordRBAC).toHaveBeenCalled()
  })

  it('should generate pass on icon click', () => {
    const handleChangeSpy = jest.spyOn(wrapper.instance(), 'handleChange')
    wrapper.find('#recover-generate-pass-btn').first().simulate('click')
    expect(handleChangeSpy).toHaveBeenCalled()
  })

  it('should open login if recover done', () => {
    wrapper.setProps({ ui: { success: true } })
    wrapper.find('#recover-done-btn').first().simulate('click')
    expect(props.resetModal).toHaveBeenCalled()
  })
})
