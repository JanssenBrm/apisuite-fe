import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { authActions } from 'containers/Auth/ducks'
import LoginPortal from './LoginPortal'
import { Dispatch } from 'redux'
import { LoginPortalProps } from './types'
import { AuthPayloads } from 'containers/Auth/types'

const mapDispatchToProps: MapDispatchToPropsFunction<LoginPortalProps, any> = (dispatch: Dispatch) => ({
  login: (loginData: AuthPayloads['login']) => dispatch(authActions.login(loginData)),
})

export default connect(null, mapDispatchToProps)(LoginPortal)
