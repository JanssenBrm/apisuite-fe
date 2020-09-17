import * as React from 'react'
import useStyles from './styles'
import { useTranslation } from 'react-i18next'
import Select from 'components/Select'
import Button from '@material-ui/core/Button'
import FormField from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'
import { TeamPageProps } from './types'
import { SelectOption } from 'components/Select/types'
import Close from '@material-ui/icons/Close'
import { Role } from 'containers/Profile/types'
import CircularProgress from '@material-ui/core/CircularProgress'

const TeamPage: React.FC<TeamPageProps> = ({
  fetchTeamMembers,
  fetchRoleOptions,
  inviteMember,
  changeRole,
  members,
  roleOptions,
  user,
  requestStatutes,
  resetErrors,
}) => {
  const classes = useStyles()
  const [inviteVisible, toggle] = React.useReducer(v => !v, false)
  const [t] = useTranslation()
  const [input, setInput] = React.useState({
    email: '',
    roleId: '',
  })

  const selectOptions = (roles: Role[]) => {
    return roles.map(role => ({
      label: role.name,
      value: role.id,
      group: 'Role',
    }))
  }

  const handleInputs = (e: FormFieldEvent) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  React.useEffect(() => {
    fetchTeamMembers()
    fetchRoleOptions()
  }, [fetchTeamMembers, fetchRoleOptions])

  function chooseRole (e: React.ChangeEvent<{}>, option: SelectOption) {
    if (e && option) {
      setInput({
        ...input,
        roleId: option.value,
      })
    }
  }

  const handleChangeRole = (userId: number, orgId: string) => (e: React.ChangeEvent<{}>, option: SelectOption) => {
    e.preventDefault()
    // TOOD: review; there's is something wrongly typed somewhere
    if (option.value) changeRole(userId.toString(), orgId.toString(), option.value.toString())
  }

  const inviteCard = () => (
    <form
      className={classes.inviteCard}
      onSubmit={(e) => {
        e.preventDefault()
        inviteMember(input.email, input.roleId.toString())
      }}
    >
      <Button className={classes.btn} type='submit'>
        {requestStatutes.inviteMemberRequest.isRequesting ? <CircularProgress size={20} className={classes.loading} /> : t('rbac.team.send')}
      </Button>

      <FormField
        id='email-field'
        label='E-mail'
        variant='outlined'
        type='email'
        placeholder=''
        name='email'
        value={input.email}
        onChange={handleInputs}
        autoFocus
        fullWidth={false}
        errorPlacing='bottom'
        InputProps={{
          classes: { input: classes.emailTextfield },
        }}
      />

      {/* <FormField
        id='name-field'
        label='Name'
        variant='outlined'
        type='text'
        placeholder=''
        name='name'
        value={input.name}
        onChange={handleInputs}
        autoFocus
        fullWidth={false}
        errorPlacing='bottom'
        InputProps={{
          classes: { input: classes.nameTextfield },
        }}
      /> */}

      <Select
        className={classes.select}
        options={selectOptions(roleOptions)}
        onChange={chooseRole}
      />
    </form>
  )

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <h1 className={classes.title}>{t('rbac.team.title')}</h1>

        <div className={classes.table}>
          <div className={classes.header}>
            <div>{t('rbac.team.header')}</div>
            <div className={classes.actions}>{t('rbac.team.actions')}</div>
          </div>

          {members.map((member, indx) => (
            <div key={indx} className={classes.row}>
              <div>
                <div className={classes.name}>
                  {member.User.name}
                </div>
                <div>
                  <p className={classes.auth}>2 factor authentication not enabled</p>
                </div>
              </div>

              {user &&
                <Select
                  className={classes.select}
                  options={selectOptions(roleOptions)}
                  onChange={handleChangeRole(member.User.id, member.Organization.id)}
                  disabled={user.role.name === 'developer' || user.id === member.User.id}
                  selected={selectOptions(roleOptions).find(
                    option => option.label === member.Role.name)}
                />}
            </div>
          ))}
        </div>

        {!inviteVisible && user
          ? (user.role.name === 'superadmin' || user.role.name === 'admin') &&
            <Button className={classes.btn} style={{ marginTop: 24 }} onClick={toggle}>{t('rbac.team.invite')} </Button>
          : inviteCard()}

        {(requestStatutes.inviteMemberRequest.error !== '' || requestStatutes.changeRoleRequest.error !== '') &&
          <div className={classes.errorPlaceholder}>
            <div className={classes.errorAlert}>
              {requestStatutes.inviteMemberRequest.error || requestStatutes.changeRoleRequest.error}
              <Close onClick={resetErrors} />
            </div>

          </div>}

      </section>
    </div>
  )
}

export default TeamPage
