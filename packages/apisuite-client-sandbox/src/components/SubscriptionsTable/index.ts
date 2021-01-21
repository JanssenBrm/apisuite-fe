import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getUserApps } from 'containers/Applications/ducks'

import { getAPIsByName } from 'containers/Subscriptions/selectors'

import SubscriptionsTable from './SubscriptionsTable'

import { Store } from 'store/types'

const mapStateToProps = (store: Store) => ({
  apisByName: getAPIsByName(store),
  subscribing: store.applications.subscribing,
  user: store.auth.user,
  userApps: store.applications.userApps,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserApps: (userId: number) => dispatch(getUserApps(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsTable)
