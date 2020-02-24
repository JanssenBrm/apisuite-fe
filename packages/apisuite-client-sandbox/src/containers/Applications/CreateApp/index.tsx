import { connect } from 'react-redux'
import { createApp } from '../ducks'
import CreateApp from './CreateApp'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapStateToProps = ({ auth, applications }: Store) => ({
  user: auth.user,
  resCreate: applications.resCreate,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createApp: (appData: AppData) => dispatch(createApp(appData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp)
