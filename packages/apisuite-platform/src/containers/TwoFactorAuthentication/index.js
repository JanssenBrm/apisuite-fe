import { connect } from 'react-redux'
import RecoveryPage from './RecoveryPage'
import LoginPage from './LoginPage'
import { twoFaAuth, verifyRecoveryCode, meSendSMSCode } from 'containers/Auth/ducks'
import { injectIntl } from 'react-intl'

const mapDispatchToPropsRecovery = (dispatch) => ({
  verifyRecoveryCode: (code) => dispatch(verifyRecoveryCode(code)),
})

const mapDispatchToPropsLogin = (dispatch) => ({
  twoFaAuth: (pass) => dispatch(twoFaAuth(pass)),
  sendSMSCode: () => dispatch(meSendSMSCode()),
})
const mapStateToProps = ({ auth }) => ({ auth })

export const TwoFaLoginPage = injectIntl(connect(mapStateToProps, mapDispatchToPropsLogin)(LoginPage))
export const TwoFaRecoveryPage = injectIntl(connect(mapStateToProps, mapDispatchToPropsRecovery)(RecoveryPage))
