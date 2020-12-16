import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { authActions } from 'containers/Auth/ducks'
import { getProfileActions, resetErrorAction, updateProfileActions } from 'containers/Profile/ducks'

import Profile from './Profile'

import { Store } from 'store/types'

export const mapStateToProps = ({ auth, profile }: Store) => ({
  profile: profile.profile,
  requestStatutes: profile.requestStatuses,
  user: auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  getProfile: getProfileActions.request,
  logout: () => dispatch(authActions.logout()),
  resetErrors: resetErrorAction,
  updateProfile: updateProfileActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
