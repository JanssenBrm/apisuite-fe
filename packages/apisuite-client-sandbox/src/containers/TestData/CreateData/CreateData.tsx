import * as React from 'react'
import useStyles from './styles'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import Link from '@material-ui/core/Link'
import SvgIcon from 'components/SvgIcon'
import Button from '@material-ui/core/Button'
import clsx from 'clsx'
import { CreateDataProps } from './types'
import { useTranslation } from 'react-i18next'

const CreateData: React.FC<CreateDataProps> = ({ history }) => {
  const classes = useStyles()
  const [t] = useTranslation()
  const [isFormValid, setFormValid] = React.useState(false)
  const [errors, setErrors] = React.useState()

  const [input, setInput] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  function handleCancel () {
    history.goBack()
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, err: any) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setErrors((old: any) => parseErrors(e.target, err, old || []))
  }

  React.useEffect(() => {
    setFormValid(errors && errors.length === 0)
  }, [errors])

  return (
    <div className={classes.root}>
      <section className={classes.contentContainer}>
        <div className={classes.top}>
          <div className={classes.sideForm}>
            <FormField
              label='Test user name'
              placeholder='Full name'
              name='name'
              value={input.name}
              onChange={handleInputs}
              rules={[
                { rule: input.name.length > 0, message: t('createData.warnings.name') },
              ]}
              type='text'
            />

            <FormField
              label='E-mail address'
              placeholder='E-mail'
              name='email'
              value={input.email}
              onChange={handleInputs}
              rules={[
                { rule: isValidEmail(input.email), message: t('createData.warnings.email') },
              ]}
              type='email'
            />

            <p className={classes.info}>
            Be sensitive about privacy, avoid using personal information without consent.&nbsp;
              <Link href='#'>
              Learn more abour our GDPR advice.&nbsp;
                <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
              </Link>
            </p>
          </div>
          <div className={classes.avatarContainer}>
            <p className={classes.uploadDesc}>Image upload</p>
            <div className={classes.upload}>
              <SvgIcon name='cloud-upload' size={24} />
            </div>
            <p className={classes.uploadDesc}>Test user avatar</p>
          </div>
        </div>
        <div className={classes.bottom}>
          <div className={classes.sideForm}>
            <FormField
              label='Test user pass-phrase'
              placeholder=''
              name='password'
              value={input.password}
              onChange={handleInputs}
              rules={[
                { rule: input.password.length > 0, message: t('createData.warnings.password') },
              ]}
              type='text'
            />

            <div className={classes.marginButtons}>
              <Button
                type='submit'
                className={clsx(classes.btn, classes.btn3)}
                disabled={!isFormValid}
              >
                Create
              </Button>
              <Button
                className={clsx(classes.btn, classes.btn2)}
                onClick={handleCancel}
              >
                Cancel
              </Button>

              <p className={classes.info}>
            Not sure if you're doing it right?&nbsp;
                <Link href='#'>
              We have documentation.&nbsp;
                  <SvgIcon name='launch' size={13} style={{ display: 'inline', transform: 'translateY(2px)' }} />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CreateData
