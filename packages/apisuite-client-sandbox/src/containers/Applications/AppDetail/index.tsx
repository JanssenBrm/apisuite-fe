import { connect } from 'react-redux'
import AppDetail from './AppDetail'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'
import { updateApp, getAppDetails, deleteApp } from '../ducks'
import { appStoreActionCreators } from 'components/InformDialog/ducks'

const mapStateToProps = ({ applications, auth }: Store) => ({
  currentApp: applications.currentApp,
  user: auth.user,
  resUpdate: applications.resUpdate,
  resDelete: applications.resDelete,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateApp: (appData: AppData) => dispatch(updateApp(appData)),
  deleteApp: (appId: number, userId?: number) => dispatch(deleteApp(appId, userId)),
  getAppDetails: (appId: number, userId: number) => dispatch(getAppDetails(appId, userId)),
  toggleInform: () => dispatch(appStoreActionCreators.informOpen()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
