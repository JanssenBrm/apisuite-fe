import { connect } from 'react-redux'
import { createApp } from '../ducks'
import CreateApp from './CreateApp'
import { AppData } from '../types'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createApp: (appData: AppData) => dispatch(createApp(appData)),
})

export default connect(null, mapDispatchToProps)(CreateApp)
