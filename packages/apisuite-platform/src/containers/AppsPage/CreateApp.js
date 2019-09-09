import React, { Component, Fragment } from 'react'
import { func, object } from 'prop-types'
import Button from '@material-ui/core/Button'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import { FormattedMessage, injectIntl } from 'react-intl'
import manageSubscriptions from 'assets/manage_subscriptions.svg'
import MultiSelect from 'components/MultiSelect'

const initialState = {
  name: '',
  description: '',
  iconURL: '',
  publicURL: '',
  redirectURLs: '',
  // policyURL: ''
}

class CreateApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      showErrors: false,
      form: props.app || initialState,
      errors: [],
      step: props.app ? 2 : 1,
      subscribed: [],
    }
  }

  componentDidMount () {
    // Fetch API Subscriptions if user is validated
    if (this.props.organization.state !== 'NON_VALIDATED') {
      this.props.fetchApiSubscriptions()
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { app, subscriptions } = nextProps
    if (app && this.props.subscriptions !== subscriptions) {
      this.setState({ subscribed: subscriptions.products.filter(sub => app.productIds.includes(sub.id)) })
    }
  }

  handleSubmit = (e) => {
    const { errors, form, step, subscribed } = this.state
    const { name, description, redirectURLs, iconURL, publicURL } = form
    const { organization, app } = this.props
    const organizationId = organization.id
    const isValidated = organization.state !== 'NON_VALIDATED'

    if (!errors.length) {
      if (step === 1) {
        this.setState({ step: step + 1 })
        return
      }

      if (step === 2) {
        const data = {
          name,
          ...(description && description.length && { description }),
          ...(iconURL && iconURL.length && { iconURL }),
          publicURL,
          // Should be upgraded to multi-redirectURLs past v1
          redirectURLs: [redirectURLs],
          productIds: subscribed.map(s => s.id),
        }

        if (this.props.app) {
          // Only update if the organization is validated
          if (isValidated) this.props.updateApp(organizationId, { ...data, id: app.id })
        } else {
          this.props.createApp(organizationId, data)
        }
      }
      this.props.closeModal()
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

  handleCheckboxChange = item => event => {
    const { subscribed } = this.state
    this.setState({ subscribed: event.target.checked ? [...subscribed, item] : subscribed.filter(sub => sub.id !== item.id) })
  }

  render () {
    const { intl, subscriptions, organization, user } = this.props
    const { form, showErrors, errors, step, subscribed } = this.state

    const nameLabel = intl.formatMessage({ id: 'createApp.name.label' })
    const namePlaceholder = intl.formatMessage({ id: 'createApp.name.placeholder' })
    const nameRequired = intl.formatMessage({ id: 'createApp.name.required' })
    const descriptionPlaceholder = intl.formatMessage({ id: 'createApp.description.placeholder' })
    const publicURLLabel = intl.formatMessage({ id: 'createApp.publicURL.label' })
    const publicURLError = intl.formatMessage({ id: 'createApp.publicURL.required' })
    const clientURLPlaceholder = intl.formatMessage({ id: 'createApp.clientURL.placeholder' })
    // const policyURLPlaceholder = intl.formatMessage({ id: 'createApp.policyURL.placeholder' })
    const redirectURLLabel = intl.formatMessage({ id: 'createApp.redirectURL.label' })
    const redirectURLPlaceholder = intl.formatMessage({ id: 'createApp.redirectURL.placeholder' })
    const logoURLLabel = intl.formatMessage({ id: 'createApp.logoURL.label' })
    const logoURLPlaceholder = intl.formatMessage({ id: 'createApp.logoURL.placeholder' })
    const nextLabel = intl.formatMessage({ id: 'createApp.actions.next' })
    const submitLabel = intl.formatMessage({ id: 'createApp.actions.submit' })
    const apiSubscriptionsLabel = intl.formatMessage({ id: 'createApp.apiSubscriptions.label' })
    // User is validated to subscribe to APIs
    subscriptions.products.sort((p1, p2) => p1.brand_id - p2.brand_id)
    const subscriptionsToShow = subscriptions.products.filter(s => s.isSubscribed)
    const isValidated = organization.state !== 'NON_VALIDATED'

    return (
      <div className='page-content-wrapper create-app-container'>
        <div className='create-app-wrapper'>
          {step === 1 &&
            <>
              <FormField
                required
                className='create-app-input'
                id='app-name'
                testid='app-name'
                name='name'
                label={nameLabel}
                placeholder={namePlaceholder}
                onChange={this.handleChange}
                value={form.name}
                InputLabelProps={{ shrink: true }}
                rules={[
                  { rule: form.name.length, message: nameRequired },
                ]}
                showerrors={`${showErrors}`}
              />
              <FormField
                className='create-app-input'
                id='app-description'
                testid='app-description'
                name='description'
                multiline
                rows={5}
                placeholder={descriptionPlaceholder}
                onChange={this.handleChange}
                value={form.description}
                InputLabelProps={{ shrink: true }}
              />
              <FormField
                className='create-app-input'
                id='app-client-uri'
                testid='app-client-uri'
                name='publicURL'
                label={publicURLLabel}
                placeholder={clientURLPlaceholder}
                onChange={this.handleChange}
                value={form.publicURL}
                InputLabelProps={{ shrink: true }}
                rules={[
                  { rule: form.publicURL ? isValidURL(form.publicURL) : true, message: publicURLError },
                ]}
                showerrors={`${showErrors}`}
              />
              {/* <FormField
                className='create-app-input'
                id='app-policy-uri'
                testid='app-policy-uri'
                name='policyURL'
                fullWidth
                placeholder={policyURLPlaceholder}
                onChange={this.handleChange}
                value={form.policyURL}
                rules={[
                  { rule: isValidURL(form.policyURL), message: publicURLError }
                ]}
                showerrors={`${showErrors}`}
              /> */}
              <FormField
                required
                className='create-app-input'
                id='app-redirect-uri'
                testid='app-redirect-uri'
                name='redirectURLs'
                label={redirectURLLabel}
                placeholder={redirectURLPlaceholder}
                onChange={this.handleChange}
                value={form.redirectURLs}
                InputLabelProps={{ shrink: true }}
                rules={[
                  { rule: isValidURL(form.redirectURLs), message: publicURLError },
                ]}
                showerrors={`${showErrors}`}
              />
              <FormField
                className='create-app-input'
                id='app-logo-uri'
                testid='app-logo-uri'
                name='iconURL'
                label={logoURLLabel}
                placeholder={logoURLPlaceholder}
                onChange={this.handleChange}
                value={form.iconURL}
                InputLabelProps={{ shrink: true }}
                rules={[
                  { rule: form.iconURL ? isValidURL(form.iconURL) : true, message: publicURLError },
                ]}
                showerrors={`${showErrors}`}
              />

            </>}
          {step === 2 && subscriptionsToShow &&
            <>
              <MultiSelect
                expanded={isValidated}
                disabled={!isValidated || subscriptionsToShow.length === 0}
                label={apiSubscriptionsLabel}
                options={subscriptionsToShow.filter(sub => sub.version).map(sub => ({ id: sub.id, name: sub.longname }))}
                onChange={this.handleCheckboxChange}
                selected={subscribed}
              />

              {(!isValidated || subscriptionsToShow.length === 0) &&
                <>
                  <div className='create-app-subscriptions'>
                    <FormattedMessage
                      id='createApp.apiSubscriptions.content'
                      values={{
                        userName: (
                          <span>{user.fullName}</span>
                        ),
                        apiSubscriptions: (
                          <strong>
                            <FormattedMessage
                              id='createApp.apiSubscriptions.label'
                            />
                          </strong>
                        ),
                      }}
                    />
                  </div>

                  <div className='create-app-note'>
                    <FormattedMessage id='createApp.apiSubscriptions.note' />
                    <img className='manage-subscriptions-image' src={manageSubscriptions} />
                  </div>
                </>}
            </>}

          {isValidated &&
            <div className='api-subscriptions-help'>
              <FormattedMessage id='createApp.subscriptions.help' /> <a className='link' testid='manage-subscriptions-link' href='/api-subscriptions'>
                <FormattedMessage id='createApp.subscriptions.link' />
              </a>
            </div>}

          <div className='create-app-actions'>
            <Button
              className='create-app-submit'
              testid='create-app-submit-btn'
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              disabled={(step === 1 && (!form.name || !form.redirectURLs)) || errors.length > 0}
            >
              {step === 1 ? nextLabel : submitLabel}
            </Button>
            {!isValidated &&
              <div className='create-app-help'>
                <FormattedMessage id='createApp.actions.help' /> <a className='create-app-link' testid='create-app-link' href='/docs'>
                  <FormattedMessage id='createApp.actions.link' />
                </a>.
              </div>}
          </div>
        </div>
      </div>
    )
  }
}

CreateApp.propTypes = {
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Create App action
   */
  createApp: func.isRequired,
  /**
   * Update App action
   */
  updateApp: func,
  /**
   * Logged in User object
   */
  user: object.isRequired,
  /**
   * User organization object
   */
  organization: object.isRequired,
  /**
   * App to be updated
   */
  app: object,
  /**
   * Closes Create App modal
   */
  closeModal: func,
  /**
   * User API Subscriptions
   */
  subscriptions: object.isRequired,
  /**
   * Fetch user API Subscriptions
   */
  fetchApiSubscriptions: func.isRequired,
}

export default injectIntl(CreateApp)
