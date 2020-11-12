import * as React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SvgIcon from 'components/SvgIcon'
import Link from 'components/Link'
import useStyles from './styles'
import './styles.scss'
import { getAuth } from 'containers/Auth/selectors'
import { TabMenus, NavigationProps } from './types'
import { useMenu, goBackConfig } from './useMenu'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded'

const Navigation: React.FC<NavigationProps> = ({
  title,
  contractible = false,
  toggleInform,
  logout,
  ...rest
}) => {
  const classes = useStyles()
  const history = useHistory()

  const auth = useSelector(getAuth)
  const user = auth.user

  let splitName
  let initials

  if (user) {
    splitName = user.fName.split(' ')
    initials = splitName.length >= 2
      ? `${splitName[0][0] + splitName[1][0]}` : splitName[0].slice(0, 1)
  }

  const [scrollPos, setScrollPos] = React.useState(0)

  const [activeMenuName, setActiveMenuName] = React.useState('init')
  const [goBackLabel, setGoBackLabel] = React.useState('')
  const [topTabs, initTabs, loginTabs] = useMenu()
  const allTabs: TabMenus = {
    init: initTabs,
    login: loginTabs,
  }
  const tabs = allTabs[activeMenuName]

  const { activeTab, subTabs, activeSubTab } = React.useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active)
    const subTabs = !!activeTab && activeTab.subTabs
    const activeSubTab = !!subTabs && subTabs.find((tab) => tab.active)
    return { activeTab, subTabs, activeSubTab }
  }, [tabs])

  const scrolled = contractible && (scrollPos >= 10)

  const handleGobackClick = React.useCallback(() => history.goBack(), [])

  React.useEffect(() => {
    setActiveMenuName(auth.user ? 'login' : 'init')
  }, [auth.user])

  const scrollHandler = React.useCallback(() => {
    setScrollPos(window.scrollY)
  }, [])

  React.useEffect(() => {
    const { pathname } = history.location
    const gb = goBackConfig.find((item) => pathname.indexOf(item.path) === 0)
    if (gb) {
      setGoBackLabel(gb.label)
    } else {
      setGoBackLabel('')
    }
  }, [history.location.pathname])

  React.useEffect(() => {
    if (!contractible) {
      return
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [contractible])

  return (
    <div
      className={clsx('navigation', {
        contractible,
        scrolled,
      })}
      {...rest}
    >
      <header className={clsx({ scrolled })}>
        <div className={classes.headerContentsContainer}>
          <div className={classes.logoAndNameContainer}>
            <AmpStoriesRoundedIcon
              className={
                !scrolled
                  ? classes.regularLogo
                  : classes.alternativeLogo
              }
            />

            {/* TODO: Eventually change the following text to reflect the client's name */}
            <h3 className={classes.portalName}>Cloudoki's Portal</h3>
          </div>

          {!user && (
            <div className='tabs pretabs'>
              <Tabs
                aria-label='Header-level navigation tabs'
                value={(activeTab && activeTab.route) || false}
              >
                {topTabs.map((tab, idx) =>
                  <Tab
                    className={
                      (contractible && !scrolled)
                        ? classes.transparentMenuTab
                        : classes.opaqueMenuTab
                    }
                    component={Link}
                    disableRipple
                    key={`nav-tab-${idx}`}
                    label={tab.isLogin ? <PowerSettingsNewRoundedIcon /> : tab.label}
                    to={tab.route}
                    value={tab.route}
                  />,
                )}
              </Tabs>
            </div>
          )}
        </div>

        <nav className={clsx('container', { scrolled })}>
          <div className='tabs maintabs'>
            <Tabs
              aria-label='Navigation tabs'
              classes={{
                indicator: (contractible && !scrolled)
                  ? classes.transparentMenuActiveTabOverLine
                  : classes.opaqueMenuActiveTabOverLine,
              }}
              value={(activeTab && activeTab.route) || false}
            >
              {
                tabs.map((tab, idx) => {
                  return !(contractible && !scrolled && tab.yetToLogIn)
                    ? (
                      <Tab
                        className={
                          `
                            ${(contractible && !scrolled)
                        ? classes.transparentMenuTab
                        : classes.opaqueMenuTab
                      }
                            ${tab.active ? ' ' + classes.activeTab : ''}
                            ${contractible && !scrolled && tab.yetToLogIn ? ' ' + classes.yetToLogIn : ''}
                          `
                        }
                        component={Link}
                        disableRipple
                        key={`nav-tab-${idx}`}
                        label={tab.label}
                        to={tab.route}
                        value={tab.route}
                      />
                    )
                    : null
                })
              }
            </Tabs>
          </div>
        </nav>

        {user && (
          <div
            className={
              (contractible && !scrolled)
                ? classes.transparentMenuUserAvatarContainer
                : classes.opaqueMenuUserAvatarContainer
            }
          >
            {
              (contractible && !scrolled) &&
                <span className={classes.userName}>{user.fName}</span>
            }

            {
              user.photo !== ''
                ? (
                  /* TODO: Using Gonçalo's picture as a placeholder - change logic to
                  use actual picture of user, whose source should be stored somewhere
                  in the app's Store */
                  <Avatar
                    alt="User's photo"
                    className={
                      (contractible && !scrolled)
                        ? classes.transparentMenuUserAvatar
                        : classes.opaqueMenuUserAvatar
                    }
                    onClick={logout}
                    src='/assets/goncalo-avatar.jpg'
                  />
                )
                : (
                  <Avatar
                    className={
                      (contractible && !scrolled)
                        ? classes.transparentMenuUserAvatar
                        : classes.opaqueMenuUserAvatar
                    }
                    onClick={logout}
                  >
                    {initials}
                  </Avatar>
                )
            }
          </div>
        )}
      </header>

      {!!subTabs && (
        <div className={clsx('sub-container', { scrolled })}>
          <div className='tabs subtabs'>
            {!!goBackLabel && (
              <div role='button' className='back-btn' onClick={handleGobackClick}>
                <SvgIcon name='chevron-left-circle' size={28} /> &nbsp;&nbsp; <span>{goBackLabel}</span>
              </div>
            )}

            <Tabs
              aria-label='Navigation sub-tabs'
              classes={{
                indicator: (contractible && !scrolled)
                  ? classes.transparentSubMenuActiveTabUnderLine
                  : classes.opaqueSubMenuActiveTabUnderLine,
              }}
              value={(activeSubTab && activeSubTab.route) || false}
            >
              {subTabs.map((tab, idx) =>
                <Tab
                  className={
                    `
                      ${classes.subTab}
                      ${tab.active ? ' ' + classes.activeTab : ''}
                    `
                  }
                  component={Link}
                  disableRipple
                  key={`nav-sub-tab-${idx}`}
                  label={tab.label}
                  to={tab.route}
                  value={tab.route}
                />,
              )}
            </Tabs>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
