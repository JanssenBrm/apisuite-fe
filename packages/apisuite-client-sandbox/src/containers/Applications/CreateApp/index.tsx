import { connect } from 'react-redux'
import { createApp } from '../ducks'
import { getApis } from 'containers/Subscriptions/ducks'
import CreateApp from './CreateApp'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapStateToProps = ({ auth, applications, subscriptions }: Store) => ({
  user: auth.user,
  resCreate: applications.resCreate,
  apis: subscriptions.apis,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createApp: (appData: AppData) => dispatch(createApp(appData)),
  getApis: () => dispatch(getApis()),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp)
