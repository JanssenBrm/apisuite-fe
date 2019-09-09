import React, { Component } from 'react'
import { object, func } from 'prop-types'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import classnames from 'classnames'
import Overview from './Topics/Overview'
import CreatingAnAccount from './Topics/CreatingAnAccount'
import CreatingAnApp from './Topics/CreatingAnApp'
import ClientIDSecret from './Topics/ClientIDSecret'
import APIReferences from './Topics/APIReferences'
import TwoFA from './Topics/TwoFA'
import SandboxAccess from './Topics/SandboxAccess'
import StetAISP from './Topics/StetAISP'
import StetPISP from './Topics/StetPISP'
import StetConfirmingPISP from './Topics/StetConfirmingPISP'
import StetAccessEndpoint from './Topics/StetAccessEndpoint'
import Footer from 'components/Footer'
import OnboardingFlowIntro from './Topics/OnboardingFlowIntro'
import OnboardingFlowAccCreateValidate from './Topics/OnboardingFlowAccCreateValidate'
import OnboardingFlowCertUpload from './Topics/OnboardingFlowCertUpload'
import OnboardingFlowEndpoint from './Topics/OnboardingFlowEndpoint'
import OnboardingFlowCertificateValidation from './Topics/OnboardingFlowCertificateValidation'
import OnboardingFlowAPISubs from './Topics/OnboardingFlowAPISubs'
import OnboardingFlowUsingTesting from './Topics/OnboardingFlowUsingTesting'
import OnboardingFlowAddingCert from './Topics/OnboardingFlowAddingCert'
import OnboardingFlowRevoke from './Topics/OnboardingFlowRevoke'
import ProductionEndpoints from './Topics/ProductionEndpoints'
import SignatureAuthenticationScheme from './Topics/SignatureAuthenticationScheme'

const topics = [
  {
    title: 'Getting Started',
    key: 'g0',
    children: [
      { key: 'get0', title: 'Creating an Account', component: CreatingAnAccount },
      { key: 'get1', title: 'Creating an Application', component: CreatingAnApp },
      { key: 'get2', title: 'Client ID / Secret', component: ClientIDSecret },
      { key: 'get3', title: 'Navigating through the API References', component: APIReferences },
    ],
  },
  {
    title: 'Authentication Flows',
    key: 'g1',
    children: [
      { key: 'auth0', title: 'Two-Factor Authentication', component: TwoFA },
    ],
  },
  {
    title: 'Sandbox',
    key: 'g2',
    children: [
      { key: 'sand0', title: 'Requesting Sandbox Access', component: SandboxAccess },
      { key: 'sand1', title: 'Accessing Sandbox Endpoints', component: StetAccessEndpoint },
    ],
  },
  {
    title: 'Onboarding Flow',
    key: 'g4',
    children: [
      { key: 'onboard0', title: 'Introduction', component: OnboardingFlowIntro },
      { key: 'onboard1', title: 'Account Creation and Validation', component: OnboardingFlowAccCreateValidate },
      { key: 'onboard2', title: 'Certificate Upload', component: OnboardingFlowCertUpload },
      { key: 'onboard3', title: 'Onboarding Endpoint', component: OnboardingFlowEndpoint },
      { key: 'onboard4', title: 'Certificate Validation', component: OnboardingFlowCertificateValidation },
      { key: 'onboard5', title: 'API Subscriptions', component: OnboardingFlowAPISubs },
      {
        key: 'onboard6',
        title: 'Using the Certificate and Testing the Sandbox',
        component: OnboardingFlowUsingTesting,
      },
      { key: 'onboard7', title: 'Adding more Certificates', component: OnboardingFlowAddingCert },
      { key: 'onboard8', title: 'Revoke/Delete Certificate', component: OnboardingFlowRevoke },
    ],
  },
  {
    title: 'Authorization Flows',
    key: 'g3',
    children: [
      { key: 'stet0', title: 'AISP - Authorizing an App', component: StetAISP },
      { key: 'stet1', title: 'PISP - Authorizing an App', component: StetPISP },
      { key: 'stet2', title: 'PISP - Confirming a Payment', component: StetConfirmingPISP },
    ],
  },
  {
    title: 'Production Endpoints',
    key: 'g3',
    children: [
      { key: 'stet0', title: 'Accessing Production Endpoints', component: ProductionEndpoints },
      { key: 'stet1', title: 'Message Signature for API', component: SignatureAuthenticationScheme },
    ],
  },
]

class Documentation extends Component {
  state = {
    open: [],
  }

  navigate = route => () => this.props.history.push(route)

  UNSAFE_componentWillMount () {
    const { pathname } = this.props.location
    let topicIndex = null
    let childIndex = null

    if (pathname === '/docs/started') {
      topicIndex = 0
      childIndex = 0
      this.props.changeTopic(topicIndex, childIndex)
      this.setState({ open: [...this.state.open, `g${topicIndex}`] })
    } else {
      this.props.changeTopic(topicIndex, childIndex)
    }
  }

  UNSAFE_componentWillReceiveProps (nextProps) {
    const { documentation, location } = nextProps
    const { topic, child } = documentation
    if (this.props.documentation.topic !== null && topic === null) {
      this.setState({ open: [] })
    }

    if (location.pathname === '/docs/started' && topic === 0 && child === 0) {
      const topicIndex = 0
      const childIndex = 0
      this.props.changeTopic(topicIndex, childIndex)
      this.setState({ open: [...this.state.open, `g${topicIndex}`] })
    }
  }

  handleOpen = menuIndex => () => {
    const { open } = this.state
    this.setState({ open: open.includes(`g${menuIndex}`) ? open.filter(o => o !== `g${menuIndex}`) : [...open, `g${menuIndex}`] })
  }

  handleClick = (topic, child, route) => () => {
    if (route) {
      this.props.history.push(route)
    }
    this.props.changeTopic(topic, child)
  }

  render () {
    const { auth, theme } = this.props
    const { open } = this.state
    const { topic, child } = this.props.documentation
    const OverviewComponent = () => <Overview theme={theme} onLinkClick={this.handleClick} />
    const TopicContent = topic !== null ? topics[topic].children[child].component : OverviewComponent

    return (
      <div className='docs-container'>
        <div className='docs-wrapper'>
          <List
            component='nav'
            classes={{ root: 'docs-side-menu' }}
          >
            {topics.map((item, topicIndex) => [
              <ListItem
                key={item.key}
                id={item.key}
                testid='docs-topic-btn'
                button
                onClick={this.handleOpen(topicIndex)}
              >
                <ListItemText primary={item.title} />
                {open.includes(`g${topicIndex}`) ? <ExpandLess /> : <ExpandMore />}
              </ListItem>,
              <Collapse
                key={`collapse-${topicIndex}`}
                in={open.includes(`g${topicIndex}`)}
                timeout='auto'
                unmountOnExit
              >
                <List component='div' disablePadding>
                  {item.children.map((article, childIndex) => (
                    <ListItem
                      button
                      disabled={article.disabled}
                      key={article.key}
                      id={article.key}
                      testid='docs-subtopic-btn'
                      className={classnames(
                        'docs-nested-menu',
                        { selected: topic === topicIndex && child === childIndex }
                      )}
                      onClick={this.handleClick(topicIndex, childIndex)}
                    >
                      <ListItemText primary={article.title} />
                    </ListItem>
                  ))}
                </List>
              </Collapse>,
            ])}
          </List>

          <div className='docs-content-wrapper'>
            <div className='docs-content'>
              {<TopicContent navigate={this.navigate} />}
            </div>
          </div>
        </div>
        {<Footer mini navigate={this.navigate} user={auth.user} />}
      </div>
    )
  }
}

Documentation.propTypes = {
  auth: object.isRequired,
  history: object.isRequired,
  location: object.isRequired,
  documentation: object.isRequired,
  changeTopic: func.isRequired,
  theme: object.isRequired,

}

export default Documentation
