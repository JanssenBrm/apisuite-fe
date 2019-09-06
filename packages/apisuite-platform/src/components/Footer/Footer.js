import React, { Fragment } from 'react'
import classnames from 'classnames'
import { bool, func, object } from 'prop-types'
import SvgIcon from 'components/SvgIcon'
import Newsletter from '../../containers/Newsletter'
import { FormattedMessage } from 'react-intl'

const siteMap = [
  {
    name: 'APIs',
    route: '/',
    children: [
      { name: 'Feedback', route: '/feedback', protected: true },
      { name: 'Subscriptions', route: '/api-subscriptions', protected: true },
      { name: 'API Status', route: '/api-status', disabled: true, protected: true }
    ]
  },
  {
    name: 'documentation',
    route: '/docs',
    children: [
      { name: 'Getting Started', route: '/docs/started', loggedOut: true },
      { name: 'API References', route: '/api-references', protected: true },
      { name: 'Search', route: '/search', disabled: true, protected: true }
    ]
  },
  {
    name: 'dashboard',
    route: '/dashboard',
    protected: true,
    children: [
      { name: 'Manage Apps', route: '/apps', protected: true },
      { name: 'Test Data', route: '/testdata' },
      { name: 'API Console', route: '/console', disabled: true }
    ]
  },
  {
    name: 'support',
    route: '/support',
    children: [
      { name: 'Knowledge Base', route: '/knowledge-base', protected: true, disabled: true },
      { name: 'External resources', route: '/external-resources', protected: true, disabled: true },
      { name: 'Activity Log', route: '/activity-log', protected: true, disabled: true }
    ]
  },
  {
    name: 'team',
    route: '/team',
    protected: true,
    children: [
      { name: 'Manage Team', route: '/team', protected: true },
      { name: 'Organisation', route: '/organisation', protected: true },
      { name: 'Profile', route: '/profile', protected: true }
    ]
  },
  {
    name: 'legal notice',
    route: '/privacy',
    protected: true,
    children: [
      { name: 'Data Privacy Notice', route: '/privacy', protected: true },
      { name: 'Terms of use', route: '/terms', protected: true },
      { name: 'Cookies policy', route: '/cookies', protected: true }
    ]
  }
]

const miniSiteMap = [
  { name: 'APIs', route: '/' },
  { name: 'API Reference', route: '/api-references', protected: true },
  { name: 'Data Privacy Notice', route: '/privacy', protected: true },
  { name: 'Terms of use', route: '/terms', protected: true },
  { name: 'Cookies policy', route: '/cookies', protected: true }
]

const Footer = ({ mini, navigate, user, intl, logout, theme }) => {
  const isMiniFooter = mini
  const footerData = isMiniFooter ? miniSiteMap : siteMap
  const isLoggedIn = Boolean(user.id)
  const isAdmin = user.roles && !!user.roles.find(r => r.role === 'ADMIN' && r.organizationId === user.organizations[0].id)

  return (
    <div className={classnames(
      'footer-container',
      {'mini': isMiniFooter}
    )}>
      {!isMiniFooter && <Newsletter intl={intl} />}
      <div className={classnames('footer-wrapper', {'extra-padding': !isMiniFooter})}>
        {isMiniFooter &&
          <div className='footer-trademark'>
            © 2019 {<FormattedMessage id='footer.bank' />}
          </div>
        }
        <div
          className='footer-sitemap'
        >
          {footerData.map(section =>
            (!section.protected || (section.protected && isLoggedIn)) &&
              <div key={section.name} className='footer-sitemap-section'>
                <Fragment>
                  <div
                    className={
                      classnames(
                        'section-title',
                        { 'disabled-link': section.disabled || (section.name === 'team' && !isAdmin) }
                      )}
                    onClick={navigate(section.route)}
                  >
                    {section.name}
                  </div>
                  {section.children && section.children.map(item =>
                    (!item.protected || (item.protected && isLoggedIn) || (item.loggedOut && !isLoggedIn)) &&
                      <a
                        onClick={item.action ? logout : navigate(item.route)}
                        key={`${item.name}`}
                        className={
                          classnames(
                            'footer-sitemap-link',
                            { 'disabled-link': item.disabled || (item.route === '/team' && !isAdmin) }
                          )}
                      >
                        {item.name}
                      </a>
                  )}
                </Fragment>
              </div>
          )}
        </div>
        {!isMiniFooter &&
          <div className='footer-trademark'>
            <div className='footer-trademark-container'>
              <div>
                <img src={theme.logo} />
              </div>
              <div>
                Copyright © 2019 {<FormattedMessage id='footer.bank' />}
              </div>
              <div className='footer-icons'>
                <a target='_blank' href='https://www.bnpparibasfortis.com'>
                  <div className='footer-icon'>
                    {theme.socialWeb && <img src={theme.socialWeb} />}
                    {!theme.socialWeb && <SvgIcon name='earth' size={16} />}
                  </div>
                </a>
                <a target='_blank' href='https://twitter.com/BNPPFBelgique'>
                  <div className='footer-icon'>
                    {theme.socialTwitter && <img src={theme.socialTwitter} />}
                    {!theme.socialTwitter && <SvgIcon name='twitter' size={16} />}
                  </div>
                </a>
                <a target='_blank' href='https://www.facebook.com/BNPParibasFortisBelgique'>
                  <div className='footer-icon'>
                    {theme.socialFacebook && <img src={theme.socialFacebook} />}
                    {!theme.socialFacebook && <SvgIcon name='facebook' size={16} />}
                  </div>
                </a>
                <a target='_blank' href='https://www.linkedin.com/company/bnpparibasfortis/'>
                  <div className='footer-icon'>
                    {theme.socialLinkedIn && <img src={theme.socialLinkedIn} />}
                    {!theme.socialLinkedIn && <SvgIcon name='facebook' size={16} />}
                  </div>
                </a>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

Footer.defaultProps = {
  navigate: () => {}
}

Footer.propTypes = {
  mini: bool,
  navigate: func.isRequired,
  theme: object.isRequired,
  user: object.isRequired,
  intl: object,
  logout: func
}

export default Footer
