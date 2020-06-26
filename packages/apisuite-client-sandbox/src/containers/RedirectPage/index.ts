import { connect } from 'react-redux'
import { confirmRegistrationActions } from 'components/RegisterForm/ducks'
import { confirmInviteActions } from 'containers/Profile/ducks'
import RedirectPage from './RedirectPage'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  confirmRegistration: (token: string) => confirmRegistrationActions.request(token),
  confirmInvite: (token: string) => confirmInviteActions.request(token),
}, dispatch)

export default connect(null, mapDispatchToProps)(RedirectPage)
