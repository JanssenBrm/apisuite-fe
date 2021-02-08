import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { getUserApps } from 'containers/Applications/ducks'
import { getAPIs } from 'containers/Subscriptions/ducks'

import { Store } from 'store/types'

import APIProducts from './APIProducts'

const mapStateToProps = ({ auth, subscriptions }: Store) => ({
  auth: auth,
  subscriptions: subscriptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getAPIs: () => dispatch(getAPIs()),
  getUserApps: (userId: number) => dispatch(getUserApps(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(APIProducts)
