import { connect, MapDispatchToPropsFunction } from 'react-redux'

import SSO from './SSO'
import { appStoreActionCreators } from 'containers/App/ducks'

import { SSOMapDispatchToProps } from './types'
import { Store } from 'store/types'

const mapDispatchToProps: MapDispatchToPropsFunction<SSOMapDispatchToProps, any> = (dispatch) => ({
  inform: (...args) => dispatch(appStoreActionCreators.inform(...args)),
})

export default connect(
  ({ app }: Store) => ({
    requesting: app.requestingInform,
    requestError: app.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(SSO)
