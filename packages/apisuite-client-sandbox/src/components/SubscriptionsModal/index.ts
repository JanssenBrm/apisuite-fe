import { connect } from 'react-redux'

import { getAPIsByName } from 'containers/Subscriptions/selectors'

import { Store } from 'store/types'

import SubscriptionsModal from './SubscriptionsModal'

export const mapStateToProps = (store: Store) => ({
  apisByName: getAPIsByName(store),
  allUserApps: store.applications.userApps,
  settings: store.settings,
})

export default connect(mapStateToProps)(SubscriptionsModal)
