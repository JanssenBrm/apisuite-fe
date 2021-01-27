import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { requestAPIAccess } from 'containers/Applications/ducks'

import { getAPIsByName } from 'containers/Subscriptions/selectors'

import { Store } from 'store/types'

import SubscriptionsModal from './SubscriptionsModal'

export const mapStateToProps = (store: Store) => ({
  apisByName: getAPIsByName(store),
  allUserApps: store.applications.userApps,
  settings: store.settings,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestAPIAccess: (appId: number) => dispatch(requestAPIAccess(appId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsModal)
