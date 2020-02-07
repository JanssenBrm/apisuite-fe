import { connect } from 'react-redux'
import { createApp } from '../ducks'
import CreateApp from './CreateApp'
import { AppData } from '../types'
import { Dispatch } from 'redux'
import { Store } from 'store/types'

const mapStateToProps = ({ auth }: Store) => ({
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  createApp: (appData: AppData) => dispatch(createApp(appData)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CreateApp)
