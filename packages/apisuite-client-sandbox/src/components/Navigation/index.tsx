import { connect } from 'react-redux'
import { appStoreActionCreators } from 'containers/App/ducks'
import { AppStorePayloads } from 'containers/App/types'
import Navigation from './Navigation'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  inform: (informData: AppStorePayloads['inform']) => dispatch(appStoreActionCreators.inform(informData)),
})

export default connect(
  ({ app }: Store) => ({
    requesting: app.requestingInform,
    requestError: app.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(Navigation)
