import React, { Component, Fragment } from 'react'
import { object, string, func, bool, array } from 'prop-types'
import classnames from 'classnames'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import FormField from 'components/FormField'

class SecurityTwoFa extends Component {
  componentDidMount () {
    if (this.props.route !== '/signup') {
      this.props.generateQRCode()
    }
  }

  componentWillReceiveProps (nextProps) {
    if ((nextProps.method !== this.props.method) && nextProps.method === '1') {
      this.props.generateQRCode()
    }
  }

  getTwoFaMethods = () => {
    const { intl } = this.props
    return [
      {
        value: '1',
        key: 'authorizationApp',
        description: intl.formatMessage({ id: 'signup.security.qrcode' }),
      },
      {
        value: '2',
        key: 'authorizationSms',
        description: intl.formatMessage({ id: 'signup.security.sms' }),
      },
    ]
  }

  sendSMS = e => this.props.sendSMSCode()

  update2fa = () => {
    const { confirmationCode, method, showErrors } = this.props
    if (confirmationCode && !showErrors) {
      const methodToSend = this.getTwoFaMethods().filter(m => method === m.value)[0].key
      this.props.twoFaUpdate({ confirmationCode, method: methodToSend })
    }
  }

  handleChange = ({ target }, errors) => {
    const { route, handleTwoFaMethodChange, handleChange } = this.props
    const isProfile = route === '/profile'
    const isMethod = target.name === 'method'
    isProfile && isMethod ? handleTwoFaMethodChange({ target }, errors) : handleChange({ target }, errors)
  }

  render () {
    const { intl, loading, showErrors, errors, method, verified, confirmationCode, qrcode, route } = this.props
    const isSignup = route === '/signup'
    const isProfile = route === '/profile'

    const twofaLabel = intl.formatMessage({ id: 'twofa.label' })
    const smsBtn = intl.formatMessage({ id: 'signup.security.sms.button' })
    const codePlaceholder = intl.formatMessage({ id: 'signup.security.sms.code' })
    const smsRequired = intl.formatMessage({ id: 'signup.security.sms.required' })
    const codeRequired = intl.formatMessage({ id: 'signup.security.qrcode.required' })
    const codeStep1 = intl.formatMessage({ id: 'signup.security.qrcode.step1' })
    const codeStep1Profile = intl.formatMessage({ id: 'profile.security.qrcode.step1' })
    const codeStep2 = intl.formatMessage({ id: 'signup.security.qrcode.step2' })
    const updateBtn = intl.formatMessage({ id: 'profile.security.2fa.update' })

    const renderConfirmation = () => (
      <div className='confirmation-wrapper'>
        <FormField
          className={classnames(
            'input',
            `${route && route.replace('/', '')}`
          )}
          required={isSignup}
          id='confirmation-code'
          testid='twofa-code'
          name='confirmationCode'
          placeholder={codePlaceholder}
          inputtype='number'
          onChange={this.props.handleChange}
          value={confirmationCode}
          disabled={loading}
          rules={[
            { rule: confirmationCode && confirmationCode.length === 6, message: method === '1' ? codeRequired : smsRequired },
          ]}
          showerrors={`${showErrors}`}
        />
      </div>
    )

    return (
      <div className='securityTwoFa'>
        <FormField
          className={
            classnames(
              'select',
              `${route && route.replace('/', '')}`
            )
          }
          disabled={isSignup}
          id='twofa-method'
          testid='twofa-method'
          name='method'
          type='select'
          label={twofaLabel}
          fullWidth
          usevalue='true'
          value={method}
          data={this.getTwoFaMethods()}
          onChange={this.handleChange}
          showerrors={`${showErrors}`}
        >
          {this.getTwoFaMethods().map((p, idx) => (
            <MenuItem
              key={idx}
              value={p.value}
            >
              {p.description}
            </MenuItem>
          ))}
        </FormField>
        {method === '1' && qrcode &&
          <div className={
            classnames(
              'qrcode-container',
              `${route && route.replace('/', '')}`
            )
          }
          >
            <div className='qrcode-wrapper'>
              <div
                className={
                  classnames(
                    'qrcode-scan',
                    `${route && route.replace('/', '')}`
                  )
                }
              >
                <img src={qrcode} />
              </div>
              {isProfile &&
                <Button
                  id='twofa-update-btn'
                  testid='twofa-update-btn'
                  className='update-button'
                  variant='outlined'
                  onClick={this.update2fa}
                  disabled={!verified && (!confirmationCode || errors.length > 0)}
                >
                  {updateBtn}
                </Button>}
            </div>
            <div
              className={
                classnames(
                  'qrcode-steps',
                  `${route && route.replace('/', '')}`
                )
              }
            >
              <div className='steps-wrapper'>
                {isSignup && <div className='step'>{codeStep1}</div>}
                {isProfile && <div className='step'>{codeStep1Profile}</div>}
                <div className='step'>{codeStep2}</div>
              </div>
              {renderConfirmation()}
            </div>
          </div>}
        {method === '2' &&
          <>
            <Button
              id='send-sms-button'
              testid='send-sms-btn'
              className={classnames('send-sms-btn', { signup: !isProfile })}
              variant='outlined'
              onClick={this.sendSMS}
              disabled={loading}
            >
              {smsBtn}
            </Button>
            <br />
            {renderConfirmation()}
            {isProfile &&
              <Button
                id='twofa-update-btn'
                testid='twofa-update-btn'
                className='update-button'
                variant='outlined'
                onClick={this.update2fa}
                disabled={!verified && (!confirmationCode || errors.length > 0)}
              >
                {updateBtn}
              </Button>}
          </>}
      </div>
    )
  }
}

SecurityTwoFa.propTypes = {
  intl: object.isRequired,
  loading: bool.isRequired,
  method: string.isRequired,
  confirmationCode: string,
  showErrors: bool.isRequired,
  handleChange: func.isRequired,
  generateQRCode: func.isRequired,
  sendSMSCode: func.isRequired,
  twoFaUpdate: func,
  route: string,
  verified: bool,
  qrcode: string,
  errors: array,
  handleTwoFaMethodChange: func,
}

export default SecurityTwoFa
