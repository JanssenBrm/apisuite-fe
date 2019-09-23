
import React, { Component } from 'react'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import FormField, { parseErrors, isValidEmail } from 'components/FormField'
import { FormattedMessage } from 'react-intl'

class ForgotPassword extends Component {
  state = {
    showErrors: false,
    email: '',
    errors: [],
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      email: target.value,
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  handleSubmit = () => {
    const { errors, email } = this.state

    if (email && !errors.length) {
      this.props.forgotPassword(email)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  render () {
    const { ui, forgot, intl, goBack } = this.props
    const { showErrors, errors, email } = this.state
    const { sent } = forgot

    const emailPlaceholder = intl.formatMessage({ id: 'login.email.placeholder' })
    const errorText = intl.formatMessage({ id: 'forgotPassword.invalid' })
    const sendButton = intl.formatMessage({ id: 'forgotPassword.send' })
    const backButton = intl.formatMessage({ id: 'forgotPassword.back' })

    return (
      <div className='forgot-container'>
        <div className='forgot-wrapper'>
          {sent && <FormattedMessage id='forgotPassword.sent' values={{ email }} />}
          {!sent &&
            <div>
              <FormattedMessage
                id='forgotPassword.text'
                values={{
                  resetLink: (
                    <strong>
                      <FormattedMessage
                        id='forgotPassword.resetLink'
                      />
                    </strong>
                  ),
                }}
              />
              <div className='forgot-input'>
                <FormField
                  id='forgot-email'
                  testid='forgot-email'
                  name='email'
                  fullWidth
                  label={emailPlaceholder}
                  placeholder={emailPlaceholder}
                  onChange={this.handleChange}
                  value={email}
                  disabled={ui.loading}
                  rules={[
                    { rule: isValidEmail(email), message: errorText },
                  ]}
                  showerrors={`${showErrors}`}
                  InputLabelProps={{ shrink: true }}
                />
              </div>
            </div>}
          <div className='forgot-actions'>
            {!sent &&
              <Button
                className='forgot-send-button'
                id='forgot-send-btn'
                testid='forgot-send-btn'
                variant='contained'
                color='primary'
                onClick={this.handleSubmit}
                disabled={!email || errors.length > 0 || ui.loading}
              >
                {sendButton}
              </Button>}
            <Button
              className='forgot-back-button'
              id='forgot-back-btn'
              testid='forgot-back-btn'
              variant='outlined'
              onClick={goBack}
              disabled={ui.loading}
            >
              {backButton}
            </Button>
          </div>
          <br />
          <div className='forgot-no-account'>
            <FormattedMessage id='login.noAccount' /> <a href='/signup' testid='forgot-signup-link' className='forgot-link'><FormattedMessage id='login.signUp.text' />.</a>
          </div>
        </div>
      </div>
    )
  }
}

ForgotPassword.propTypes = {
  /**
   * Forgot action
   */
  forgotPassword: PropTypes.func.isRequired,
  /**
   * Returns to Login modal
   */
  goBack: PropTypes.func.isRequired,
  /**
   * Forgot info
   */
  forgot: PropTypes.object.isRequired,
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: PropTypes.object.isRequired,
  /**
   * Auth UI state
   */
  ui: PropTypes.object.isRequired,
}

export default ForgotPassword
