import { connect } from 'react-redux'
import AppDetail from './AppDetail'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'
import { updateApp, getAppDetails } from '../ducks'

const mapStateToProps = ({ applications }: Store) => ({
  currentApp: applications.currentApp,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateApp: (appData: AppData) => dispatch(updateApp(appData)),
  getAppDetails: () => dispatch(getAppDetails()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppDetail)
