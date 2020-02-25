
import * as React from 'react'
import { RegisterPortalProps } from './types'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import { useTranslation } from 'react-i18next'

const RegisterPortal: React.FC<RegisterPortalProps> = ({ register, registerUser, defaultEmail }) => {
  const classes = useStyles()
  const [t] = useTranslation()

  const [showPassword, setShowPassword] = React.useState(false)
  const [emailError, setEmailError] = React.useState(false)
  const [passError, setPassError] = React.useState(false)
  const [nameError, setNameError] = React.useState(false)
  const [focusedField, setFocusedField] = React.useState('name-field')
  const [filledName, setFilledName] = React.useState(false)
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPass, setFilledPass] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [formEdited, setFormEdited] = React.useState(false)
  const [input, setInput] = React.useState({
    name: '',
    email: '',
    password: '',
  })

  const nameFieldId = 'name-field'
  const emailFieldId = 'email-field'
  const passFieldId = 'pass-field'
  const registerButtonLabel = 'CREATE ACCOUNT'
  const closeRoute = '/'
  const passMinLength = 6

  function isValidName (name: string) {
    return (name && name.length > 0)
  }

  function isValidEmail (email: string) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(String(email).toLowerCase())
  }

  function isValidPass (pass: string) {
    const uppercase = /[A-Z]/
    const lowercase = /[a-z]/
    const symbol = /[\W]{1,}/
    const passLength = (pass.length >= passMinLength)
    return (uppercase.test(pass) && lowercase.test(pass) && symbol.test(pass) && passLength)
  }

  function isFormValid (name: string, email: string, pass: string) {
    setButtonDisabled(!(filledName && filledEmail && filledPass && isValidName(name) &&
     isValidEmail(email) && isValidPass(pass)))
  }

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    if (e.target.name === 'name') {
      if (nameError) {
        setNameError(!isValidName(e.target.value))
      }
      isFormValid(e.target.value, input.email, input.password)
    }
    if (e.target.name === 'email') {
      if (emailError) {
        setEmailError(!isValidEmail(e.target.value))
      }
      isFormValid(input.name, e.target.value, input.password)
    }
    if (e.target.name === 'password') {
      if (passError) {
        setPassError(!isValidPass(e.target.value))
      }
      isFormValid(input.name, input.email, e.target.value)
    }
    setFormEdited(true)
  }

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleInputFocus (e: React.ChangeEvent<HTMLInputElement |
  HTMLTextAreaElement> | React.FocusEvent<HTMLDivElement>) {
    setFocusedField(e.target.id)
  }

  React.useEffect(() => {
    if (focusedField === nameFieldId) {
      setFilledName(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
    } else if (focusedField === emailFieldId) {
      setFilledEmail(true)
      if (filledPass) {
        setPassError(!isValidPass(input.password))
      }
      if (filledName) {
        setNameError(!isValidName(input.name))
      }
    } else if (focusedField === passFieldId) {
      setFilledPass(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(input.email))
      }
      if (filledName) {
        setNameError(!isValidName(input.name))
      }
    }

    if (defaultEmail && !formEdited) {
      setInput({ name: '', email: atob(defaultEmail), password: '' })
    }
  }, [focusedField, defaultEmail])

  function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    registerUser({
      name: input.name,
      email: input.email,
      password: input.password,
    })
  }

  return (
    <div className={classes.registerContainer}>
      <div className={classes.content}>
        <FormCard
          buttonLabel={registerButtonLabel}
          buttonDisabled={buttonDisabled}
          loading={register.isRegistering}
          error={register.error}
          closeRoute={closeRoute}
          handleSubmit={handleSubmit}
        >
          <div className={classes.fieldContainer}>
            {/* <h5 className={classes.fieldTitle}>GDPR protected</h5> */}
            <TextField
              id={nameFieldId}
              label='Your name'
              variant='outlined'
              margin='none'
              type='text'
              name='name'
              value={input.name}
              onChange={handleInputs}
              onFocus={handleInputFocus}
              autoFocus
              error={nameError}
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {nameError && <div className={classes.alert}>{t('registerPortal.warnings.name')}</div>}
          </div>
          <div className={classes.fieldContainer}>
            {/* <h5 className={classes.fieldTitle}>E-mail address</h5> */}
            <TextField
              id={emailFieldId}
              label='E-mail'
              variant='outlined'
              margin='none'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              onFocus={handleInputFocus}
              error={emailError}
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {emailError && <div className={classes.alert}>{t('registerPortal.warnings.email')}</div>}
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.passPhraseContainer}>
              <TextField
                id={passFieldId}
                label='Password'
                variant='outlined'
                margin='none'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                fullWidth
                onChange={handleInputs}
                onFocus={handleInputFocus}
                error={passError}
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
              />
              {/* <div className={classes.btnsContainer}>
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword
                    ? <VisibilityOff id='toggle-visibility' className={classes.visibilityIcon} />
                    : <Visibility id='toggle-visibility' className={classes.visibilityIcon} />}
                </IconButton>
                <IconButton
                  onClick={generatePass}
                >
                  <Shuffle id='shuffle-button' className={classes.shuffleIcon} />
                </IconButton>
              </div> */}
            </div>
            {passError &&
              <div className={classes.bigAlert}>{t('registerPortal.warnings.password')}</div>}
          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default RegisterPortal
