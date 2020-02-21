import { connect } from 'react-redux'
import { appStoreActionCreators } from 'containers/App/ducks'
import { AppStorePayloads } from 'containers/App/types'
import Navigation from './Navigation'
import { Dispatch } from 'redux'

const mapsDispatchToProps = (dispatch: Dispatch) => ({
  inform: (informData: AppStorePayloads['inform']) => dispatch(appStoreActionCreators.inform(informData)),
})

export default connect(null, mapsDispatchToProps)(Navigation)
