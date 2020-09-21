import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import Fab from '@material-ui/core/Fab'
import { Menus } from 'apisuite-extension-ui-types'
import LocaleSelect from 'language/LocaleSelect'
import { config } from 'constants/global'
import logo from 'theme/images/current_Cloudoki_logo.png'
import { MenuSection, MenuSections } from './types'
import { getMenuEntries } from 'util/extensions'

import './styles.scss'

const renderSocialLinks = () => {
  const social = config.social
  if (!social) {
    return null
  }

  return (
    <div className='icons-container'>
      {social.web &&
        <a href={social.web} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='earth' />
        </a>}
      {social.twitter &&
        <a href={social.twitter} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='twitter' />
        </a>}
      {social.facebook &&
        <a href={social.facebook} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='facebook' />
        </a>}
      {social.github &&
        <a href={social.github} target='_blank' rel='noopener noreferrer'>
          <SvgIcon size={24} name='github-face' />
        </a>}
    </div>
  )
}

const menuSections: MenuSections = {
  [Menus.FooterProducts]: {
    title: 'API Products',
    entries: [
      {
        label: 'Upcoming',
      },
      {
        label: 'Feedback',
      },
      {
        label: 'Subscriptions',
      },
    ],
  },
  [Menus.FooterProfile]: {
    title: 'Profile',
    entries: [
      {
        label: 'Security',
      },
      {
        label: 'Logout',
      },
    ],
  },
  [Menus.FooterDocumentation]: {
    title: 'Documentation',
    entries: [
      {
        label: 'Getting Started',
      },
      {
        label: 'API References',
      },
      {
        label: 'Search',
      },
    ],
  },
  [Menus.FooterTeam]: {
    title: 'Team',
    entries: [
      {
        label: 'Manage Team',
      },
      {
        label: 'Organisation',
      },
    ],
  },
  [Menus.FooterDashboard]: {
    title: 'Dashboard',
    entries: [
      {
        label: 'Manage Apps',
      },
      {
        label: 'Test Data',
      },
      {
        label: 'API Console',
      },
    ],
  },
  [Menus.FooterLegal]: {
    title: 'Legal Notice',
    entries: [
      {
        label: 'Data Privacy Notice',
      },
      {
        label: 'Cookies policy',
      },
    ],
  },
  [Menus.FooterSupport]: {
    title: 'Support',
    entries: [
      {
        label: 'Knowledge Base',
      },
      {
        label: 'External resources',
      },
      {
        label: '\u00A0', // Empty entry to fix alignment
      },
    ],
  },
  [Menus.FooterStatus]: {
    title: 'API Status',
    entries: [
      {
        label: 'Activity Log',
      },
    ],
  },
}

const renderSubSection = (subMenu: string) => {
  const section: MenuSection = menuSections[subMenu]
  const extensionsMenuEntries = getMenuEntries(subMenu)
  const allEntries = [...section.entries, ...extensionsMenuEntries]

  return (
    <div key={subMenu} className='sub-section'>
      <h3>{section.title}</h3>
      <>
        {allEntries.map((entry, i) => {
          const { label, ...anchorProps } = entry
          return (
            <p key={i}>
              {entry.route && entry.route !== '#' ? (
                <a {...anchorProps} href={entry.route} key={i}>
                  {label}
                </a>
              ) : (
                label
              )}
            </p>
          )
        })}
      </>
    </div>
  )
}

const Footer = () => {
  function handleFabClick () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className='footer'>
      <div className='container'>
        <div className='logo-container'>
          <img src={logo} alt='logo' className='logo' />
          <p>{config.footer.copyright}</p>

          {renderSocialLinks()}
          <LocaleSelect />
        </div>

        <div className='sections-container'>
          <div className='fab-container'>
            <Fab size='small' onClick={handleFabClick}>
              <SvgIcon name='chevron-up' size={24} />
            </Fab>
          </div>

          <div className='section'>
            {renderSubSection(Menus.FooterProducts)}
            {renderSubSection(Menus.FooterProfile)}
          </div>

          <div className='section'>
            {renderSubSection(Menus.FooterDocumentation)}
            {renderSubSection(Menus.FooterTeam)}
          </div>

          <div className='section'>
            {renderSubSection(Menus.FooterDashboard)}
            {renderSubSection(Menus.FooterLegal)}
          </div>

          <div className='section'>
            {renderSubSection(Menus.FooterSupport)}
            {renderSubSection(Menus.FooterStatus)}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
