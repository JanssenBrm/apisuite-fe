import { connect } from 'react-redux'
import AppDetail from './AppDetail'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'
import { updateApp, getAppDetails, deleteApp } from '../ducks'

const mapStateToProps = ({ applications, auth }: Store) => ({
  currentApp: applications.currentApp,
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateApp: (appData: AppData) => dispatch(updateApp(appData)),
  deleteApp: (appId: number) => dispatch(deleteApp(appId)),
  getAppDetails: (appId: number, userId: number) => dispatch(getAppDetails(appId, userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
