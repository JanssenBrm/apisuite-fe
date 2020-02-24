import { connect } from 'react-redux'
import AppCard from './AppCard'
import { deleteApp } from 'containers/Applications/ducks'
import { Dispatch } from 'redux'

const mapDispatchToProps = (dispatch: Dispatch) => ({
  deleteApp: (appId: number, userId: number) => dispatch(deleteApp(appId, userId)),
})

export default connect(null, mapDispatchToProps)(AppCard)
