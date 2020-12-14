import { connect } from 'react-redux'
import { getApisByName } from 'containers/Subscriptions/selectors'
import { getApis } from 'containers/Subscriptions/ducks'
import { getUserApps, addAppSubscription, removeAppSubscription } from 'containers/Applications/ducks'
import SubscriptionsTable from './SubscriptionsTable'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapStateToProps = (store: Store) => ({
  apisByName: getApisByName(store),
  user: store.auth.user,
  userApps: store.applications.userApps,
  subscribing: store.applications.subscribing,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserApps: (userId: number) => dispatch(getUserApps(userId)),
  getApis: () => dispatch(getApis()),
  addAppSubscription: (appId: number, apiName: string) => dispatch(addAppSubscription(appId, apiName)),
  removeAppSubscription: (appId: number, apiName: string) => dispatch(removeAppSubscription(appId, apiName)),
})

export default connect(mapStateToProps, mapDispatchToProps)(SubscriptionsTable)
