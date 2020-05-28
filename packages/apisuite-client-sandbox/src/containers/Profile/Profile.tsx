import * as React from 'react'
import useStyles from './styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import {
  isValidURL,
  // TODO: decide on a name for mobile numbers ("phone number or mobile number") and change it everywhere
  isValidPhoneNumber,
} from 'util/validations'
import { useForm } from 'util/useForm'
import { useTranslation } from 'react-i18next'
import { User } from 'containers/Auth/types'

const Profile: React.FC<{ user?: User }> = ({ user }) => {
  let initials = ''
  const classes = useStyles()
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange } = useForm({
    name: '',
    bio: '',
    email: '',
    mobileNumber: '',
    avatarUrl: '',
  }, {
    avatarUrl: {
      rules: [isValidURL],
      message: t('warnings.url'),
    },
    mobileNumber: {
      rules: [isValidPhoneNumber],
      message: t('warnings.mobileNumber'),
    },
  })

  if (user) initials = user.fName.charAt(0) + user.lName.charAt(0)

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <form className={classes.form} onSubmit={() => console.log(formState)}>
          <aside className={classes.aside}>
            {formState.values.avatarUrl
              ? <img src={formState.values.avatarUrl} alt='profile picture' className={classes.img} />
              : <Avatar className={classes.avatar}>{initials.toLocaleUpperCase()}</Avatar>}

            <Button
              type='submit'
              disabled={!formState.isDirty && !formState.isValid}
            >
              {!formState.isDirty && !formState.isValid ? t('actions.saveDisabled') : t('actions.save')}
            </Button>
          </aside>

          <main className={classes.main}>
            <TextField
              label={t('labels.name')}
              type='text'
              name='name'
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              disabled
            />

            <TextField
              label={t('labels.bio')}
              type='text'
              name='bio'
              onChange={handleChange}
              onFocus={handleFocus}
              autoFocus
              variant='outlined'
              margin='dense'
              fullWidth
            />

            <TextField
              label={t('labels.email')}
              type='email'
              name='email'
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              disabled
            />

            <TextField
              label={t('labels.mobileNumber')}
              type='tel'
              name='mobileNumber'
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.mobileNumber && formState.errors.mobileNumber}
              helperText={
                formState.touched.mobileNumber && formState.errors.mobileNumber && formState.errorMsgs.mobileNumber
              }
            />

            <TextField
              label={t('labels.avatarUrl')}
              type='url'
              name='avatarUrl'
              onChange={handleChange}
              onFocus={handleFocus}
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
