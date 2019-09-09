import React, { Component, Fragment } from 'react'
import { object, func, array } from 'prop-types'
import Card from 'components/Card'
import Badge from 'components/Badge'
import apiReferenceIcon from 'assets/api_reference.svg'
import apiDefaultHeader from 'assets/graphic_placeholder.svg'
// import consoleIcon from 'assets/console_icon.svg'
import { FormattedMessage } from 'react-intl'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import Button from '@material-ui/core/Button'
import ModalSplit from 'components/ModalSplit'
import CircularProgress from '@material-ui/core/CircularProgress'
import { Typography } from '@material-ui/core'
import Tooltip from '../../components/Tooltip/Tooltip'
import requireIfExists from 'util/requireIfExists'
import _uniq from 'lodash/uniq'

const availableStates = {
  notValidated: 'NON_VALIDATED',
}

class ApiSubscriptions extends Component {
  state = {
    expanded: [],
    modalOpen: false,
    subscriptions: {
      brands: [],
      products: [],
      ui: {
        loading: false,
      },
    },
  }

  componentDidMount () {
    const { organizations } = this.props.auth.user
    const organizationId = organizations && organizations.length ? organizations[0].id : null

    this.props.fetchApiSubscriptions()
    if (!this.props.apps.length && organizationId) {
      this.props.fetchApps(organizationId)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { subscriptions } = nextProps
    if (this.props.subscriptions !== subscriptions) {
      this.setState({ subscriptions: subscriptions })
    }
  }

  trySubscribe = product => event => {
    const { auth } = this.props
    const { organizations } = auth ? auth.user : null
    const { state } = (organizations && organizations.length) ? organizations[0] : null

    if (state && state !== availableStates.notValidated) {
      this.requestSandboxAccess(product.id)
    } else if (state && state === availableStates.notValidated) {
      this.setState({ modalOpen: true })
    }
  }

  openModal = open => event => {
    this.setState({ modalOpen: open })
  }

  navigate = route => event => this.props.history.push(route)

  handleExpand = menuIndex => e => {
    const { expanded } = this.state
    this.setState({ expanded: expanded.includes(`e${menuIndex}`) ? expanded.filter(o => o !== `e${menuIndex}`) : [...expanded, `e${menuIndex}`] })
  }

  renderLoading = () =>
    <div className='loading'>
      <CircularProgress className='loading-circle' />
    </div>

  requestSandboxAccess = productId => {
    const { auth } = this.props
    this.props.createApiSubscription(auth.user.organizations[0].id, [`${productId}`])
    this.setState({ modalOpen: false })
  }

  parseSubscribedApps = () => {
    const { apps } = this.props
    const { subscriptions } = this.state
    let subs = {}
    if (apps.length > 0) {
      for (let i = 0; i < subscriptions.products.length; i++) {
        let associatedApps = []
        for (let x = 0; x < apps.length; x++) {
          if (apps[x].productIds.includes(subscriptions.products[i].id)) {
            associatedApps = [...associatedApps, apps[x].id]
          }
          subs = {
            ...subs,
            [`${subscriptions.products[i].id}`]: _uniq(associatedApps),
          }
        }
      }
    }
    return subs
  }

  render () {
    const { intl, theme, apps } = this.props
    const { expanded, modalOpen, subscriptions } = this.state
    const { ui } = subscriptions
    const modalTitle = intl.formatMessage({ id: 'apiSubscriptions.modal.title' })
    const modalSubtitle = intl.formatMessage({ id: 'apiSubscriptions.modal.subtitle' })
    subscriptions && subscriptions.products && subscriptions.products.sort((p1, p2) => p1.brand_id - p2.brand_id)

    const subscribedApps = this.parseSubscribedApps()

    return (
      <div className='api-subscriptions-container'>
        <div className='api-subscriptions-wrapper'>
          {!ui.loading && subscriptions && subscriptions.products && subscriptions.brands &&
            <>
              <Typography variant='display3' gutterBottom><FormattedMessage id='apiSubscriptions.title' /></Typography>
              <div className='api-subscriptions-list'>
                <Card
                  scope='api-subscriptions' children={
                    subscriptions.products.filter(sub => sub.version).map((product, idx) => (
                      <div className='api-subscription'>
                        <ExpansionPanel
                          className='expansion-panel' expanded={expanded.includes(`e${idx}`)}
                          onChange={this.handleExpand(idx)} classes={{ root: 'expansion-panel-root' }}
                        >
                          <ExpansionPanelSummary
                            expandIcon={<ChevronRightIcon />} classes={{
                              expandIcon: `expand-icon ${expanded.includes(`e${idx}`) ? 'expanded' : ''}`,
                              content: 'expansion-summary-content',
                              expanded: 'expansion-summary-expanded',
                            }}
                          >
                            <div className='header-container'>
                              <div>
                                <img
                                  src={(theme.name === 'bnpp' && requireIfExists(subscriptions.brands.find(br => br.id === product.brand_id).logo)) || apiDefaultHeader}
                                />
                                <Typography variant='display1'>
                                  {product.longname}
                                </Typography>
                                <div className='badges-wrapper'>
                                  {product.isSubscribed && <Badge type='teal' text={product.version} />}
                                </div>
                              </div>
                              <div className='api-icons'>
                                <div className='api-action'>
                                  {expanded.includes(`e${idx}`) && <FormattedMessage id='apiSubscriptions.apiReference.label' />}
                                  <Tooltip
                                    isLoggedIn
                                    content={intl.formatMessage({ id: 'apiSubscriptions.apiReference.label' })}
                                  >
                                    <img
                                      className='api-action-icon' src={apiReferenceIcon}
                                      testid='api-action-icon'
                                      onClick={this.navigate('/api-references')}
                                    />
                                  </Tooltip>
                                </div>
                              </div>
                            </div>
                          </ExpansionPanelSummary>
                          <ExpansionPanelDetails>
                            <div className='api-subscription-detail'>
                              <div className='detail-text'>
                                <FormattedMessage
                                  id={`apiSubscriptions.content.${product.isSubscribed ? 'subscribed' : 'unsubscribed'}`}
                                  values={{
                                    status: (
                                      product.isSubscribed &&
                                        <FormattedMessage
                                          id={subscribedApps[product.id] && subscribedApps[product.id].length > 0 ? 'apiSubscriptions.content.subscribed.hasapps' : 'apiSubscriptions.content.subscribed.noapps'}
                                        />
                                    ),
                                  }}
                                />
                                {product.isSubscribed &&
                                  <div className='consumer-apps'>
                                    {subscribedApps[product.id] && subscribedApps[product.id].map((appId, idx) => {
                                      const currApp = apps.find(app => app.id === appId)
                                      const splitName = currApp.name.split(' ')
                                      const appInitials = splitName.length >= 2 ? `${splitName[0].charAt(0)}${splitName[1].charAt(0)}` : splitName[0].slice(0, 2)
                                      return (
                                        <div key={`app-${appId}-${idx}`} className='app-circle'><span>{appInitials}</span></div>
                                      )
                                    })}
                                  </div>}
                              </div>
                              <Button
                                id='api-subscription-btn'
                                testid='api-subscription-btn'
                                className='api-subscription-btn'
                                variant='outlined'
                                disabled={product.isSubscribed}
                                onClick={this.trySubscribe(product)}
                              >
                                <FormattedMessage
                                  id={`apiSubscriptions.button.${product.isSubscribed ? 'subscribed' : 'unsubscribed'}`}
                                />
                              </Button>
                            </div>
                          </ExpansionPanelDetails>
                        </ExpansionPanel>
                      </div>
                    ))
                  }
                />
              </div>
            </>}
        </div>
        {ui.loading && this.renderLoading()}
        <ModalSplit
          open={modalOpen}
          onClose={this.openModal(false)}
          component={
            <div className='api-subscription-modal'>
              <FormattedMessage id='apiSubscriptions.modal.content.1' />
              <br /><br />
              <FormattedMessage id='apiSubscriptions.modal.content.2' />
              <br /><br />
              <FormattedMessage id='apiSubscriptions.modal.content.3' />
              <br /><br /><br />
              <Button
                id='api-subscription-modal-btn'
                testid='api-subscription-modal-btn'
                className='modal-btn'
                variant='outlined'
                onClick={this.openModal(false)}
              >
                <FormattedMessage id='apiSubscriptions.modal.button' />
              </Button>
            </div>
          }
          rightTitle={modalTitle}
          rightSubtitle={modalSubtitle}
        />
      </div>
    )
  }
}

ApiSubscriptions.propTypes = {
  history: object.isRequired,
  intl: object.isRequired,
  auth: object.isRequired,
  theme: object.isRequired,
  apps: array.isRequired,
  subscriptions: object.isRequired,
  fetchApiSubscriptions: func.isRequired,
  createApiSubscription: func.isRequired,
  fetchApps: func.isRequired,
}

export default ApiSubscriptions
