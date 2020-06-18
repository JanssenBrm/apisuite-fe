import { connect } from 'react-redux'
import Profile from './Profile'
import { Store } from 'store/types'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import {
  getProfileActions,
} from 'containers/Profile/ducks'

export const mapStateToProps = ({ auth, profile }: Store) => ({
  user: auth.user,
  profile: profile.profile,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getProfile: getProfileActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
