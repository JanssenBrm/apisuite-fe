
import { connect } from 'react-redux'
import RequireAuth from './RequireAuth'
import { USER_ROLES } from 'constants/global'
import ForgotPasswordComponent from './ForgotPassword'
import ResetPasswordComponent from './ResetPassword'
import { forgotPassword, resetPassword, openLoginModal, updatePasswordRBAC } from 'containers/Auth/ducks'
import { injectIntl } from 'react-intl'

/**
 * Conected RequireAuth
 * It passes store auth, Component and roleRequired as props to RequireAuth.
 *
 * @param {Function} Component - The component to be shown if authorized
 * @param {string} roleRequired - The minimum role a user must have to see the component
 */
export default (Component, roleRequired = USER_ROLES[0]) => {
  const mapStateToProps = ({ auth }) => ({
    ...auth,
    Component,
    roleRequired
  })
  const mapDispatchToProps = (dispatch) => ({
    openLoginModal: (unauthorized) => dispatch(openLoginModal(unauthorized))
  })

  return connect(mapStateToProps, mapDispatchToProps)(RequireAuth)
}

const forgotPasswordMapDispatchToProps = (dispatch) => ({
  forgotPassword: (email) => dispatch(forgotPassword(email))
})

export const ForgotPassword = injectIntl(connect(({ auth }) => ({ forgot: auth.forgot, ui: auth.ui }), forgotPasswordMapDispatchToProps)(ForgotPasswordComponent))

const resetPasswordMapDispatchToProps = (dispatch) => ({
  resetPassword: (token, password) => dispatch(resetPassword(token, password)),
  updatePasswordRBAC: (userId, password) => dispatch(updatePasswordRBAC(userId, password))
})

export const ResetPassword = injectIntl(connect(({ auth }) => ({ ui: auth.ui }), resetPasswordMapDispatchToProps)(ResetPasswordComponent))
