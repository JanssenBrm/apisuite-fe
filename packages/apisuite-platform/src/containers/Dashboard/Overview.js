import React, { Component } from 'react'
import { string, object, func } from 'prop-types'
import { FormattedMessage } from 'react-intl'
import classnames from 'classnames'
import Button from '@material-ui/core/Button'
import Card from 'components/Card'
import navDefaultLogo from 'assets/graphic_placeholder.svg'
import navApps from 'assets/nav_apps.svg'
import navSupport from 'assets/nav_support.svg'

class Overview extends Component {
  getNavigationItems = theme => [
    {
      intlId: 'dashboard.overview.nav.myApps',
      img: theme.myApps || navApps,
      route: '/apps',
      tag: 'overview-apps'
    },
    {
      intlId: 'dashboard.overview.nav.testData',
      img: theme.testData || navDefaultLogo,
      route: '/testdata',
      tag: 'overview-testdata'
    },
    {
      intlId: 'dashboard.overview.nav.team',
      img: theme.userRoles || navDefaultLogo,
      route: '/team',
      tag: 'overview-users'
    },
    {
      intlId: 'dashboard.overview.nav.activity',
      img: theme.activityLogs || navDefaultLogo,
      route: '/activity-log',
      disabled: true,
      tag: 'overview-activity-logs'
    },
    {
      intlId: 'dashboard.overview.nav.documentation',
      img: theme.documentation || navDefaultLogo,
      route: '/docs',
      tag: 'overview-docs'
    },
    {
      intlId: 'dashboard.overview.nav.support',
      img: theme.support || navSupport,
      action: 'openSupportModal',
      tag: 'overview-support'
    }
  ]
  navigate = route => this.props.history.push(route)

  openSupport = option => e => this.props.openSupportModal(option)

  handleItemClick = (item) => {
    if (!item.disabled) {
      if (item.route) {
        this.navigate(item.route)
      }
      if (item.action) {
        this.props[item.action]()
      }
    }
  }
  render () {
    const { theme } = this.props

    return (
      <div className='section-light-grey overview-section'>
        <div className='section-content'>
          <div className='nav-cards'>
            <Card scope='dashboard' children={
              this.getNavigationItems(theme).map(item => (
                <div
                  className={classnames('nav-item', {'item-inactive': item.disabled})}
                  testid={item.tag}
                  onClick={() => this.handleItemClick(item)}
                >
                  <div className='nav-item-logo-wrapper'>
                    <img className='nav-item-logo' src={item.img} />
                  </div>
                  <div className='nav-item-title'><FormattedMessage id={item.intlId} /></div>
                </div>
              ))
            } />
          </div>
          <div className='nav-description'>
            <p><FormattedMessage id='dashboard.overview.nav.description1' /></p>
            <p><FormattedMessage id='dashboard.overview.nav.description2' /></p>
            <br />
            <Button
              id='proposeFeature'
              testid='propose-feature-btn'
              key='proposeFeature'
              variant='contained'
              color='primary'
              onClick={this.openSupport('task')}
            >
              <FormattedMessage id='dashboard.overview.nav.proposeFeature' />
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

Overview.propTypes = {
  fullName: string.isRequired,
  history: object.isRequired,
  openSupportModal: func.isRequired,
  theme: object.isRequired
}

export default Overview
