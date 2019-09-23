import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import { FormattedMessage } from 'react-intl'
// import { API_URL } from 'constants/endpoints'

class Login extends Component {
  state = {
    showErrors: false,
    form: {
      email: '',
      password: '',
    },
    errors: [],
  }

  navigate = route => () => this.props.history.push(route)

  handleSubmit = () => {
    const { errors, form } = this.state
    const { password, email } = form

    if (password && email && !errors.length) {
      this.props.logUserIn({ email, password })
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      form: { ...this.state.form, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  // loginWithGh = () => {
  //   this.makeLoading()
  //   const redirect = `${API_URL}/auth/github`
  //   window.location.href = redirect
  // }

  render () {
    const { intl, ui, openForgotPassword } = this.props
    const { form, showErrors, errors } = this.state
    const { password, email } = form

    const emailRequired = intl.formatMessage({ id: 'login.email.required' })
    const emailPlaceholder = intl.formatMessage({ id: 'login.email.placeholder' })
    const passwordRequired = intl.formatMessage({ id: 'login.password.required' })
    const passwordPlaceholder = intl.formatMessage({ id: 'login.password.placeholder' })
    const loginButton = intl.formatMessage({ id: 'login.label' })

    return (
      <div className='page-content-wrapper login-container'>
        <div className='login-form-wrapper'>
          <FormField
            className='login-input'
            id='login-email'
            testid='login-email'
            fullWidth
            label={emailPlaceholder}
            placeholder={emailPlaceholder}
            name='email'
            onChange={this.handleChange}
            value={form.email}
            disabled={ui.loading}
            InputLabelProps={{ shrink: true }}
            rules={[
              { rule: isValidEmail(form.email), message: emailRequired },
            ]}
            showerrors={`${showErrors}`}
          />
          <FormField
            className='login-input'
            id='login-password'
            testid='login-password'
            fullWidth
            label={passwordPlaceholder}
            placeholder={passwordPlaceholder}
            name='password'
            onChange={this.handleChange}
            value={form.password}
            disabled={ui.loading}
            inputtype='password'
            InputLabelProps={{ shrink: true }}
            rules={[
              { rule: form.password.length > 0, message: passwordRequired },
            ]}
            showerrors={`${showErrors}`}
          />
          <div className='login-link' id='login-forgot-link' testid='login-forgot-link' onClick={openForgotPassword}>
            <FormattedMessage id='login.forgotPassword.text' />
          </div>
          <br />
          <br />
          <div className='login-form-actions'>
            <Button
              className='login-submit'
              testid='login-submit'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={!password || !email || errors.length > 0 || ui.loading}
            >
              {loginButton}
            </Button>
            <div className='login-bottom-link'>
              <FormattedMessage id='login.noAccount' /> <a testid='signup-link' id='signup-link' className='login-link' onClick={this.navigate('/signup')}><FormattedMessage id='login.signUp.text' /></a>.
            </div>
            {/* <div className='gh-login-wrapper'>
              <div className='gh-login-divider'><span>or</span></div>
              <div className='gh-login-button-wrapper'>
                <Button
                  type='primary'
                  icon={ui.loading ? 'loading' : 'github'}
                  size='large'
                  onClick={this.loginWithGh}
                  disabled={ui.loading}
                  className='gh-login-button'
                  testid='gh-login-button'
                >
                  <FormattedMessage id='login.github.label' />
                </Button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  /**
   * Login action
   */
  logUserIn: PropTypes.func.isRequired,
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: PropTypes.object.isRequired,
  /**
   * Authentication UI state
   */
  ui: PropTypes.object.isRequired,
  /**
   * Open Forgot Password modal action
   */
  openForgotPassword: PropTypes.func.isRequired,
  /**
   * Browser history session
   */
  history: PropTypes.object.isRequired,
}

export default Login
