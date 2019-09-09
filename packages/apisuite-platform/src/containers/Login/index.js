import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { login, ghLogin } from 'containers/Auth/ducks'
import Login from './Login'
import { injectIntl } from 'react-intl'

const mapStateToProps = state => ({
  ui: state.auth.ui,
  auth: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (credentials) => dispatch(login(credentials)),
  goToSignup: () => dispatch(push('/signup')),
  ghLogin: () => dispatch(ghLogin()),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Login))
