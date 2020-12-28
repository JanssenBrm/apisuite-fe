import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getApis } from 'containers/Subscriptions/ducks'

import { Store } from 'store/types'

import Dashboard from './Dashboard'

const mapStateToProps = ({ auth, notificationCards, profile, settings, subscriptions }: Store) => ({
  auth: auth,
  notificationCards: notificationCards,
  profile: profile,
  settings: settings,
  subscriptions: subscriptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getApis: () => dispatch(getApis()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
