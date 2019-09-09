import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import MenuItem from '@material-ui/core/MenuItem'
import { Typography } from '@material-ui/core'

const roles = [
  { value: '1', description: 'Administrator' },
  { value: '2', description: 'Developer' },
  { value: '3', description: 'Tester' },
  { value: '4', description: 'Sales' },
]

class OrganisationDetails extends Component {
  state = {
    showErrors: false,
    form: {
      name: '',
      vat: '',
      website: '',
      role: '1',
    },
    errors: [],
  }

  handleSubmit = e => {
    const { errors, form } = this.state

    if (!errors.length) {
      this.props.nextStep(form)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  handleSkip = e => {
    this.props.skipStep()
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      form: { ...this.state.form, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  render () {
    const { intl, ui } = this.props
    const { form, showErrors, errors } = this.state

    const organisationTitle = intl.formatMessage({ id: 'signup.organisation.title' })
    const organisationText = intl.formatMessage({ id: 'signup.organisation.text' })
    const organisationLabel = intl.formatMessage({ id: 'signup.organisation.label' })
    const vatLabel = intl.formatMessage({ id: 'signup.organisation.vat' })
    const websiteLabel = intl.formatMessage({ id: 'signup.organisation.website' })
    const websiteTypeError = intl.formatMessage({ id: 'signup.organisation.website.typeError' })
    const roleLabel = intl.formatMessage({ id: 'signup.organisation.role' })
    const nextBtn = intl.formatMessage({ id: 'signup.register.next' })
    const skipBtn = intl.formatMessage({ id: 'signup.register.skip' })

    return (
      <div className='signup-personal-details'>
        <Typography variant='display4' gutterBottom>{organisationTitle}</Typography>
        <p>{organisationText}</p>
        <FormField
          className='signup-input'
          id='organisation-name'
          testid='signup-organisation-name'
          placeholder={organisationLabel}
          name='name'
          onChange={this.handleChange}
          value={form.name}
        />
        <FormField
          className='signup-input'
          id='vat'
          testid='signup-vat'
          placeholder={vatLabel}
          name='vat'
          onChange={this.handleChange}
          value={form.vat}
        />
        <FormField
          className='signup-input'
          id='website'
          testid='signup-website'
          placeholder={websiteLabel}
          name='website'
          onChange={this.handleChange}
          value={form.website}
          rules={[
            { rule: form.website ? isValidURL(form.website) : true, message: websiteTypeError },
          ]}
          showerrors={`${showErrors}`}
        />
        <FormField
          disabled
          label={roleLabel}
          className='signup-input'
          id='role'
          testid='signup-role'
          name='role'
          type='select'
          fullWidth
          usevalue='true'
          value={form.role}
          data={roles}
          onChange={this.handleChange}
          showerrors={`${showErrors}`}
          inputlabelprops={{ shrink: true }}
        >
          {roles.map((p, idx) => (
            <MenuItem
              key={idx}
              value={p.value}
            >
              {p.description}
            </MenuItem>
          ))}
        </FormField>
        <div className='signup-actions'>
          <Button
            className='signup-submit'
            testid='organisation-submit-btn'
            variant='contained'
            color='primary'
            onClick={this.handleSubmit}
            disabled={!form.name || !form.vat || !form.website || !form.role || errors.length > 0 || ui.loading}
          >
            {nextBtn}
          </Button>
          <Button
            id='skip-button'
            testid='organisation-skip-btn'
            className='signup-submit'
            variant='outlined'
            onClick={this.handleSkip}
            disabled={ui.loading}
          >
            {skipBtn}
          </Button>
        </div>
      </div>
    )
  }
}

OrganisationDetails.propTypes = {
  intl: PropTypes.object.isRequired,
  ui: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
  previousStep: PropTypes.func.isRequired,
  skipStep: PropTypes.func.isRequired,
}

export default OrganisationDetails
