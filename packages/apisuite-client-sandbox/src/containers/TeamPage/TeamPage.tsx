import * as React from 'react'
import useStyles from './styles'
import { useTranslation } from 'react-i18next'
import Select from 'components/Select'
import Button from '@material-ui/core/Button'
import FormField from 'components/FormField'
import { FormFieldEvent } from 'components/FormField/types'

const teamMembers: TeamMember[] = [
  {
    name: 'Quentin Antoine',
    role: 'Developer',
    auth: 'sms',
  },
  {
    name: 'Rui Dias',
    role: 'Developer',
    auth: 'app',
  },
]

type TeamMember = {
  name: string,
  role: 'Developer' | 'Administrator' | 'Sales' | 'Tester',
  auth: 'app' | 'sms' | 'none',
}

const availableRoles = [
  'Developer',
  'Administrator',
  'Sales',
  'Tester',
]

const selectOptions = (roles: typeof availableRoles) => {
  return roles.map(role => ({
    label: role,
    value: role,
    group: 'Role',
  }))
}

const TeamPage: React.FC<{}> = () => {
  const classes = useStyles()
  const [inviteVisible, toggle] = React.useReducer(v => !v, false)
  const [t] = useTranslation()
  const [input, setInput] = React.useState({
    name: '',
    email: '',
  })

  const handleInputs = (e: FormFieldEvent) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const inviteCard = () => (
    <div className={classes.inviteCard}>
      <Button className={classes.btn}>{t('rbac.team.send')}</Button>

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

      <FormField
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
      />

      <Select
        className={classes.select}
        options={selectOptions(availableRoles)}
        onChange={() => console.log('im changing')}
      />
    </div>
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

          {teamMembers.map((teamMember, indx) => (
            <div key={indx} className={classes.row}>
              <div>
                <div className={classes.name}>
                  {teamMember.name}
                </div>
                <div>
                  {teamMember.auth !== 'none'
                    ? <p className={classes.auth}>2 factor authentication {teamMember.auth} enabled</p>
                    : <p className={classes.auth}>2 factor authentication not enabled</p>}
                </div>
              </div>

              <Select
                className={classes.select}
                options={selectOptions(availableRoles)}
                onChange={() => console.log('im changing')}
              />
            </div>
          ))}

        </div>

        {inviteVisible
          ? inviteCard()
          : <Button className={classes.btn} style={{ marginTop: 24 }} onClick={toggle}>{t('rbac.team.invite')} </Button>}

      </section>
    </div>
  )
}

export default TeamPage
