import { Dispatch } from 'redux'

import { connect } from 'react-redux'

import { appStoreActionCreators } from 'components/InformDialog/ducks'

import { authActions } from 'containers/Auth/ducks'

import { Store } from 'store/types'

import Navigation from './Navigation'

const mapStateToProps = ({ profile, settings }: Store) => ({
  profile: profile,
  settings: settings,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  logout: () => dispatch(authActions.logout()),
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)
