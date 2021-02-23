import { connect } from 'react-redux'

import { bindActionCreators, Dispatch } from 'redux'

import { authActions } from 'containers/Auth/ducks'
import {
  getProfileActions,
  resetErrorAction,
  updateProfileActions,
  deleteAccountActions,
  fetchTeamMembersActions,
} from 'containers/Profile/ducks'

import Profile from './Profile'

import { Store } from 'store/types'

export const mapStateToProps = ({ auth, profile }: Store) => ({
  profile: profile.profile,
  requestStatuses: profile.requestStatuses,
  user: auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    getProfile: getProfileActions.request,
    logout: () => dispatch(authActions.logout()),
    resetErrors: resetErrorAction,
    updateProfile: updateProfileActions.request,
    deleteAccount: deleteAccountActions.request,
    fetchTeamMembers: fetchTeamMembersActions.request,
  },
  dispatch,
)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
