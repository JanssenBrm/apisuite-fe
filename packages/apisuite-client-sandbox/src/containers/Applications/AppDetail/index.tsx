import { connect } from 'react-redux'
import AppDetail from './AppDetail'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'
import { updateApp, getAppDetails, deleteApp } from '../ducks'

const mapStateToProps = ({ applications }: Store) => ({
  currentApp: applications.currentApp,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateApp: (appData: AppData, appId: string) => dispatch(updateApp(appData, appId)),
  deleteApp: (appId: string) => dispatch(deleteApp(appId)),
  getAppDetails: () => dispatch(getAppDetails()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
