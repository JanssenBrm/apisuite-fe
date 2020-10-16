import * as React from 'react'
import useStyles from './styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import Select from 'components/Select'
import { SelectOption } from 'components/Select/types'
import InputLabel from '@material-ui/core/InputLabel'
import {
  isValidURL,
  isValidPhoneNumber,
} from 'components/FormField/index'
import { useForm } from 'util/useForm'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
import clsx from 'clsx'
import Close from '@material-ui/icons/Close'
import {
  ProfileProps,
  Organization,
} from './types'

const Profile: React.FC<ProfileProps> = ({
  getProfile,
  profile,
  updateProfile,
  requestStatutes,
  resetErrors,
}) => {
  let initials = ''
  const classes = useStyles()
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange, resetForm } = useForm({
    name: '',
    bio: '',
    email: '',
    mobileNumber: '',
    avatarUrl: '',
  }, {
    avatarUrl: {
      rules: [(uri) => {
        const stringURI = uri.toString()
        if (stringURI.length === 0) return true
        if (stringURI.length > 0) return isValidURL(uri)
        return false
      }],
      message: t('warnings.url'),
    },
    mobileNumber: {
      rules: [(phone) => {
        const stringPhone = phone.toString()
        if (stringPhone.length === 0) return true
        if (stringPhone.length > 0) return isValidPhoneNumber(phone)
        return false
      }],
      message: t('warnings.mobileNumber'),
    },
  })
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour12: false,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }

  if (profile) {
    const initialsArray = profile.user.name.split(' ')

    initials = initialsArray.length > 1
      ? `${initialsArray[0].charAt(0)}${initialsArray[1].charAt(0)}`
      : `${initialsArray[0].charAt(0)}${initialsArray[0].charAt(0)}`
  }

  React.useEffect(() => {
    getProfile()
  }, [getProfile])

  React.useEffect(() => {
    resetForm({
      name: profile.user.name,
      bio: profile.user.bio ?? '',
      email: profile.user.email,
      mobileNumber: (profile.user.mobile && profile.user.mobile !== '0') ? profile.user.mobile : '',
      avatarUrl: profile.user.avatar ?? '',
    })
  }, [profile])

  const selectOptions = (orgs: Organization[]) => {
    return orgs.map(org => ({
      label: org.name,
      value: org.id,
      group: 'Organization',
    }))
  }

  function updateFormProfile (e: React.ChangeEvent<{}>, option?: SelectOption) {
    e.preventDefault()
    let number = parseInt(formState.values.mobileNumber)
    let org = profile.current_org.id
    if (!formState.values.mobileNumber) number = 0
    if (option) org = option.value.toString()
    updateProfile(formState.values.name, formState.values.bio, formState.values.avatarUrl, number, org.toString())
  }

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <form
          className={classes.form}
          onSubmit={(e) => updateFormProfile(e)}
        >
          <aside className={classes.aside}>
            {formState.values.avatarUrl
              ? <img src={formState.values.avatarUrl} alt='profile picture' className={classes.img} />
              : <Avatar className={classes.avatar}>{initials.toLocaleUpperCase()}</Avatar>}

            <InputLabel shrink>Access level</InputLabel>
            <div>{profile.current_org.role.name}</div>

            <InputLabel shrink>Last login</InputLabel>
            <div>
              {profile.user.last_login &&
              new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(profile.user.last_login))}
            </div>

            <InputLabel shrink>Member since</InputLabel>
            <div>
              {profile.current_org.member_since &&
              new Intl.DateTimeFormat(i18n.language, dateOptions).format(Date.parse(profile.current_org.member_since))}
            </div>

            <InputLabel className={classes.inputLabel} shrink>Organisation</InputLabel>
            <Select
              options={selectOptions(profile.orgs_member)}
              onChange={updateFormProfile}
              selected={selectOptions(profile.orgs_member).find(
                option => option.value === profile.current_org.id)}
            />

            <InputLabel className={classes.inputLabel} shrink>Actions</InputLabel>
            <Button
              type='submit'
              disabled={!(formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0))}
              className={clsx(
                classes.btn,
                classes.btn2,
                (!(formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0)) &&
                classes.disabled))}
            >
              {formState.isDirty && (formState.isValid || Object.keys(formState.errors).length === 0) ? t('actions.save') : t('actions.saveDisabled')}
            </Button>

            {requestStatutes.updateProfileRequest.error !== '' &&
              <div className={classes.errorPlaceholder}>
                <div className={classes.errorAlert}>{requestStatutes.updateProfileRequest.error}</div>
                <Close onClick={resetErrors} />
              </div>}
          </aside>

          <main className={classes.main}>
            <TextField
              className={classes.textField}
              label={t('labels.name')}
              type='text'
              name='name'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formState.values.name}
              variant='outlined'
              margin='dense'
              fullWidth
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.bio')}
              type='text'
              name='bio'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formState.values.bio}
              autoFocus
              multiline
              rows={5}
              variant='outlined'
              margin='dense'
              fullWidth
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.email')}
              type='email'
              name='email'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formState.values.email}
              variant='outlined'
              margin='dense'
              fullWidth
              disabled
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.mobileNumber')}
              type='tel'
              name='mobileNumber'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formState.values.mobileNumber}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.mobileNumber && formState.errors.mobileNumber}
              helperText={
                formState.touched.mobileNumber && formState.errors.mobileNumber && formState.errorMsgs.mobileNumber
              }
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.avatarUrl')}
              type='url'
              name='avatarUrl'
              onChange={handleChange}
              onFocus={handleFocus}
              value={formState.values.avatarUrl}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.avatarUrl && formState.errors.avatarUrl}
              helperText={
                formState.touched.avatarUrl && formState.errors.avatarUrl && formState.errorMsgs.avatarUrl
              }
            />
          </main>
        </form>
      </section>
    </div>
  )
}

export default Profile
