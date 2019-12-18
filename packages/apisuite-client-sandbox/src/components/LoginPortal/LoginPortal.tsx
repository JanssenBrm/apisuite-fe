import * as React from 'react'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Shuffle from '@material-ui/icons/Shuffle'

const LoginPortal: React.FC<{}> = () => {
  const classes = useStyles()

  const [showPassword, setShowPassword] = React.useState(false)
  const [emailValue, setEmailValue] = React.useState('')
  const [passValue, setPassValue] = React.useState('')
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [emailError, setEmailError] = React.useState(false)
  const [passError, setPassError] = React.useState(false)
  const [focusedField, setFocusedField] = React.useState('email-field')
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPass, setFilledPass] = React.useState(false)

  const emailFieldId = 'email-field'
  const passFieldId = 'pass-field'
  const loginTitle = 'Login'
  const loginButtonLabel = 'Login'
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

  function handleClickShowPassword () {
    setShowPassword(!showPassword)
  }

  function handleEmailChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newEmail = e.target.value
    setEmailValue(newEmail)
    if (emailError) {
      setEmailError(!isValidEmail(newEmail))
    }
    isFormValid(newEmail, passValue)
  }

  function handlePassChange (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const newPass = e.target.value
    setPassValue(newPass)
    if (passError) {
      setPassError(!isValidPass(newPass))
    }
    isFormValid(emailValue, newPass)
  }

  function handleInputFocus (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFocusedField(e.target.id)
  }

  React.useEffect(() => {
    const url = 'http://127.0.0.1:3001/auth/apisuite'
    const options = {
      method: 'GET',
    }

    fetch(url, options)
      .then(response => {
        console.log(response.text())
      })
  }, [])

  React.useEffect(() => {
    if (focusedField === emailFieldId) {
      setFilledEmail(true)
      if (filledPass) {
        setPassError(!isValidPass(passValue))
      }
    } else if (focusedField === passFieldId) {
      setFilledPass(true)
      if (filledEmail) {
        setEmailError(!isValidEmail(emailValue))
      }
    }
  }, [focusedField])

  return (
    <div className={classes.loginContainer}>
      <div className={classes.content}>
        <FormCard
          title={loginTitle}
          buttonLabel={loginButtonLabel}
          buttonDisabled={buttonDisabled}
          closeRoute={closeRoute}
        >
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>E-mail address</h5>
            <TextField
              id={emailFieldId}
              placeholder='example@cloudoki.com'
              variant='outlined'
              margin='none'
              type='email'
              value={emailValue}
              onChange={handleEmailChange}
              onFocus={handleInputFocus}
              error={emailError}
              autoFocus
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {emailError
              ? <div className={classes.alert}>Please enter a valid email address.</div>
              : null}
          </div>
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>Pass Phrase</h5>
            <div className={classes.passPhraseContainer}>
              <TextField
                id={passFieldId}
                variant='outlined'
                margin='none'
                type={showPassword ? 'text' : 'password'}
                value={passValue}
                onChange={handlePassChange}
                onFocus={handleInputFocus}
                error={passError}
                fullWidth
                InputProps={{
                  classes: { input: classes.passPhrasefield },
                }}
              />
              <div className={classes.btnsContainer}>
                <IconButton
                  onClick={handleClickShowPassword}
                >
                  {showPassword
                    ? <VisibilityOff className={classes.visibilityIcon} />
                    : <Visibility className={classes.visibilityIcon} />}
                </IconButton>
                <IconButton>
                  <Shuffle className={classes.shuffleIcon} />
                </IconButton>
              </div>
            </div>
            {passError ? <div className={classes.alert}>Please fill in your pass phrase.</div> : null}
            <div className={classes.optionsContainer}>
              <a className={classes.option} href='/'>Forgot your pass phrase?</a>
              <a className={classes.option} href='/register'>Not registered yet? Sign up.</a>
            </div>
          </div>
        </FormCard>
      </div>
    </div>
  )
}

export default LoginPortal
