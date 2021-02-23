import { bindActionCreators, Dispatch } from 'redux'

import { connect } from 'react-redux'

import { Store } from 'store/types'

import { getAllUserAppsAction } from './ducks'

import Applications from './Applications'

export const mapStateToProps = (store: Store) => ({
  allUserApps: store.applications.userApps,
  createAppStatus: store.applications.createAppStatus.isRequesting,
  currentOrganisation: store.profile.profile.current_org,
  deleteAppStatus: store.applications.deleteAppStatus.isRequesting,
  requestAPIAccessStatus: store.applications.requestingAPIAccessStatus.isRequesting,
  updateAppStatus: store.applications.updateAppStatus.isRequesting,
  user: store.auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch): any =>
  bindActionCreators(
    {
      getAllUserAppsAction: getAllUserAppsAction,
    },
    dispatch,
  )

export default connect(mapStateToProps, mapDispatchToProps)(Applications)
