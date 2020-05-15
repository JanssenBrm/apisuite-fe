import { connect } from 'react-redux'
import {
  authActions,
} from 'containers/Auth/ducks'
import ForgotPasswordPage from './ForgotPasswordPage'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  handleSubmit: (emailInformation: { email: string}) => authActions.recoverPassword(emailInformation),
}, dispatch)

export default connect(null, mapDispatchToProps)(ForgotPasswordPage)
