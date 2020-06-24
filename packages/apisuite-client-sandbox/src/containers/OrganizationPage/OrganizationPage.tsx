import * as React from 'react'
import useStyles from './styles'
import { OrganizationPageProps } from './types'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import { isValidURL } from 'components/FormField/index'
import { useForm } from 'util/useForm'
import { useTranslation } from 'react-i18next'
import clsx from 'clsx'

const OrganizationPage: React.FC<OrganizationPageProps> = ({
  org,
  fetchOrg,
  profile,
  updateOrg,
}) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const { formState, handleFocus, handleChange, resetForm } = useForm({
    name: '',
    description: '',
    vat: '',
    website: '',
    terms: '',
    logo: '',
  }, {
    website: {
      rules: [isValidURL],
      message: t('warnings.url'),
    },
    terms: {
      rules: [isValidURL],
      message: t('warnings.url'),
    },
    logo: {
      rules: [isValidURL],
      message: t('warnings.url'),
    },
  })

  /**
  * Computes initials to present in the avatar.
  * Takes the organization's name and gets the initial letter from every word.
  * Computes an empty string if the organizations' name is an empty string.
  */
  const initials = org.name.split(' ').map(word => word.charAt(0)).join('')

  /**
  * Fetches organization's information by ID when mounting
  */
  React.useEffect(() => {
    fetchOrg(profile.current_org.id)
  }, [fetchOrg])

  /**
  * Whenever "org" changes - which happens when mounting and after the
  * user saves - the form values are updated with the information
  * from the API
  */
  React.useEffect(() => {
    resetForm({
      name: org.name,
      description: org.description ?? '',
      vat: org.vat,
      website: org.website,
      terms: org.terms,
      logo: org.logo,
    })
  }, [org])

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault()
            updateOrg(org.id, formState.values)
          }}
        >
          <aside className={classes.aside}>
            {formState.values.logo
              ? <img src={formState.values.logo} alt='organization logo' className={classes.img} />
              : <Avatar className={classes.avatar}>{initials.toLocaleUpperCase()}</Avatar>}

            <Button
              type='submit'
              disabled={!(formState.isDirty && formState.isValid)}
              className={clsx(
                classes.btn, classes.btn2, (!(formState.isDirty && formState.isValid) && classes.disabled))}
            >
              {formState.isDirty && formState.isValid ? t('actions.save') : t('actions.saveDisabled')}
            </Button>
          </aside>

          <main className={classes.main}>
            <TextField
              className={classes.textField}
              label={t('labels.organization')}
              type='text'
              name='name'
              value={formState.values.name}
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              disabled
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.organizationDescription')}
              type='text'
              name='description'
              value={formState.values.description}
              onChange={handleChange}
              onFocus={handleFocus}
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
              label={t('labels.vat')}
              type='text'
              name='vat'
              value={formState.values.vat}
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.organizationWebsite')}
              type='url'
              name='website'
              value={formState.values.website}
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.website && formState.errors.website}
              helperText={
                formState.touched.website && formState.errors.website && formState.errorMsgs.website
              }
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.organizationTerms')}
              type='url'
              name='terms'
              value={formState.values.terms}
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.terms && formState.errors.terms}
              helperText={
                formState.touched.terms && formState.errors.terms && formState.errorMsgs.terms
              }
            />

            <br />

            <TextField
              className={classes.textField}
              label={t('labels.organizationLogo')}
              type='url'
              name='logo'
              value={formState.values.logo}
              onChange={handleChange}
              onFocus={handleFocus}
              variant='outlined'
              margin='dense'
              fullWidth
              error={formState.touched.logo && formState.errors.logo}
              helperText={
                formState.touched.logo && formState.errors.logo && formState.errorMsgs.logo
              }
            />
          </main>
        </form>
      </section>
    </div>
  )
}

export default OrganizationPage
