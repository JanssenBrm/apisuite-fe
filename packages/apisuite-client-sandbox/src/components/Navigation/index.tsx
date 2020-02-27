import { connect } from 'react-redux'
import { appStoreActionCreators } from 'components/InformDialog/ducks'
import Navigation from './Navigation'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
})

export default connect(null, mapDispatchToProps)(Navigation)
