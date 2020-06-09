import { connect } from 'react-redux'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
  inviteMemberActions,
  changeRoleActions,
} from 'containers/Profile/ducks'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'
import TeamPage from './TeamPage'

export const mapStateToProps = ({ profile, auth }: Store) => ({
  members: profile.members,
  roleOptions: profile.roleOptions,
  user: auth.user,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchTeamMembers: fetchTeamMembersActions.request,
  fetchRoleOptions: fetchRoleOptionsActions.request,
  inviteMember: inviteMemberActions.request,
  changeRole: changeRoleActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
