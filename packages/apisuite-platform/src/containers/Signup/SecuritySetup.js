import React, { Component, Fragment } from 'react'
import { func, object, string } from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors } from 'components/FormField'
import SecurityTwoFa from 'components/SecurityTwoFa'
import randomPass from 'util/generateRandomString'
import { FormattedMessage } from 'react-intl'
import { Typography } from '@material-ui/core'
import { VisibilityOffOutlined, VisibilityOutlined } from '@material-ui/icons'
import autoGenerate from 'assets/auto_generate.svg'
import validatePassword, { MIN_LENGTH } from 'util/validatePassword'

const methods = [
  {
    value: '1',
    key: 'authorizationApp',
  },
  {
    value: '2',
    key: 'authorizationSms',
  },
]
class SecuritySetup extends Component {
  state = {
    showErrors: false,
    form: {
      password: '',
      method: '2',
      confirmationCode: '',
    },
    errors: [],
    passwordVisible: false,
  }

  togglePasswordVisibility = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible })
  }

  handleSubmit = (e) => {
    const { errors, form } = this.state
    const { password, confirmationCode, method } = form

    if (password && confirmationCode && !errors.length) {
      this.props.sendSecurityDetails({
        password,
        confirmationCode,
        method: methods.filter(m => m.value === method)[0].key,
      })
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

  generatePass = () => {
    const passPhrase = {
      target: {
        name: 'password',
        value: randomPass(),
      },
    }
    this.setState({ passwordVisible: true })
    this.handleChange(passPhrase)
  }

  render () {
    const { intl, ui, email, route, qrcode, generateQRCode, sendSMSCode } = this.props
    const { form, showErrors, errors, passwordVisible } = this.state

    const securityTitle = intl.formatMessage({ id: 'signup.security.title' })
    const securityText = intl.formatMessage({ id: 'signup.security.text' })
    const passwordLabel = intl.formatMessage({ id: 'signup.password.label' })
    const passwordRequired = intl.formatMessage({ id: 'signup.password.required' })
    const passwordHelper = intl.formatMessage({ id: 'signup.security.password.helper' })
    const registerBtn = intl.formatMessage({ id: 'signup.register.label' })
    const userEmail = <FormattedMessage id='signup.security.send.email' values={{ email }} />
    const PasswordIcon = passwordVisible ? VisibilityOutlined : VisibilityOffOutlined

    return (
      <div className='signup-personal-details'>
        <Typography variant='display4' gutterBottom>{securityTitle}</Typography>
        <p>{securityText}</p>
        <FormField
          className='signup-input signup-password'
          id='signup-password'
          testid='signup-password'
          required
          inputtype={passwordVisible ? 'text' : 'password'}
          name='password'
          placeholder={passwordLabel}
          helperText={form.password && validatePassword(form.password).length ? `${passwordRequired} ${validatePassword(form.password).join(', ')}` : passwordHelper}
          onChange={this.handleChange}
          value={form.password}
          endadornment={
            <>
              <Button
                className='password-btn auto-generate-btn end'
                id='security-generate-pass-btn'
                testid='security-generate-pass-btn'
                onClick={this.generatePass}
              >
                <img src={autoGenerate} />
              </Button>
              <Button
                id='security-pass-toggle-btn'
                testid='security-pass-toggle-btn'
                classes={{ root: 'password-btn' }}
                variant='outlined'
                onClick={this.togglePasswordVisibility}
              >
                <PasswordIcon />
              </Button>
            </>
          }
          disabled={ui.loading}
          rules={[
            { rule: !validatePassword(form.password).length, message: `${passwordRequired} ${validatePassword(form.password).join(', ')}` },
          ]}
          showerrors={`${showErrors}`}
        />
        <br />
        <SecurityTwoFa
          intl={intl}
          method={form.method}
          confirmationCode={form.confirmationCode}
          handleChange={this.handleChange}
          showErrors={showErrors}
          loading={ui.loading}
          generateQRCode={generateQRCode}
          sendSMSCode={sendSMSCode}
          route={route}
          qrcode={qrcode}
        />
        <div className='signup-submit-container'>
          <div>
            <Button
              className='signup-submit'
              testid='security-submit-btn'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={!form.confirmationCode || !form.password || form.password.length < MIN_LENGTH || errors.length > 0 || ui.loading}
            >
              {registerBtn}
            </Button>
          </div>
          <div className='small'>{userEmail}</div>
        </div>
      </div>
    )
  }
}

SecuritySetup.propTypes = {
  intl: object.isRequired,
  ui: object.isRequired,
  previousStep: func.isRequired,
  handleSubmit: func.isRequired,
  email: string.isRequired,
  number: string.isRequired,
  sendSecurityDetails: func.isRequired,
  route: string,
  qrcode: string,
  generateQRCode: func.isRequired,
  sendSMSCode: func.isRequired,
}

export default SecuritySetup
