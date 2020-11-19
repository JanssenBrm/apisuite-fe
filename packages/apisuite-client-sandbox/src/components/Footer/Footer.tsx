import * as React from 'react'

import { useSelector } from 'react-redux'

// import { useTranslation } from 'react-i18next'

import { Menus } from '@apisuite/extension-ui-types'

import { getRoleName } from 'containers/Profile/selectors'
import { SettingsStore } from 'containers/Settings/types'

import SvgIcon from 'components/SvgIcon'

import Fab from '@material-ui/core/Fab'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'

import LocaleSelect from 'language/LocaleSelect'

import { getMenuEntries } from 'util/extensions'
import { useSettings } from 'util/useSetting'

import useStyles from './styles'

import { MenuSection, MenuSections } from './types'

const renderSocialLinks = ({ settings }: { settings: SettingsStore }) => {
  const classes = useStyles()

  const { socialURLs } = settings

  if (!socialURLs || !socialURLs.length) {
    return null
  }

  return (
    <div className={classes.iconsContainer}>
      {socialURLs.map((socialUrl, index) => {
        switch (socialUrl.name) {
          case 'twitter':
          case 'facebook':
          case 'linkedin':
          case 'reddit':
          case 'github':
          case 'instagram':
          case 'gitlab':
            return (
              <a key={`${index}-${socialUrl.name}`} href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name={socialUrl.name} />
              </a>
            )

          default:
            return (
              <a key={`${index}-web`} href={socialUrl.url} target='_blank' rel='noopener noreferrer'>
                <SvgIcon size={24} name='earth' />
              </a>
            )
        }
      })}
    </div>
  )
}

const menuSections: MenuSections = {
  [Menus.FooterProducts]: {
    title: 'Products',
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

  [Menus.FooterProfile]: {
    title: 'Profile',
    entries: [
      {
        label: 'Security',
      },
      {
        label: 'Log out',
      },
    ],
  },
}

const renderSubSection = (subMenu: string, roleName?: string) => {
  const classes = useStyles()

  const section: MenuSection = menuSections[subMenu]
  const extensionsMenuEntries = getMenuEntries(subMenu, roleName)
  const allEntries = [...section.entries, ...extensionsMenuEntries]

  return (
    <div className={classes.subSection} key={subMenu}>
      <h3>{section.title}</h3>

      <>
        {allEntries.map((entry, i) => {
          const { label, ...anchorProps } = entry

          return (
            <p key={i}>
              {
                entry.route && entry.route !== '#'
                  ? (
                    <a {...anchorProps} href={entry.route} key={i}>
                      {label}
                    </a>
                  )
                  : (
                    label
                  )
              }
            </p>
          )
        })}
      </>
    </div>
  )
}

// Footer

const Footer = () => {
  const classes = useStyles()

  const [settings] = useSettings()

  // const [t] = useTranslation()

  const roleName = useSelector(getRoleName)

  const handleFabClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  return (
    <footer className={classes.footer}>
      <div className={classes.footerToTopShortcutContainer}>
        <Fab size='small' onClick={handleFabClick}>
          <SvgIcon name='chevron-up' size={24} />
        </Fab>
      </div>

      <div className={classes.footerContentsContainer}>
        <div className={classes.leftFooterContentsContainer}>
          <div className={classes.logoAndPortalNameContainer}>
            <AmpStoriesRoundedIcon className={classes.logo} />

            <h3 className={classes.portalName}>
              {settings.portalName}
            </h3>
          </div>

          <div className={classes.sectionsContainer}>
            <div>
              {renderSubSection(Menus.FooterProducts, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(Menus.FooterDocumentation, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(Menus.FooterSupport, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(Menus.FooterDashboard, roleName)}
            </div>

            <div className={classes.section}>
              {renderSubSection(Menus.FooterProfile, roleName)}
            </div>
          </div>
        </div>

        <div className={classes.rightFooterContentsContainer}>
          {renderSocialLinks({ settings })}

          <div className={classes.copyrightContainer}>
            <a
              href='https://apisuite.io/'
              rel='noopener noreferrer'
              target='_blank'
            >
              &copy; {new Date().getFullYear()} APISuite.io
            </a>

            <p>All rights reserved</p>
          </div>

          <LocaleSelect />
        </div>
      </div>
    </footer>
  )
}

export default Footer
