import { connect } from 'react-redux'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
} from 'containers/Profile/ducks'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'
import TeamPage from './TeamPage'

export const mapStateToProps = ({ profile }: Store) => ({
  members: profile.members,
  roleOptions: profile.roleOptions,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchTeamMembers: fetchTeamMembersActions.request,
  fetchRoleOptions: fetchRoleOptionsActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)
