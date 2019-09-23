import React, { Component } from 'react'
import { object, func, array } from 'prop-types'
import FormField, { parseErrors, isValidURL } from 'components/FormField'
import DialogBox from 'components/DialogBox'
import Button from '@material-ui/core/Button'
import LinkIcon from '@material-ui/icons/Link'
import Badge from 'components/Badge'
import classnames from 'classnames'
import { organizationStates } from 'constants/global'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import ModalSplit from 'components/ModalSplit'
import CreateApp from './CreateApp'

class AppDetail extends Component {
  state = {
    app: {
      name: '',
      description: '',
      iconURL: '',
      publicURL: '',
      redirectURLs: '',
      // policyURL: ''
      clientId: '',
      clientSecret: '',
      container: '',
    },
    showErrors: false,
    deleteConfirmationOpen: false,
    errors: [],
    modalOpen: false,
  }

  componentDidMount () {
    const { organizations } = this.props
    const organizationId = organizations && organizations.length ? organizations[0].id : null
    const { appId } = this.props.match.params
    if (organizationId) this.props.getApp(organizationId, appId)
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    if (nextProps.app !== this.props.app) {
      if (nextProps.app.redirectURLs) {
        this.setState({ app: { ...nextProps.app, redirectURLs: nextProps.app.redirectURLs[0] } })
      }
    }
  }

  navigate = route => () => this.props.history.push(route)

  handleChange = ({ target }, errors) => {
    this.setState({
      app: { ...this.state.app, [target.name]: target.value },
      errors: parseErrors(target, errors, this.state.errors),
    })
  }

  saveApp = () => {
    const { app, errors } = this.state
    const organizationId = this.props.organizations[0].id
    if (!organizationId) return

    if (app.name && app.redirectURLs.length && !errors.length) {
      const data = {
        id: app.id,
        name: app.name,
        description: app.description,
        iconURL: app.iconURL,
        publicURL: app.publicURL,
        redirectURLs: [app.redirectURLs],
      }
      this.props.updateApp(organizationId, data)
    } else {
      this.setState({
        showErrors: true,
      })
    }
  }

  toggleDeleteConfirmation = () =>
    this.setState({
      deleteConfirmationOpen: !this.state.deleteConfirmationOpen,
    })

  deleteConfirmationContent = () => (
    <div>
      <FormattedMessage id='app.delete.text' />
      <br />
      <strong><FormattedMessage id='app.delete.subtext' /></strong>
    </div>
  )

  deleteApp = () => {
    const organizationId = this.props.organizations[0].id
    const { appId } = this.props.match.params
    if (organizationId) this.props.deleteApp(organizationId, appId)
  }

  openAppSubscriptionsModal = (open) => () => {
    this.setState({ modalOpen: open })
  }

  render () {
    const { intl, organizations, user, createApp, updateApp, fetchApiSubscriptions, subscriptions } = this.props
    const { app, showErrors, deleteConfirmationOpen, errors, modalOpen } = this.state

    const splitName = app.name.split(' ')
    const appInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)
    const creationDate = moment(app.createdAt).format('MMMM Do, YYYY')

    const appNameLabel = intl.formatMessage({ id: 'app.name.label' })
    const appNameRequired = intl.formatMessage({ id: 'app.name.required' })
    const appDescriptionLabel = intl.formatMessage({ id: 'app.description.label' })
    const appPublicURLLabel = intl.formatMessage({ id: 'app.publicUrl.label' })
    const appPublicURLRequired = intl.formatMessage({ id: 'app.publicUrl.required' })
    const appRedirectURLLabel = intl.formatMessage({ id: 'app.redirectUrl.label' })
    const appRedirectURLRequired = intl.formatMessage({ id: 'app.redirectUrl.required' })
    // const appPolicyURLLabel = intl.formatMessage({id: 'app.policyUrl.label'})
    const appLogoURLLabel = intl.formatMessage({ id: 'app.logoUrl.label' })
    const urlTypeError = intl.formatMessage({ id: 'app.url.typeError' })
    const accessDetailsTitle = intl.formatMessage({ id: 'app.accessDetails.title' })
    const appClientIdLabel = intl.formatMessage({ id: 'app.clientID.label' })
    const appClientSecretLabel = intl.formatMessage({ id: 'app.clientSecret.label' })
    const appContainerLabel = intl.formatMessage({ id: 'app.container.label' })
    const rightTitle = intl.formatMessage({ id: 'createApp.title' })
    const rightSubtitle = intl.formatMessage({ id: 'createApp.content' })

    const organization = organizations && organizations.length > 0 ? user.organizations[0] : null
    const organizationState = organization ? organization.state : null
    const appScopes = app.scopes ? Array.from(new Set(app.scopes.map(s => s.scope.name))) : []

    return (
      <div className='app-detail-container' id='app-settings'>
        <div className='app-section'>
          <div className='left-container app-wrapper'>
            <FormField
              bigfont='true'
              id='app-name'
              testid='app-detail-name'
              className='app-name'
              label={appNameLabel}
              name='name'
              onChange={this.handleChange}
              value={app.name}
              rules={[
                { rule: app.name.length, message: appNameRequired },
              ]}
              showerrors={`${showErrors}`}
            />
            <FormField
              multiline
              rows={5}
              id='app-description'
              testid='app-detail-description'
              className='app-description'
              label={appDescriptionLabel}
              name='description'
              onChange={this.handleChange}
              value={app.description || ''}
              showerrors={`${showErrors}`}
            />
            <FormField
              id='app-public-url'
              testid='app-detail-public-url'
              className='app-public-url'
              label={appPublicURLLabel}
              name='publicURL'
              backgroundcolor='blue'
              startadornment={<LinkIcon style={{ fill: '#fff' }} className='adornement-icon start' />}
              onChange={this.handleChange}
              value={app.publicURL}
              rules={[
                { rule: app.publicURL ? isValidURL(app.publicURL) : true, message: appPublicURLRequired },
              ]}
              showerrors={`${showErrors}`}
            />
          </div>
          <div className='right-container'>
            <div className='app-icon' style={{ ...(isValidURL(app.iconURL) && { backgroundImage: `url(${app.iconURL})` }) }}>
              {!isValidURL(app.iconURL) && <span>{appInitials}</span>}
            </div>
            <div className='app-details'>
              <div className='detail-title'>{<FormattedMessage id='app.status' />}</div>
              <div className='detail-value'>
                <div className={classnames(
                  'status-badge',
                  organizationState ? organizationStates[organizationState].slug : null
                )}
                />
                {organizationState ? organizationStates[organizationState].sandboxtext : ''}
              </div>

              <div className='detail-title'>{<FormattedMessage id='app.author' />}</div>
              <div className='detail-value underline'>{user.fullName}</div>

              <div className='detail-title'>{<FormattedMessage id='app.creationDate' />}</div>
              <div className='detail-value'>{creationDate}</div>

              <div className='detail-title actions'>{<FormattedMessage id='app.actions' />}</div>
              <div className='buttons-container'>
                <Button
                  id='save-app-btn'
                  testid='save-app-btn'
                  className='action-button gradient'
                  variant='outlined'
                  disabled={!app.name || !app.redirectURLs.length || errors.length > 0}
                  onClick={this.saveApp}
                >
                  <FormattedMessage id='app.actions.save' />
                </Button>
                {/* <Button
                  id='publish-app-button'
                  className='action-button'
                  variant='outlined'
                  onClick={this.publishApp}
                >
                  <FormattedMessage id='app.actions.publish' />
                </Button> */}
              </div>
            </div>
          </div>
        </div>

        <div className='separator' id='access-details'>{accessDetailsTitle}</div>
        <div className='app-section access-details'>
          <div className='left-container'>
            <FormField
              disabled
              id='app-client-id'
              testid='app-detail-client-id'
              className='app-client-id'
              label={appClientIdLabel}
              name='clientId'
              onChange={this.handleChange}
              value={app.clientId}
            />
            <FormField
              disabled
              id='app-client-secret'
              testid='app-detail-client-secret'
              className='app-client-secret'
              label={appClientSecretLabel}
              name='clientSecret'
              onChange={this.handleChange}
              value={app.clientSecret}
            />
            <FormField
              disabled
              id='app-container'
              testid='app-detail-container'
              className='app-container'
              label={appContainerLabel}
              name='container'
              onChange={this.handleChange}
              value={app.container}
            />
            <FormField
              id='app-redirect-url'
              testid='app-detail-redirect-url'
              className='app-redirect-url'
              label={appRedirectURLLabel}
              name='redirectURLs'
              startadornment={<LinkIcon className='adornement-icon start' />}
              onChange={this.handleChange}
              value={app.redirectURLs}
              rules={[
                { rule: isValidURL(app.redirectURLs), message: appRedirectURLRequired },
              ]}
              showerrors={`${showErrors}`}
            />
            {/* <FormField
              id='app-policy-url'
              testid='app-detail-policy-url'
              className='app-policy-url'
              label={appPolicyURLLabel}
              name='policyURL'
              startadornment={<LinkIcon className='adornement-icon start' />}
              onChange={this.handleChange}
              value={app.policyURL}
              rules={[
                {rule: isValidURL(app.policyURL), message: urlTypeError}
              ]}
              showerrors={`${showErrors}`}
            /> */}
            <FormField
              id='app-logo-url'
              testid='app-detail-logo-url'
              className='app-logo-url'
              label={appLogoURLLabel}
              name='iconURL'
              startadornment={<LinkIcon className='adornement-icon start' />}
              onChange={this.handleChange}
              value={app.iconURL || ''}
              rules={[
                { rule: app.iconURL ? isValidURL(app.iconURL) : true, message: urlTypeError },
              ]}
              showerrors={`${showErrors}`}
            />
          </div>
          <div className='right-container'>
            <div className='additional-options'>
              <div className='option-wrapper'>
                <div className='options-title'>{<FormattedMessage id='app.apiSubscriptions' />}</div>
                <div className='option-link' id='manage-subscriptions-btn' testid='manage-subscriptions-btn' onClick={this.openAppSubscriptionsModal(true)}>
                  {<FormattedMessage id='app.apiSubscriptions.manage' />}
                </div>
              </div>
              {appScopes && appScopes.length > 0 && (
                <div className='option-wrapper'>
                  <div className='options-title'>{<FormattedMessage id='app.scopes' />}</div>
                  <div className='scopes' id='app-scopes'>
                    {appScopes.map((scope, idx) => (
                      <Badge key={idx} text={scope} type='inactive space' />
                    ))}
                  </div>
                </div>
              )}
              <div className='option-wrapper'>
                <div className='options-title'>{<FormattedMessage id='app.additionalActions' />}</div>
                <div className='option-link disabled-link'>{<FormattedMessage id='app.additionalActions.transfer' />}</div>
                <div className='option-link' id='delete-app-trigger' testid='delete-app-btn' onClick={this.toggleDeleteConfirmation}>
                  {<FormattedMessage id='app.additionalActions.delete' />}
                </div>
              </div>

            </div>
          </div>
        </div>
        <DialogBox
          id='delete-app-dialog'
          open={deleteConfirmationOpen}
          content={this.deleteConfirmationContent()}
          actions={[
            <Button
              key='delete-app-cancel'
              id='delete-app-cancel'
              testid='delete-app-cancel-btn'
              variant='outlined'
              onClick={this.toggleDeleteConfirmation}
            >
              <FormattedMessage id='app.delete.cancel' />
            </Button>,
            <Button
              key='delete-app-confirm'
              id='delete-app-confirm'
              testid='delete-app-confirm-btn'
              variant='contained'
              color='primary'
              onClick={this.deleteApp}
            >
              <FormattedMessage id='app.delete.remove' />
            </Button>,
          ]}
        />
        <ModalSplit
          open={modalOpen}
          onClose={this.openAppSubscriptionsModal(false)}
          component={
            <CreateApp
              user={user}
              organization={organization}
              subscriptions={subscriptions}
              createApp={createApp}
              updateApp={updateApp}
              fetchApiSubscriptions={fetchApiSubscriptions}
              closeModal={this.openAppSubscriptionsModal(false)}
              app={app}
            />
          }
          rightTitle={rightTitle}
          rightSubtitle={rightSubtitle}
          isApps
        />
      </div>
    )
  }
}

AppDetail.propTypes = {
  /**
   * Browser history session
   */
  history: object.isRequired,
  /**
   * Object containing information about
   * how a `<Route />` matched the URL.
   * See {@link https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/api/match.md}
   */
  match: object.isRequired,
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Get an App by ID
   */
  getApp: func.isRequired,
  /**
   * Update App action
   */
  updateApp: func.isRequired,
  /**
   * Delete App action
   */
  deleteApp: func.isRequired,
  /**
   * Selected App object
   */
  app: object.isRequired,
  /**
   * User object
   */
  user: object.isRequired,
  /**
   * User Organizations
   */
  organizations: array.isRequired,
  /**
   * Create an App
   */
  createApp: func.isRequired,
  /*
   * User API Subscriptions
   */
  subscriptions: object.isRequired,
  /**
   * Fetch user API Subscriptions
   */
  fetchApiSubscriptions: func.isRequired,
}

export default AppDetail
