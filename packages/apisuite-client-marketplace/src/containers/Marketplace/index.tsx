import { connect, MapDispatchToPropsFunction } from 'react-redux'

import Marketplace from './Marketplace'
import { appStoreActionCreators } from 'containers/App/ducks'

import { MarketplaceMapDispatchToProps } from './types'
import { Store } from 'store/types'

const mapDispatchToProps: MapDispatchToPropsFunction<MarketplaceMapDispatchToProps, any> = (dispatch) => ({
  inform: (...args) => dispatch(appStoreActionCreators.inform(...args)),
})

export default connect(
  ({ app }: Store) => ({
    requesting: app.requestingInform,
    requestError: app.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(Marketplace)
