import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { authActions } from 'containers/Auth/ducks'
import LoginPortal from './LoginPortal'
import { Dispatch } from 'redux'
import { LoginPortalProps } from './types'

const mapStateToProps = () => ({})

const mapDispatchToProps: MapDispatchToPropsFunction<LoginPortalProps, any> = (dispatch: Dispatch) => ({
  login: (...args) => dispatch(authActions.login(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginPortal)
