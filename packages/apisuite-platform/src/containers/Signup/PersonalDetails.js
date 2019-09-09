import React, { Component } from 'react'
import { object, func } from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidEmail, isValidPhoneNumber } from 'components/FormField'
import Checkbox from 'components/Checkbox'
import { Typography } from '@material-ui/core'
import _isEmpty from 'lodash/isEmpty'

class PersonalDetails extends Component {
  constructor (props) {
    super(props)

    const email = props.invitation.email || ''
    const fullName = props.invitation.user_name || ''

    this.state = {
      showErrors: false,
      form: {
        email,
        confirmEmail: email,
        fullName,
        phoneNumber: '',
        terms: false,
        privacy: false,
      },
      errors: [],
    }
  }

  handleSubmit = (e) => {
    const { errors, form } = this.state
    const { email, confirmEmail, fullName, phoneNumber, terms, privacy } = form

    if (email && confirmEmail && fullName && phoneNumber && terms && privacy && !errors.length) {
      this.props.nextStep(form)
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

  handleCheckboxChange = name => event => {
    this.setState({ form: { ...this.state.form, [name]: event.target.checked } })
  }

  render () {
    const { intl, ui, invitation } = this.props
    const { form, showErrors, errors } = this.state

    const emailLabel = intl.formatMessage({ id: 'signup.email.label' })
    const confirmEmailLabel = intl.formatMessage({ id: 'signup.confirmEmail.label' })
    const emailTypeError = intl.formatMessage({ id: 'signup.email.typeError' })
    const confirmEmailTypeError = intl.formatMessage({ id: 'signup.confirmEmail.typeError' })
    const phoneNumberLabel = intl.formatMessage({ id: 'signup.phoneNumber.label' })
    const phoneNumberTypeError = intl.formatMessage({ id: 'signup.phoneNumber.typeError' })
    const personalTitle = intl.formatMessage({ id: 'signup.personal.title' })
    const personalText = intl.formatMessage({ id: 'signup.personal.text' })
    const agreeTerms1 = intl.formatMessage({ id: 'signup.personal.agreeterms1' })
    const agreeTerms2 = intl.formatMessage({ id: 'signup.personal.agreeterms2' })
    const agreePrivacy1 = intl.formatMessage({ id: 'signup.personal.agreeprivacy1' })
    const agreePrivacy2 = intl.formatMessage({ id: 'signup.personal.agreeprivacy2' })
    const formLabel = intl.formatMessage({ id: 'signup.form.label' })
    const fullNameLabel = intl.formatMessage({ id: 'signup.fullName.label' })
    const fullNameRequired = intl.formatMessage({ id: 'signup.fullName.required' })
    const nextBtn = intl.formatMessage({ id: 'signup.register.next' })

    return (
      <div className='signup-personal-details'>
        <Typography variant='display4' gutterBottom>{personalTitle}</Typography>
        <p>{personalText}</p>
        <FormField
          className='signup-input'
          id='signup-fullname'
          testid='signup-fullname'
          label={formLabel}
          placeholder={fullNameLabel}
          required
          name='fullName'
          onChange={this.handleChange}
          value={form.fullName}
          rules={[
            { rule: form.fullName.length, message: fullNameRequired },
          ]}
          showerrors={`${showErrors}`}
        />
        <FormField
          required
          className='signup-input'
          id='signup-email'
          testid='signup-email'
          placeholder={emailLabel}
          name='email'
          onChange={this.handleChange}
          value={form.email}
          rules={[
            { rule: isValidEmail(form.email), message: emailTypeError },
          ]}
          showerrors={`${showErrors}`}
          disabled={!_isEmpty(invitation) && !invitation.isRegistered}
        />
        <FormField
          required
          className='signup-input'
          id='signup-email-confirmation'
          testid='signup-email-confirmation'
          placeholder={confirmEmailLabel}
          name='confirmEmail'
          onChange={this.handleChange}
          value={form.confirmEmail}
          rules={[
            { rule: isValidEmail(form.confirmEmail), message: emailTypeError },
            { rule: form.confirmEmail === form.email, message: confirmEmailTypeError },
          ]}
          showerrors={`${showErrors}`}
          disabled={!_isEmpty(invitation) && !invitation.isRegistered}
        />
        <FormField
          required
          className='signup-input'
          id='signup-phoneNumber'
          testid='signup-phonenumber'
          placeholder={phoneNumberLabel}
          name='phoneNumber'
          onChange={this.handleChange}
          value={form.phoneNumber}
          rules={[
            { rule: isValidPhoneNumber(form.phoneNumber), message: phoneNumberTypeError },
          ]}
          showerrors={`${showErrors}`}
        />
        <div className='signup-checkboxes'>
          <Checkbox
            value='terms'
            id='signup-terms'
            testid='signup-terms'
            checked={form.terms}
            onChange={this.handleCheckboxChange('terms')}
            label={
              <span>
                {agreeTerms1} <a id='signup-terms-link' testid='signup-terms-link' target='_blank' rel='noopener noreferrer' href='/terms' className='link checkbox-label'>
                  {agreeTerms2}
                </a>
              </span>
            }
          />
          <Checkbox
            value='privacy'
            id='signup-privacy'
            testid='signup-privacy'
            checked={form.privacy}
            onChange={this.handleCheckboxChange('privacy')}
            label={
              <span>
                {agreePrivacy1} <a id='signup-privacy-link' testid='signup-privacy-link' target='_blank' rel='noopener noreferrer' href='/privacy' className='link checkbox-label'>
                  {agreePrivacy2}
                </a>
              </span>
            }
          />
        </div>
        <Button
          className='signup-submit'
          id='personal-submit-btn'
          testid='personal-submit-btn'
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
          disabled={!form.email || !form.confirmEmail || !form.fullName || !form.phoneNumber || !form.terms || !form.privacy || errors.length > 0 || ui.loading}
        >
          {nextBtn}
        </Button>
      </div>
    )
  }
}

PersonalDetails.propTypes = {
  intl: object.isRequired,
  ui: object.isRequired,
  nextStep: func.isRequired,
  goToTerms: func.isRequired,
  goToPrivacy: func.isRequired,
  invitation: object.isRequired,
}

export default PersonalDetails
