import { connect, MapDispatchToPropsFunction } from 'react-redux'
import { authActions } from 'containers/Auth/ducks'
import { Store } from 'store/types'
import SSOForm from './SSOForm'
import { Dispatch } from 'redux'
import { SSODispatchToProps } from './types'
import { AuthPayloads } from 'containers/Auth/types'

const mapDispatchToProps: MapDispatchToPropsFunction<SSODispatchToProps, any> = (dispatch: Dispatch) => ({
  getProviders: () => dispatch(authActions.getSSOProviders()),
  loginWith: (payload: AuthPayloads['sso']['ssoLogin']) => dispatch(authActions.ssoLogin(payload)),
})

const mapStateToProps = ({ auth }: Store) => ({
  auth: auth,
})

export default connect(mapStateToProps, mapDispatchToProps)(SSOForm)
