import * as React from 'react'
import FormCard from 'components/FormCard'
import TextField from '@material-ui/core/TextField'
import useStyles from './styles'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

const LoginPortal: React.FC<{}> = () => {
  const classes = useStyles()

  const [showPassword, setShowPassword] = React.useState(false)
  const [buttonDisabled, setButtonDisabled] = React.useState(true)
  const [emailError, setEmailError] = React.useState(false)
  const [passError, setPassError] = React.useState(false)
  const [focusedField, setFocusedField] = React.useState('email-field')
  const [filledEmail, setFilledEmail] = React.useState(false)
  const [filledPass, setFilledPass] = React.useState(false)
  const [csrf, setCsrf] = React.useState('')
  const [token, setToken] = React.useState('')
  const [input, setInput] = React.useState({
    email: '',
    password: '',
  })

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

  const handleInputs = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  function fetchToken () {
    const url = 'http://127.0.0.1:3001/auth/apisuite'
    fetch(url, {
      method: 'GET',
    })
      .then((res) => { return res.text() })
      .then((res) => {
        console.log(res)
        const csrfRe = /_csrf"\svalue="([^"]*)"/
        const csrf = res.match(csrfRe)
        setCsrf(csrf[1])
        const tokenRe = /"challenge"\svalue="([^"]*)"/
        const token = res.match(tokenRe)
        setToken(token[1])
      })
  }

  React.useEffect(() => {
    fetchToken()
  }, [])

  function handleSubmit (e: React.FormEvent<HTMLInputElement>) {
    e.preventDefault()
    console.log('Submit login form')
    const url = 'http://127.0.0.1:3001/auth/login'
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        _csrf: csrf,
        challenge: token,
        email: input.email,
        password: input.password,
      }),
    })
  }

  return (
    <div className={classes.loginContainer}>
      <div className={classes.content}>
        <FormCard
          title={loginTitle}
          buttonLabel={loginButtonLabel}
          buttonDisabled={buttonDisabled}
          closeRoute={closeRoute}
          handleSubmit={handleSubmit}
        >
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>E-mail address</h5>
            <TextField
              id={emailFieldId}
              placeholder='example@cloudoki.com'
              variant='outlined'
              margin='none'
              type='email'
              name='email'
              value={input.email}
              onChange={handleInputs}
              onFocus={handleInputFocus}
              error={emailError}
              autoFocus
              fullWidth
              InputProps={{
                classes: { input: classes.emailTextfield },
              }}
            />
            {emailError && <div className={classes.alert}>Please enter a valid email address.</div>}
          </div>
          <div className={classes.fieldContainer}>
            <h5 className={classes.fieldTitle}>Pass Phrase</h5>
            <div className={classes.passPhraseContainer}>
              <TextField
                id={passFieldId}
                variant='outlined'
                margin='none'
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={input.password}
                onChange={handleInputs}
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
              </div>
            </div>
            {passError && <div className={classes.alert}>Please fill in your pass phrase.</div>}
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
