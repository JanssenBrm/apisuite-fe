import { connect } from 'react-redux'
import InformDialog from './InformDialog'
import { Store } from 'store/types'
import { appStoreActionCreators } from 'components/InformDialog/ducks'
import { InformStorePayloads } from 'components/InformDialog/types'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  inform: (informData: InformStorePayloads['inform']) => dispatch(appStoreActionCreators.inform(informData)),
  closeInform: () => dispatch(appStoreActionCreators.informClose()),
})

export default connect(
  ({ informDialog }: Store) => ({
    open: informDialog.open,
    requesting: informDialog.requestingInform,
    requestError: informDialog.requestInformErrorMessage,
  }),
  mapDispatchToProps,
)(InformDialog)
