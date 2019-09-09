import React, { Component } from 'react'
import { object, func, array } from 'prop-types'
import Button from '@material-ui/core/Button'
import Card from 'components/Card'
import { FormattedMessage } from 'react-intl'
import CircularProgress from '@material-ui/core/CircularProgress'
import IconButton from '@material-ui/core/IconButton'
import CaretRightIcon from '@material-ui/icons/KeyboardArrowRight'
import graphicPlaceholder from 'assets/graphic_placeholder.svg'
import emptyTestdataCircle from 'assets/empty_testdata_circle.svg'
import firstApp from 'assets/api_account.svg'
import AddIcon from '@material-ui/icons/Add'
import ModalSplit from 'components/ModalSplit'
import CreateApp from '../AppsPage/CreateApp'
import classnames from 'classnames'
import { Typography } from '@material-ui/core'
import Pagination from 'components/Pagination'
import CreateTestUser from './CreateTestUser'

class TestData extends Component {
  state = {
    appModalOpen: false,
    testModalOpen: false,
    testusers: {},
    testUser: null,
    ui: {
      loading: false,
    },
  }

  componentDidMount () {
    const { testModalOpen } = this.state
    const { user: { organizations }, location: { state } } = this.props
    const organizationId = organizations && organizations.length ? organizations[0].id : null
    this.props.fetchTestData()
    if (organizationId) this.props.fetchApps(organizationId)
    this.props.fetchApiSubscriptions()
    if (state && state.testUser) {
      this.setState({ testModalOpen: true, testUser: state.testUser })
    }
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.testusers !== prevState.testusers || nextProps.ui !== prevState.ui) {
      return {
        testusers: nextProps.testusers,
        ui: nextProps.ui,
      }
    }

    return null
  }

  openAppModal = (open) => event => {
    this.setState({ appModalOpen: open })
  }

  openTestUserModal = (open) => event => {
    this.setState({ testModalOpen: open })
  }

  navigate = route => event => {
    this.props.history.push(route)
  }

  openSupport = option => e => {
    this.props.openSupportModal(option)
  }

  handleChangePage = page => {
    this.props.fetchTestData(page)
  }

  renderLoading = () =>
    <div className='testdata-loading'>
      <CircularProgress className='loading-circle' />
    </div>

  render () {
    const { apps, intl, createApp, user, theme, subscriptions, createApiSubscription, fetchApiSubscriptions } = this.props
    const { appModalOpen, testModalOpen, testusers, testUser, ui } = this.state
    const testdata = testusers.users
    const organization = user.organizations && user.organizations.length > 0 ? user.organizations[0] : null

    const rightTitle = intl.formatMessage({ id: 'createApp.title' })
    const rightSubtitle = intl.formatMessage({ id: 'createApp.content' })
    const testRightTitle = intl.formatMessage({ id: 'testData.create.title' })
    const testRightSubtitle = intl.formatMessage({ id: 'testData.create.content' })

    const hasSubscriptions = subscriptions.products.some(sub => sub.isSubscribed)

    const sandboxUnavailable = organization && organization.state
      ? (organization.state === 'NON_VALIDATED' || (organization.state !== 'NON_VALIDATED' && !hasSubscriptions))
      : true

    return (
      <div className={classnames('testdata-container', { 'fallback-bg': sandboxUnavailable })}>
        {!sandboxUnavailable && testdata && apps.length > 0 && !ui.loading && <div className='testdata-content'>
          <div className='testdata-wrapper'>
            {testdata.length > 0 &&
              <Card children={[
                <div className='testdata-list'>
                  <div className='testdata-header'><FormattedMessage id='testData.header' /></div>
                  {testdata.map((user, idx) => {
                    const splitName = user.name.split(' ')
                    const userInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)
                    // const userAccounts = this.checkAccounts(user.customerId)
                    const accountLabel = user.accounts.length > 0 ? user.accounts.length === 1 ? user.accounts[0].accountId.iban : `${user.accounts.length} ASSIGNED ACCOUNTS` : 'NO ASSIGNED ACCOUNTS'
                    return (
                      <div key={`user-${user.id}`} className='testdata-item'>
                        <div className='testuser-content'>
                          <div className='testuser-avatar'><span>{userInitials}</span></div>
                          <div className='testuser-details'>
                            <div className='testuser-name'>{user.name}</div>
                            <div className='testuser-account'>{accountLabel}</div>
                          </div>
                        </div>
                        <IconButton onClick={this.navigate(`/testdata/${user.id}`)}>
                          <CaretRightIcon />
                        </IconButton>
                      </div>
                    )
                  })}
                  <div className='testdata-footer' onClick={this.openTestUserModal(true)}>
                    <div className='add-test-user'><FormattedMessage id='testData.footer.add' /></div>
                    <AddIcon />
                  </div>
                </div>,
              ]}
              />}
            {testusers.pagination &&
              <Pagination
                items={testusers.users}
                pager={testusers.pagination}
                onChangePage={this.handleChangePage}
              />}
          </div>
          <div className='testdata-description'>
            <Typography variant='display3' gutterBottom><FormattedMessage id='testData.title' /></Typography>
            <p><FormattedMessage id='testData.intro.1' /></p>
            <p><FormattedMessage id='testData.intro.2' /></p>
            <br />
            {/* <Button
              id='propose-feature-btn'
              className='gradient gradient-light-grey'
              variant='outlined'
              onClick={this.openSupport('task')}
            >
              <FormattedMessage id='testData.proposeFeature' />
            </Button> */}
          </div>
        </div>}
        {((apps.length > 0 && sandboxUnavailable) || apps.length === 0) && !ui.loading &&
          <div className='first-app'>
            <div className='first-app-wrapper'>
              <img
                className='create-app-image'
                src={sandboxUnavailable ? emptyTestdataCircle : (theme.firstApp || firstApp)}
              />
              {sandboxUnavailable && <img className='image-placeholder' src={graphicPlaceholder} />}
            </div>
            <Typography variant='display3' className='create-app-title'>{<FormattedMessage
              id={sandboxUnavailable ? 'testData.fallback.title' : 'appsPage.createApp'}
            />}
            </Typography>
            <div className='create-app-subtitle'>{<FormattedMessage
              id={sandboxUnavailable ? 'testData.fallback.subtitle' : 'testData.createApp.subtitle'}
            />}
            </div>
            {!sandboxUnavailable &&
              <Button
                testid='create-app-btn'
                variant='fab'
                color='secondary'
                aria-label='Add'
                className='create-app-button'
                onClick={this.openAppModal(true)}
              >
                <AddIcon />
              </Button>}
          </div>}
        {organization &&
          <ModalSplit
            open={appModalOpen}
            onClose={this.openAppModal(false)}
            component={<CreateApp
              user={user}
              organization={organization}
              createApp={createApp}
              subscriptions={subscriptions}
              fetchApiSubscriptions={fetchApiSubscriptions}
              createApiSubscription={createApiSubscription}
              closeModal={this.openAppModal(false)}
            />}
            rightTitle={rightTitle}
            rightSubtitle={rightSubtitle}
            isApps
          />}
        {organization &&
          <ModalSplit
            open={testModalOpen}
            onClose={this.openTestUserModal(false)}
            component={<CreateTestUser
              organization={organization}
              testUser={testUser}
              ui={ui}
              closeModal={this.openTestUserModal(false)}
              accounts={this.props.accounts}
              createTestUser={this.props.createTestUser}
              getTestUserAccounts={this.props.getTestUserAccounts}
            />}
            rightTitle={testRightTitle}
            rightSubtitle={testRightSubtitle}
            isApps
          />}
        {ui.loading && this.renderLoading()}
      </div>
    )
  }
}

TestData.propTypes = {
  /**
   * Browser history session
   */
  history: object.isRequired,
  /**
   * Router location
   */
  location: object.isRequired,
  /**
   * Test users object
   */
  testusers: object,
  /**
   * Fetch test users
   */
  fetchTestData: func.isRequired,
  /**
   * Apps UI state
   */
  ui: object.isRequired,
  /**
   * Logged in user
   */
  user: object.isRequired,
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Triggers Support Modal
   */
  openSupportModal: func.isRequired,
  /**
   * Fetch all existing Apps
   */
  fetchApps: func.isRequired,
  /**
   * Create a new App
   */
  createApp: func.isRequired,
  /**
   * User Apps
   */
  apps: array.isRequired,
  /**
   * App theme object
   */
  theme: object.isRequired,
  /*
   * User API Subscriptions
   */
  subscriptions: object.isRequired,
  /**
   * Fetch user API Subscriptions
   */
  fetchApiSubscriptions: func.isRequired,
  /**
   * Subscribes to one or more APIs
   */
  createApiSubscription: func.isRequired,
  /**
   * List of test user account types
   */
  accounts: object.isRequired,
  /**
   * Create a new Test User
   */
  createTestUser: func.isRequired,
  /**
   * Get the list of test user account types
   */
  getTestUserAccounts: func.isRequired,
}

export default TestData
