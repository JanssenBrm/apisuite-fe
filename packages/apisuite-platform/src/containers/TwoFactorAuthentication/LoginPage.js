import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FormField, { parseErrors } from 'components/FormField'
import Button from '@material-ui/core/Button'

class TwoFaLogin extends Component {
  state = {
    code: '',
    errors: [],
    showErrors: false,
    message: '',
    variant: 'info',
    displayMessage: false,
  }

  handleSubmit = () => {
    const { code, errors } = this.state
    if (code && code.length > 0 && !errors.length) {
      this.props.twoFaAuth(this.state.code)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  handleFieldChange = ({ target }, errors) => {
    this.setState({
      code: target.value,
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  // sendSMS = e => this.props.sendSMSCode()

  render () {
    const { intl, auth, openRecovery } = this.props
    const { ui, TwoFA } = auth
    const { method } = TwoFA
    const { code, showErrors, errors } = this.state
    const codePlaceholder = intl.formatMessage({ id: 'twofa.code.placeholder' })
    const codeLabel = intl.formatMessage({ id: 'twofa.code.label' })
    const codeRequired = intl.formatMessage({ id: 'twofa.code.required' })
    // const smsResendBtn = intl.formatMessage({ id: 'twofa.code.sms.resend' })

    return (
      <div className='page-content-wrapper two-fa-login'>
        {method &&
          <FormattedMessage id={`twofa.login.${method}`} />}
        <FormField
          className='two-fa-input'
          inputtype='number'
          id='code'
          testid='twofa-login-code'
          name='Code'
          label={codeLabel}
          placeholder={codePlaceholder}
          onChange={this.handleFieldChange}
          value={code}
          fullWidth
          rules={[
            { rule: code && code.length === 6, message: codeRequired },
          ]}
          showerrors={`${showErrors}`}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          className='two-fa-submit'
          id='twofa-login-btn'
          testid='twofa-login-btn'
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
          disabled={!code || errors.length > 0 || ui.loading}
        >
          <FormattedMessage id='twofa.code.verify' />
        </Button>
        {/* { method && method === 'authorizationSms' &&
          <div className='two-fa-sms'>
            <FormattedMessage id='twofa.login.resendSms' />
            <Button
              id='send-sms-button'
              className='send-sms-btn'
              variant='outlined'
              onClick={this.sendSMS}
            >
              {smsResendBtn}
            </Button>
          </div>
        } */}
        <div className='two-fa-action'>
          <FormattedMessage id='twofa.login.noAccess' /><br />
          <a onClick={openRecovery} testid='twofa-recovery-link' className='twofa-link'><FormattedMessage id='twofa.login.recovery' /></a>
        </div>
      </div>
    )
  }
}

TwoFaLogin.propTypes = {
  auth: object.isRequired,
  twoFaAuth: func.isRequired,
  intl: object.isRequired,
  sendSMSCode: func.isRequired,
  openRecovery: func.isRequired,
}

export default TwoFaLogin
