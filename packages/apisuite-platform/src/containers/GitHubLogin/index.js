import { connect } from 'react-redux'
import { ghLogin } from 'containers/Auth/ducks'
import GitHubLogin from './GitHubLogin'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = (dispatch) => ({
  ghLogin: (token) => dispatch(ghLogin(token)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(GitHubLogin))
