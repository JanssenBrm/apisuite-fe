import React, { Component } from 'react'
import { object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import FormField, { parseErrors, isValidRecoveryCode } from 'components/FormField'
import Button from '@material-ui/core/Button'

class TwoFaRecovery extends Component {
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
      this.props.verifyRecoveryCode(this.state.code)
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

  render () {
    const { intl, auth, openSupport } = this.props
    const { ui } = auth
    const { code, showErrors, errors } = this.state
    const codePlaceholder = intl.formatMessage({ id: 'twofa.recovery.placeholder' })
    const codeRequired = intl.formatMessage({ id: 'twofa.recovery.required' })

    return (
      <div className='page-content-wrapper two-fa-recovery'>
        <FormattedMessage id='twofa.recovery.content' />
        <FormField
          className='two-fa-input'
          id='code'
          testid='twofa-recovery-code'
          name='Code'
          placeholder={codePlaceholder}
          onChange={this.handleFieldChange}
          value={code}
          fullWidth
          rules={[
            { rule: isValidRecoveryCode(code), message: codeRequired },
          ]}
          showerrors={`${showErrors}`}
          InputLabelProps={{ shrink: true }}
        />
        <Button
          className='two-fa-submit'
          id='twofa-recovery-btn'
          testid='twofa-recovery-btn'
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
          disabled={!code || errors.length > 0 || ui.loading}
        >
          <FormattedMessage id='twofa.code.verify' />
        </Button>
        <div className='two-fa-action'>
          <FormattedMessage id='twofa.recovery.lostCodes' /><br />
          <a onClick={openSupport} testid='twofa-support-link' className='twofa-link'><FormattedMessage id='twofa.recovery.support' /></a>
        </div>
      </div>
    )
  }
}

TwoFaRecovery.propTypes = {
  auth: object.isRequired,
  verifyRecoveryCode: func.isRequired,
  intl: object.isRequired,
  openSupport: func.isRequired,
}

export default TwoFaRecovery
