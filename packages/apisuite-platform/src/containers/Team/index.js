import { connect } from 'react-redux'
import Team from './Team'
import { fetchTeam, saveRole, removeUser, fetchInvitations, createInvitation, deleteInvitation } from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ team, auth }) => ({ ...team, auth })

const mapDispatchToProps = (dispatch) => ({
  fetchTeam: () => dispatch(fetchTeam()),
  saveRole: (userId, oldRoleId, newRoleId) => dispatch(saveRole(userId, oldRoleId, newRoleId)),
  removeUser: (userId) => dispatch(removeUser(userId)),
  fetchInvitations: () => dispatch(fetchInvitations()),
  createInvitation: (orgId, data) => dispatch(createInvitation(orgId, data)),
  deleteInvitation: (orgId, invId) => dispatch(deleteInvitation(orgId, invId)),
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(Team))
