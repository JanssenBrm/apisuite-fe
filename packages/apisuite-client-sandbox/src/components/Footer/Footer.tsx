import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import Fab from '@material-ui/core/Fab'
import { useTranslation } from 'react-i18next'
import { Menus } from 'apisuite-extension-ui-types'
import LocaleSelect from 'language/LocaleSelect'
import logo from 'theme/images/current_Cloudoki_logo.png'
import { MenuSection, MenuSections } from './types'
import { getMenuEntries } from 'util/extensions'
import { useSettings } from 'util/useSetting'
import { SettingsStore } from 'containers/Settings/types'

import './styles.scss'

const renderSocialLinks = ({ settings }: { settings: SettingsStore}) => {
  const { socialURLs } = settings
  if (!socialURLs || !socialURLs.length) {
    return null
  }

  return (
    <div className='icons-container'>
      {socialURLs.map((socialUrl) => {
        switch (socialUrl.name) {
          case 'web':
            return (
              <a key='web' href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='earth' />
              </a>
            )
          case 'twitter':
            return (
              <a key='twitter' href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='twitter' />
              </a>
            )
          case 'facebook':
            return (
              <a key='facebook' href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='facebook' />
              </a>
            )
          case 'github':
            return (
              <a key='github' href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='github-face' />
              </a>
            )
          default:
            return null
        }
      })}
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
  const [settings] = useSettings()
  const [t] = useTranslation()

  function handleFabClick () {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className='footer'>
      <div className='fab-container'>
        <Fab size='small' onClick={handleFabClick}>
          <SvgIcon name='chevron-up' size={24} />
        </Fab>
      </div>
      <div className='container'>
        <div className='logo-container'>
          <img src={logo} alt='logo' className='logo' />
          <p>{t('copyright', { ...settings, year: new Date().getFullYear() })}</p>

          {renderSocialLinks({ settings })}
          <LocaleSelect />
        </div>

        <div className='sections-container'>
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
