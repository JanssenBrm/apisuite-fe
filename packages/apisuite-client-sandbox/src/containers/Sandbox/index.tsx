import { connect, MapDispatchToPropsFunction } from 'react-redux'

import Sandbox from './Sandbox'
import { appStoreActionCreators } from 'containers/App/ducks'

import { SandboxMapDispatchToProps } from './types'
import { Store } from 'store/types'

const mapDispatchToProps: MapDispatchToPropsFunction<SandboxMapDispatchToProps, any> = (dispatch) => ({
  inform: (...args) => dispatch(appStoreActionCreators.inform(...args)),
})

export default connect(
  ({ app }: Store) => ({
    requesting: app.requestingInform,
    requestError: app.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(Sandbox)
