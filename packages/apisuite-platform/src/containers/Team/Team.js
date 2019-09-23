import React from 'react'
import { object, func, array } from 'prop-types'

import { FormattedMessage } from 'react-intl'
import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import { Typography } from '@material-ui/core'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import AccountCircle from '@material-ui/icons/AccountCircle'

import { ResetPassword } from '../Auth'

const ITEM_HEIGHT = 48

class Team extends React.Component {
  state = {
    team: null,
    roles: null,
    isLoading: false,
    anchorEl: null,
    showInvitationForm: false,
    form: {
      email: '',
      name: '',
      role: null,
    },
    showErrors: false,
    errors: [],
    confirmOpen: false,
    resetOpen: false,
    selectedUser: null,
    ui: {
      loading: false,
    },
    invitations: [],
  }

  componentDidMount () {
    this.props.fetchTeam()
    this.props.fetchInvitations()
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.team !== this.props.team) {
      this.setState({
        team: nextProps.team.users,
        roles: nextProps.team.roles,
        form: {
          ...this.state.form,
          role: nextProps.team.roles[1].name,
        },
      })
    }
    if (nextProps.invitations !== this.props.invitations) {
      this.setState({
        invitations: nextProps.invitations,
      })
    }
    if (nextProps.ui !== this.props.ui) {
      this.setState({
        ui: nextProps.ui,
      })
    }
  }

  isAdmin = () => {
    const { team } = this.state
    const { auth } = this.props
    if (team && team.length > 0) {
      return !!team.find(user => user.id === auth.user.id)
        .roles.find(r => r.id === 1)
    }
  }

  isMe (user) {
    const { auth } = this.props
    return user.id === auth.user.id
  }

  handleResetPassword = () => {
    this.setState({ resetOpen: true, anchorEl: null })
  }

  handleClone = () => {
    const { history } = this.props
    const { selectedUser } = this.state
    history.push({
      pathname: '/testdata',
      state: {
        testUser: selectedUser,
      },
    })
  }

  handleRemove = () => {
    this.setState({ confirmOpen: true, anchorEl: null })
  }

  handleActionMenuClick = ({ currentTarget }) => {
    const { team } = this.state
    const selectedUser = team.find(user => user.id === +currentTarget.name)
    this.setState({ selectedUser, anchorEl: currentTarget })
  }

  handlePendingActionMenuClick = member => ({ currentTarget }) => {
    this.setState({ selectedUser: member, anchorEl: currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  handleSaveRole = ({ target }) => {
    const { saveRole } = this.props
    const { team, roles } = this.state
    const memberId = +target.name
    const newRoleId = roles.find(r => r.name === target.value).id
    const oldRoleId = team.find(user => user.id === memberId).roles[0].id
    saveRole(memberId, oldRoleId, newRoleId)
  }

  handleCloseConfirm = () => {
    this.setState({ selectedUser: null, confirmOpen: false })
  }

  handleCloseReset = () => {
    this.setState({ selectedUser: null, resetOpen: false })
  }

  handleRemoveUser = () => {
    const { removeUser } = this.props
    removeUser(this.state.selectedUser.id)
    this.handleCloseConfirm()
  }

  handleDeleteInvitation = () => {
    const { deleteInvitation } = this.props
    const organizationId = this.state.team[0].roles[0].orgId
    deleteInvitation(organizationId, this.state.selectedUser.id)
    this.handleCloseConfirm()
  }

  toggleInvitationForm = open => () => {
    this.setState({ showInvitationForm: open })
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      form: { ...this.state.form, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  handleRoleChange = ({ target }) => {
    this.setState({ form: { ...this.state.form, role: target.value } })
  }

  handleInvite = () => {
    const { form, team, roles } = this.state

    // Or retrieve the orgId from the auth.user
    const organizationId = team[0].roles[0].orgId
    const data = {
      email: form.email,
      ...(form.name && { name: form.name }),
      role: roles.find(r => r.name === form.role).id,
    }

    this.props.createInvitation(organizationId, data)
    this.setState({ showInvitationForm: false, form: { ...form, email: '', name: '' } })
  }

  getTwoFaMethod = (method) => {
    switch (method) {
      case 'authorizationApp':
        return <FormattedMessage id='twofa.method.app' />
      case 'authorizationSms':
        return <FormattedMessage id='twofa.method.sms' />
    }
  }

  renderConfirmDialog () {
    const { intl } = this.props
    const { selectedUser, confirmOpen } = this.state
    const isPending = selectedUser && !selectedUser.fullName
    const confirmMessage = isPending ? intl.formatMessage({ id: 'team.dialog.confirmRemove.pending' }) : intl.formatMessage({ id: 'team.dialog.confirmRemove' })
    return (
      <Dialog
        open={confirmOpen}
        onClose={this.handleCloseConfirm}
        aria-labelledby='confirm-dialog-title'
      >
        <DialogTitle
          id='confirm-dialog-title'
        >
          {`${confirmMessage} ${!isPending && selectedUser ? selectedUser.fullName : ''} ?`}
        </DialogTitle>
        <DialogActions>
          <Button onClick={this.handleCloseConfirm} color='primary'>
            {intl.formatMessage({ id: 'team.dialog.cancel' })}
          </Button>
          <Button onClick={isPending ? this.handleDeleteInvitation : this.handleRemoveUser} color='primary' autoFocus>
            {intl.formatMessage({ id: 'team.dialog.remove' })}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  renderResetModal () {
    const { intl } = this.props
    const { resetOpen, selectedUser } = this.state
    const resetMessage = intl.formatMessage({ id: 'team.dialog.reset' })
    return (
      <Dialog
        open={resetOpen}
        onClose={this.handleCloseReset}
        aria-labelledby='reset-dialog-title'
      >
        <DialogTitle
          id='reset-dialog-title'
        >
          {resetMessage}
        </DialogTitle>
        <DialogContent>
          <ResetPassword
            location={location}
            resetModal={this.handleCloseReset}
            userId={selectedUser && selectedUser.id}
          />
        </DialogContent>
      </Dialog>
    )
  }

  renderRoles = (member, isCreate) => {
    const { roles, form, ui } = this.state
    if (roles && roles.length > 0) {
      const selectedRole = isCreate ? roles[1] : roles.find(r => r.id === member.roles[0].id)
      return (
        <FormField
          className='team-input'
          id={`team-role-${member.id}`}
          testid={`team-role-${member.id}`}
          name={`${member.id}`}
          type='select'
          fullWidth
          displayKey='name'
          value={
            isCreate
              ? form.role
              : selectedRole.name
          }
          onChange={isCreate ? this.handleRoleChange : this.handleSaveRole}
          disabled={ui.loading || !this.isAdmin() || this.isMe(member)}
          data={roles}
        >
          {
            roles.map((role, idx) => (
              <MenuItem
                key={idx}
                value={role.name}
              >
                {role.name}
              </MenuItem>
            ))
          }
        </FormField>
      )
    }
  }

  renderActionMenu (member) {
    const { intl } = this.props
    const { anchorEl, selectedUser } = this.state
    const open = Boolean(anchorEl && selectedUser && member.id === selectedUser.id)
    const isPending = !member.fullName

    const actions = [
      {
        label: intl.formatMessage({ id: 'team.action.resetPassword' }),
        callback: this.handleResetPassword,
        disabled: false,
        hidden: isPending,
      },
      {
        label: intl.formatMessage({ id: 'team.action.cloneAsTestUser' }),
        callback: this.handleClone,
        disabled: false,
        hidden: isPending,
      },
      {
        label: intl.formatMessage({ id: `${isPending ? 'team.action.delete' : 'team.action.remove'}` }),
        callback: this.handleRemove,
        disabled: this.isMe(member),
      },
    ]
    return (
      <div>
        <IconButton
          name={`${member.id}`}
          aria-label='More'
          aria-owns={open ? `action-menu-${member.id}` : undefined}
          aria-haspopup='true'
          onClick={isPending ? this.handlePendingActionMenuClick(member) : this.handleActionMenuClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id={`action-menu-${member.id}`}
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
            },
          }}
        >
          {actions.map((action, idx) => (
            !action.hidden &&
              <MenuItem
                disabled={action.disabled}
                key={`action-${idx}`}
                onClick={action.callback}
              >
                {action.label}
              </MenuItem>
          ))}
        </Menu>
      </div>
    )
  }

  renderTeam () {
    const { team, ui, showInvitationForm, form, invitations, showErrors, errors } = this.state
    const { intl } = this.props
    const inviteLabel = intl.formatMessage({ id: 'team.invite.button' })
    const sendLabel = intl.formatMessage({ id: 'team.send.button' })
    const emailLabel = intl.formatMessage({ id: 'team.invite.email.placeholder' })
    const emailTypeError = intl.formatMessage({ id: 'team.invite.email.error' })
    const nameLabel = intl.formatMessage({ id: 'team.invite.name.placeholder' })
    const nameTypeError = intl.formatMessage({ id: 'team.invite.name.error' })

    if (ui && ui.loading) {
      return (
        <div className='api-loading'>
          <div className='loading'>
            <CircularProgress className='loading-circle' />
          </div>
        </div>
      )
    }
    const noMembersLabel = intl.formatMessage({ id: 'team.no.members' })
    if (team && team.length > 0) {
      team.sort((m1, m2) => m1.fullName.localeCompare(m2.fullName))
      const organizationMembersLabel = intl.formatMessage({ id: 'team.organisation.members' })
      const roleLabel = intl.formatMessage({ id: 'team.member.role' })
      const newUserLabel = intl.formatMessage({ id: 'team.invitation.newuser' })

      return (
        <div className='team-list-wrapper'>
          <div className='team-list'>
            <table>
              <thead>
                <tr>
                  <th>{organizationMembersLabel}</th>
                  <th className='member-role'>{roleLabel}</th>
                  <th className='action-th' />
                </tr>
              </thead>
              <tbody>
                {
                  team.map((member, idx) =>
                    (
                      <tr key={idx} className='member-row'>
                        <td className='member-info'>
                          <span className='member-name'>{member.fullName}</span>
                          <span className='auth-method'>
                            {
                              member.twofa.enabled ? this.getTwoFaMethod(member.twofa.method)
                                : <FormattedMessage id='twofa.disabled' />
                            }
                          </span>
                        </td>
                        <td className='member-role'>
                          {this.renderRoles(member)}
                        </td>
                        <td className='action-menu'>
                          {this.isAdmin() && this.renderActionMenu(member)}
                        </td>
                      </tr>
                    )
                  )
                }
                {invitations.map((inv, idx) =>
                  <tr key={idx}>
                    <td className='member-info'>
                      <span className='member-name'>{inv.user_name || newUserLabel}</span>
                      <span className='auth-method'>
                        <FormattedMessage id='team.invitation.pending' />
                      </span>
                    </td>
                    <td className='member-role' />
                    <td className='action-menu'>
                      {this.isAdmin() && this.renderActionMenu(inv)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {!showInvitationForm &&
            <div className='invite-member-actions'>
              <Button
                className='invite-member-submit'
                testid='invite-member-btn'
                variant='contained'
                color='primary'
                onClick={this.toggleInvitationForm(true)}
              >
                {inviteLabel}
              </Button>
            </div>}
          {showInvitationForm ? (
            <div className='invitation-form'>
              <Button
                className='send-invite-button'
                testid='send-invite-btn'
                variant='contained'
                color='primary'
                onClick={this.handleInvite}
                disabled={!form.email || errors.length > 0}
              >
                {sendLabel}
              </Button>
              <FormField
                id='member-email'
                testid='member-email'
                className='form-input member-email'
                placeholder={emailLabel}
                name='email'
                startadornment={<AccountCircle className='adornement-icon start' />}
                onChange={this.handleChange}
                value={form.email}
                rules={[
                  { rule: isValidEmail(form.email), message: emailTypeError },
                ]}
                showerrors={`${showErrors}`}
              />
              <FormField
                id='member-name'
                testid='member-name'
                className='form-input member-name'
                placeholder={nameLabel}
                name='name'
                startadornment={<AccountCircle className='adornement-icon start' />}
                onChange={this.handleChange}
                value={form.name}
                rules={[
                  { rule: form.name ? form.name.length >= 2 : true, message: nameTypeError },
                ]}
                showerrors={`${showErrors}`}
              />
              {this.renderRoles(form, showInvitationForm)}
            </div>
          ) : (
            <div className='invite-member-help'>
              <FormattedMessage id='team.actions.help' />
              <a className='invite-member-link' testid='invite-member-link' href='/docs'>
                <FormattedMessage id='team.actions.link' />
              </a>.
            </div>
          )}
        </div>
      )
    } else {
      return <p className='empty-team'>{noMembersLabel}</p>
    }
  }

  render () {
    return (
      <div className='team-container'>
        <Typography variant='display3' gutterBottom><FormattedMessage id='team.main.title' /></Typography>
        {this.renderTeam()}
        {this.renderConfirmDialog()}
        {this.renderResetModal()}
      </div>
    )
  }
}

Team.propTypes = {
  intl: object.isRequired,
  auth: object.isRequired,
  team: object.isRequired,
  fetchTeam: func.isRequired,
  saveRole: func.isRequired,
  removeUser: func.isRequired,
  fetchInvitations: func.isRequired,
  createInvitation: func.isRequired,
  deleteInvitation: func.isRequired,
  ui: object.isRequired,
  history: object.isRequired,
  invitations: array.isRequired,
}

export default Team
