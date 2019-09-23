import React, { Component } from 'react'
import { object, func } from 'prop-types'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import { Link, WorkOutline, Create } from '@material-ui/icons'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'
import { organizationStates } from 'constants/global'
import certificateProvided from 'assets/certificate_provided.svg'
import moment from 'moment'

class OrganisationSection extends Component {
  state = {
    organisation: {
      id: '',
      name: '',
      description: '',
      vat: '',
      website: '',
      policyUrl: '',
      logoUrl: '',
      certificates: [],
    },
    showErrors: false,
    errors: [],
  }

  componentDidMount () {
    this.props.fetchOrganizations()
    if (!this.props.onboardingToken.token) {
      this.props.getOnboardingToken()
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.organisation !== this.props.organisation) {
      const { name, description, vat, website, policyUrl, logoUrl, id, certificates } = nextProps.organisation
      this.setState({ organisation: { name, description, vat, website, policyUrl, logoUrl, id, certificates } })
    }
  }

  handleChange = ({ target }, errors) => {
    this.setState({
      organisation: { ...this.state.organisation, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  saveOrganisation = () => {
    const { organisation, errors } = this.state

    if (!errors.length) {
      const { name, vat, website, description, policyUrl, logoUrl } = organisation
      const data = { name, vat, website, description, policyUrl, logoUrl }

      // API does not accept empty string values
      for (const key in data) {
        if (data.hasOwnProperty(key) && !data[key]) {
          data[key] = null
        }
      }
      this.props.updateOrganization(organisation.id, data)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  renewToken = () => {
    this.props.getOnboardingToken()
  }

  render () {
    const { intl, onboardingToken } = this.props
    const { organisation, showErrors, errors } = this.state

    const nameLabel = intl.formatMessage({ id: 'organisation.name.label' })
    const nameRequired = intl.formatMessage({ id: 'organisation.name.required' })
    const descriptionLabel = intl.formatMessage({ id: 'organisation.description.label' })
    const vatLabel = intl.formatMessage({ id: 'organisation.vat.label' })
    const websiteLabel = intl.formatMessage({ id: 'organisation.website.label' })
    const policyURLLabel = intl.formatMessage({ id: 'organisation.policyURL.label' })
    const logoURLLabel = intl.formatMessage({ id: 'organisation.logoURL.label' })
    const avatarTypeError = intl.formatMessage({ id: 'profile.avatarUrl.typeError' })
    const onboardingTokenLabel = intl.formatMessage({ id: 'organisation.onboardingToken.label' })
    const onboardingTokenExpiresLabel = intl.formatMessage({ id: 'organisation.onboardingToken.expires.label' })

    const organizationState = this.props.organisation ? this.props.organisation.state : null
    const organizationStateText = organizationState ? organizationStates[organizationState].name : ''
    let organisationInitials = ''

    const certificate = organisation.certificates && organisation.certificates.length > 0
      ? organisation.certificates[0] : null

    if (organisation && organisation.name) {
      const splitName = organisation.name.split(' ')
      organisationInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)
    }

    return (
      <div className='profile-container' id='organisation-settings'>
        <div className='profile-section'>
          <div className='left-container'>
            <div className='avatar' style={{ ...(isValidURL(organisation.logoUrl) && { backgroundImage: `url(${organisation.logoUrl})`, backgroundSize: 'cover' }) }}>
              {!isValidURL(organisation.logoUrl) && <span>{organisationInitials}</span>}
            </div>
            <div className='account-details'>
              <div className='detail-title'>{<FormattedMessage id='organisation.collaborationLevel' />}</div>
              <div className='detail-value'>
                {organizationStateText}
                <div className={classnames(
                  'access-level-badge',
                  organizationState ? organizationStates[organizationState].slug : null
                )}
                />
              </div>

              <div className='detail-title actions'>{<FormattedMessage id='profile.actions' />}</div>
              <Button
                id='save-organisation-btn'
                testid='save-organisation-btn'
                className='save-button gradient'
                variant='outlined'
                onClick={this.saveOrganisation}
                disabled={errors.length > 0}
              >
                <FormattedMessage id='profile.actions.save' />
              </Button>
              {
                certificate &&
                  <div className='card-container'>
                    <img className='card-image' src={certificateProvided} alt='certificate-approved' />
                    <Typography variant='display3' gutterBottom className='card-title'><FormattedMessage id='organisation.certificateProvided' /></Typography>
                    <p className='card-text'><FormattedMessage id='organisation.certificateValid' /> <b>{moment(certificate.expiration_date).format('MMMM Do, YYYY')}</b>.</p>
                  </div>
              }
            </div>
          </div>
          <div className='right-container profile-wrapper'>
            <FormField
              bigfont='true'
              nobackground={1}
              id='organisation-name'
              testid='organisation-name'
              className='organisation-name'
              label={nameLabel}
              name='name'
              onChange={this.handleChange}
              value={organisation.name}
              rules={[
                { rule: (organisation && organisation.name && organisation.name.length >= 2), message: nameRequired },
              ]}
              showerrors={`${showErrors}`}
            />
            <FormField
              multiline
              rows={4}
              id='organisation-description'
              testid='organisation-description'
              className='organisation-description'
              label={descriptionLabel}
              name='description'
              startadornment={<Create className='adornement-icon start' />}
              onChange={this.handleChange}
              value={organisation.description || ''}
              showerrors={`${showErrors}`}
            />
            <FormField
              id='organisation-vat'
              testid='organisation-vat'
              className='organisation-vat'
              label={vatLabel}
              name='vat'
              startadornment={<WorkOutline className='adornement-icon start' />}
              onChange={this.handleChange}
              value={organisation.vat}
            />
            <FormField
              id='organisation-website'
              testid='organisation-website'
              className='organisation-website'
              label={websiteLabel}
              name='website'
              startadornment={<Link className='adornement-icon start' />}
              onChange={this.handleChange}
              value={organisation.website}
              rules={[
                { rule: organisation.website ? isValidURL(organisation.website) : true, message: avatarTypeError },
              ]}
              showerrors={`${showErrors}`}
            />
            <FormField
              id='organisation-policyURL'
              testid='organisation-policyURL'
              className='organisation-policyURL'
              label={policyURLLabel}
              name='policyUrl'
              startadornment={<Link className='adornement-icon start' />}
              onChange={this.handleChange}
              value={organisation.policyUrl || ''}
              rules={[
                { rule: organisation.policyUrl ? isValidURL(organisation.policyUrl) : true, message: avatarTypeError },
              ]}
              showerrors={`${showErrors}`}
            />
            <FormField
              id='organisation-logoURL'
              testid='organisation-logoURL'
              className='organisation-logoURL'
              label={logoURLLabel}
              name='logoUrl'
              startadornment={<Link className='adornement-icon start' />}
              onChange={this.handleChange}
              value={organisation.logoUrl || ''}
              rules={[
                { rule: organisation.logoUrl ? isValidURL(organisation.logoUrl) : true, message: avatarTypeError },
              ]}
              showerrors={`${showErrors}`}
            />
            <FormField
              disabled
              id='onboarding-token'
              testid='onboarding-token'
              className='onboarding-token'
              label={onboardingTokenLabel}
              name='onboardingToken'
              onChange={this.handleChange}
              value={onboardingToken.token}
            />
            <div className='token-row'>
              <FormField
                disabled
                id='onboarding-token-expiration'
                testid='onboarding-token-expiration'
                className='onboarding-token-expiration'
                label={onboardingTokenExpiresLabel}
                name='tokenExpiresIn'
                onChange={this.handleChange}
                value={moment(onboardingToken.expiresIn).format('MMMM Do YYYY, hh:mm a')}
              />
              <Button
                id='renew-token-btn'
                testid='renew-token-btn'
                className='renew-button'
                variant='outlined'
                onClick={this.renewToken}
              >
                <FormattedMessage id='organisation.onboardingToken.renew' />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

OrganisationSection.propTypes = {
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  organisation: object,
  onboardingToken: object.isRequired,
  fetchOrganizations: func.isRequired,
  updateOrganization: func.isRequired,
  getOnboardingToken: func.isRequired,
}

export default OrganisationSection
