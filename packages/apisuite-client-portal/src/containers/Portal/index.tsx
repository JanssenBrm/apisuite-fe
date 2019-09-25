import { connect, MapDispatchToPropsFunction } from 'react-redux'

import Portal from './Portal'
import { appStoreActionCreators } from 'containers/App/ducks'

import { PortalMapDispatchToProps } from './types'
import { Store } from 'store/types'

const mapDispatchToProps: MapDispatchToPropsFunction<PortalMapDispatchToProps, any> = (dispatch) => ({
  inform: (...args) => dispatch(appStoreActionCreators.inform(...args)),
})

export default connect(
  ({ app }: Store) => ({
    requesting: app.requestingInform,
    requestError: app.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(Portal)
