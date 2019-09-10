import React, { Component } from 'react'
import { object, array, func } from 'prop-types'
import firstApp from 'assets/api_account.svg'
import { FormattedMessage, injectIntl } from 'react-intl'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import CircularProgress from '@material-ui/core/CircularProgress'
import Card from 'components/Card'
import AppCard from 'components/AppCard'
import apiDefaultHeader from 'assets/graphic_placeholder.svg'
import circleCaretRight from 'assets/circle_caret_right.svg'
import ModalSplit from 'components/ModalSplit'
import CreateApp from './CreateApp'
import { Typography } from '@material-ui/core'
import classnames from 'classnames'

class AppsPage extends Component {
  state = {
    modalOpen: false,
  }

  componentDidMount () {
    const { organizations } = this.props.user
    const organizationId = organizations && organizations.length ? organizations[0].id : null
    if (organizationId) this.props.fetchApps(organizationId)
  }

  getExploreBlocks = () => [
    {
      title: 'appsPage.explore.block1.title',
      content: 'appsPage.explore.block1.content',
      img: this.props.theme.gettingStarted || apiDefaultHeader,
      action: 'appsPage.explore.block.action',
      route: '/docs/started',
    },
    {
      title: 'appsPage.explore.block2.title',
      content: 'appsPage.explore.block2.content',
      img: this.props.theme.walletApp || apiDefaultHeader,
      route: '/wallet',
      disabled: true,
    },
    {
      title: 'appsPage.explore.block3.title',
      content: 'appsPage.explore.block3.content',
      img: this.props.theme.apiReferences || apiDefaultHeader,
      route: '/api-references',
    },
  ]

  navigate = route => () => this.props.history.push(route)

  openModal = (open) => () => {
    this.setState({ modalOpen: open })
  }

  render () {
    const { apps, intl, ui, history, theme, user, subscriptions, createApp, fetchApiSubscriptions } = this.props
    const { modalOpen } = this.state
    const organization = user.organizations && user.organizations.length > 0 ? user.organizations[0] : null

    const rightTitle = intl.formatMessage({ id: 'createApp.title' })
    const rightSubtitle = intl.formatMessage({ id: 'createApp.content' })
    return (
      <div className='apps-container'>
        {apps.length > 0 && !ui.loading &&
          <div className='section-light-grey overview-section'>
            <Typography variant='display3' gutterBottom className='section-title'><FormattedMessage id='appsPage.overview' /></Typography>
            <div className='section-content'>
              <div className='app-cards'>
                <Card
                  scope='apps'
                  children={
                    apps.map(app => (
                      <AppCard key={app.id} history={history} app={app} organization={organization} />
                    ))
                  }
                  creator={
                    <div className='app-card app-creator' testid='create-app-btn' onClick={this.openModal(true)}>
                      <AddIcon className='app-creator-icon' />
                    </div>
                  }
                />
              </div>
            </div>
          </div>}
        {apps.length === 0 && !ui.loading &&
          <div className='first-app'>
            <img className='create-app-image' src={theme.firstApp || firstApp} />
            <Typography variant='display3' className='create-app-title'>{<FormattedMessage id='appsPage.createApp' />}</Typography>
            <Button variant='fab' color='secondary' aria-label='Add' className='create-app-button' testid='create-app-btn' onClick={this.openModal(true)}>
              <AddIcon />
            </Button>
          </div>}
        <div className='explore-section'>
          <div className='explore-wrapper'>
            <Typography variant='display1' gutterBottom className='explore-section-title'>{<FormattedMessage id='appsPage.explore.title' />}</Typography>
            <div className='explore-blocks-container'>
              {this.getExploreBlocks().map((block, idx) =>
                <div key={`explore-block-${idx}`} className='explore-block'>
                  <div className='explore-block-header'>
                    <img src={block.img} />
                  </div>
                  <Typography variant='display1' gutterBottom className='explore-block-title'><FormattedMessage id={block.title} /></Typography>
                  <p><FormattedMessage id={block.content} /></p>
                  <div className='explore-block-footer'>
                    <div className={classnames('explore-block-action', { disabled: block.disabled })} testid='explore-docs-btn' onClick={this.navigate(block.route)}>
                      <img src={circleCaretRight} />
                      <span><FormattedMessage id={`appsPage.explore.block.${block.disabled ? 'disabled' : 'action'}`} /></span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <ModalSplit
          open={modalOpen}
          onClose={this.openModal(false)}
          component={
            <CreateApp
              user={user}
              organization={organization}
              subscriptions={subscriptions}
              createApp={createApp}
              fetchApiSubscriptions={fetchApiSubscriptions}
              closeModal={this.openModal(false)}
            />
          }
          rightTitle={rightTitle}
          rightSubtitle={rightSubtitle}
          isApps
        />
        {ui.loading &&
          <div className='apps-loading'>
            <CircularProgress className='apps-loading-circle' />
          </div>}
      </div>
    )
  }
}

AppsPage.propTypes = {
  /**
   * `react-intl` formatting API
   * See {@link https://github.com/yahoo/react-intl/wiki/API#injection-api}
   */
  intl: object.isRequired,
  /**
   * Fetch all existing Apps
   */
  fetchApps: func.isRequired,
  /**
   * Create a new App
   */
  createApp: func.isRequired,
  /**
   * Logged in user
   */
  user: object.isRequired,
  /**
   * User Apps
   */
  apps: array.isRequired,
  /**
   * Browser history session
   */
  history: object.isRequired,
  /**
   * AppsPage UI state
   */
  ui: object.isRequired,
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
}

export default injectIntl(AppsPage)
