import { connect } from 'react-redux'

import { getAPIsByName } from 'containers/Subscriptions/selectors'

import SubscriptionsTable from './SubscriptionsTable'

import { Store } from 'store/types'

const mapStateToProps = (store: Store) => ({
  apisByName: getAPIsByName(store),
})

export default connect(mapStateToProps)(SubscriptionsTable)
