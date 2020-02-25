import * as React from 'react'
import { LoginPortalProps } from './types'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import FormField from 'components/FormField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'

const LoginPortal: React.FC<LoginPortalProps> = ({ auth, login }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [emailError, setEmailError] = React.useState(false)
  const [passError, setPassError] = React.useState(false)
  const [focusedField, setFocusedField] = React.useState('email-field')
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPass, setFilledPass] = React.useState(false)
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

  const emailFieldId = 'email-field'
  const containerId = null
  const passFieldId = 'pass-field'
  const closeRoute = '/'

  function isValidEmail (email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  function isValidPass (pass: string) {
    return (pass.length > 0)
  }

  function isFormValid (email: string, pass: string) {
    setButtonDisabled(!(filledEmail && filledPass && isValidEmail(email) && isValidPass(pass)))
  }

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, errors) => {
    console.log("triggered", errors)
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'email') {
      if (emailError) {
        setEmailError(!isValidEmail(e.target.value))
      }
      isFormValid(e.target.value, input.email)
    }
    if (e.target.name === 'password') {
      if (passError) {
        setPassError(!isValidPass(e.target.value))
      }
      isFormValid(input.email, e.target.value)
    }
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleInputFocus (e: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement>) {
    setFocusedField(e.target.id)
  }

  React.useEffect(() => {
    if (focusedField === emailFieldId) {
      setFilledEmail(true)
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
    } else if (focusedField === passFieldId) {
      setFilledPass(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
    } else if (focusedField === containerId) {
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
    }
  }, [focusedField])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    login({ email: input.email, password: input.password })
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.content}>
        <FormCard
          // title={t('loginPortal.title')}
          buttonLabel={t('loginPortal.button')}
          buttonDisabled={buttonDisabled}
          loading={auth.isAuthorizing}
          error={auth.error}
          closeRoute={closeRoute}
          handleSubmit={handleSubmit}
        >
          <div className={classes.fieldContainer}>
            <FormField
              id={emailFieldId}
              label='E-mail'
              variant='outlined'
              margin='none'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              autoFocus
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
              rules={[
                { rule: input.email.length > 10, message: t('loginPortal.warnings.email') }
              ]}
            />
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.passPhraseContainer}>
              <FormField
                id={passFieldId}
                label='Password'
                variant='outlined'
                margin='none'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                onChange={handleInputs}
                fullWidth
                InputProps={{
                  classes: { input: classes.passPhrasefield },
                  endAdornment:
  <InputAdornment position='end'>
    <IconButton
      aria-label='toggle password visibility'
      onClick={handleClickShowPassword}
      edge='end'
    >
      {showPassword ? <Visibility /> : <VisibilityOff />}
    </IconButton>
  </InputAdornment>,
                }}
                rules={[
                  { rule: input.password.length > 10, message: t('loginPortal.warnings.password') }
                ]}
              />
            </div>
            <div className={classes.optionsContainer}>
              {/* <a className={classes.option} href='/'>Forgot your pass phrase?</a> */}
              {/* <a className={classes.option} href='/register'>Not registered yet? Sign up.</a> */}
            </div>
          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default LoginPortal
