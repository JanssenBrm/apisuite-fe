import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { appStoreActionCreators } from 'components/InformDialog/ducks'
import { authActions } from 'containers/Auth/ducks'
import Navigation from './Navigation'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
})

export default connect(null, mapDispatchToProps)(Navigation)
