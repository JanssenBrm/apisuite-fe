import { connect } from 'react-redux'
import ListApps from './ListApps'
import { getUserApps } from '../ducks'
import { Store } from 'store/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({ auth, applications }: Store) => ({
  user: auth.user,
  userApps: applications.userApps,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserApps: (orgId: number) => dispatch(getUserApps(orgId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListApps)
