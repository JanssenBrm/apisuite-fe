import { connect } from 'react-redux'
import Subscriptions from './Subscriptions'
import { getUserApps } from 'containers/Applications/ducks'
import { Store } from 'store/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({ auth, applications }: Store) => ({
  user: auth.user,
  userApps: applications.userApps,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserApps: (userId: number) => dispatch(getUserApps(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Subscriptions)
