import { connect } from 'react-redux'
import ListApps from './ListApps'
import { getUserApps } from '../ducks'
import { Store } from 'store/types'
import { Dispatch } from 'redux'

const mapStateToProps = ({ auth }: Store) => ({
  user: auth.user,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  getUserApps: (userId: number) => dispatch(getUserApps(userId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ListApps)
