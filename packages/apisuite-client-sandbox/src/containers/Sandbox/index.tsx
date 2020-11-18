import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { appStoreActionCreators } from 'components/InformDialog/ducks'

import { getApis } from 'containers/Subscriptions/ducks'

import { Store } from 'store/types'

import Sandbox from './Sandbox'

const mapStateToProps = ({ auth, settings, subscriptions }: Store) => ({
  auth: auth,
  settings: settings,
  subscriptions: subscriptions,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getApis: () => dispatch(getApis()),
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Sandbox)
