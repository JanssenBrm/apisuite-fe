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

const Navigation: React.FC<NavigationProps> = ({
  contractible = false,
  logout,
  title,
  toggleInform,
  ...rest
}) => {
  const classes = useStyles()

  const history = useHistory()

  const auth = useSelector(getAuth)
  const user = auth.user

  const [scrollPos, setScrollPos] = React.useState(0)
  const [activeMenuName, setActiveMenuName] = React.useState('init')
  const [goBackLabel, setGoBackLabel] = React.useState('')

  const [initTabs, loginTabs] = useMenu()

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
      {/* Header-level portion of the navigation menu (i.e., logo-level) */}
      <header className={clsx({ scrolled })}>
        <div className={classes.topOfNavigationMenuContainer}>
          <div className={classes.leftOfContainer}>
            {
              !scrolled
                ? (
                  <>
                    <AmpStoriesRoundedIcon className={classes.regularLogo} />

                    <h3 className={classes.portalName}>Cloudoki's Portal</h3>
                  </>
                )
                : (
                  <>
                    <AmpStoriesRoundedIcon className={classes.alternativeLogo} />

                    <h3 className={classes.portalName}>APISuite Portal</h3>
                  </>
                )
            }
          </div>

          <div className={classes.rightOfContainer}>
            {
              user
                ? (
                  // If the user is logged in (...)
                  <>
                    {
                      /*
                      Scenario 1) If the navigation menu CAN expand/contract, and the user
                      has NOT scrolled yet, show the user's name and avatar on the very same
                      line as the logo, and leave all remaining tabs to be shown underneath it
                      (handled below).

                      Scenario 2) If the navigation menu CAN'T expand/contract, and/or the user
                      has scrolled, show the user's name and avatar, as well as every tab on the
                      very same line as the logo, leaving the rest (i.e., sub-tabs) to be shown
                      underneath them (handled below).
                      */
                      (contractible && !scrolled)
                        ? null
                        : (
                          <Tabs
                            aria-label='Header-level tabs'
                            classes={
                              {
                                indicator: classes.activeTabOverLineOfOpaqueMenu,
                              }
                            }
                            value={(activeTab && activeTab.route) || false}
                          >
                            {console.log("Ponto B")}
                            {
                              tabs.map((tab, index) =>
                                <Tab
                                  className={
                                    `
${classes.nonContractibleNavigationTab}
${tab.active ? ' ' + classes.activeTab : ''}
`
                                  }
                                  component={Link}
                                  disableRipple
                                  key={`header-level-tab-${index}`}
                                  label={tab.label}
                                  to={tab.route}
                                  value={tab.route}
                                />,
                              )
                            }
                          </Tabs>
                        )
                    }

                    {
                      (contractible && !scrolled)
                        ? <p>{user.fName}</p>
                        : null
                    }

                    {
                      user.photo !== ''
                        ? (
                          /* TODO: Using Gonçalo's picture as a placeholder - change logic to
                          use actual picture of user */
                          <Avatar
                            alt="User's photo"
                            className={classes.userPhotoAvatar}
                            onClick={logout}
                            src='/assets/goncalo-avatar.jpg'
                          />
                        )
                        : (
                          <Avatar
                            className={classes.logOutAvatar}
                            onClick={logout}
                          >
                            <SvgIcon
                              name='logout'
                              size={24}
                            />
                          </Avatar>
                        )
                    }
                  </>
                )
                : (
                  // If the user is NOT logged in (...)
                  <>
                    {
                      /* If the navigation menu CAN expand/contract, and the user has NOT scrolled yet,
                      show 'Register' and 'Login' on the very same line as the logo, and leave all
                      remaining tabs to be shown underneath it (handled below). */
                      (contractible && !scrolled)
                        ? (
                          <Tabs
                            aria-label='Header-level tabs'
                            classes={
                              {
                                indicator: classes.activeTabOverLineOfTransparentMenu,
                              }
                            }
                            value={(activeTab && activeTab.route) || false}
                          >
                            {console.log("Ponto C")}
                            {
                              tabs.map((tab, index) => {
                                if (tab.yetToLogIn) {
                                  return (
                                    <Tab
                                      className={classes.contractibleNavigationTab}
                                      component={Link}
                                      disableRipple
                                      key={`header-level-tab-${index}`}
                                      label={tab.label}
                                      to={tab.route}
                                      value={tab.route}
                                    />
                                  )
                                }
                              })
                            }
                          </Tabs>
                        )
                        : (
                          /* If the navigation menu CAN'T expand/contract, and/or the user has scrolled,
                          show 'Register', 'Login', and every other 'main' tab on the very same line as
                          the logo, leaving the rest (i.e., sub-tabs) to be shown underneath them (handled below). */
                          <Tabs
                            aria-label='Header-level tabs'
                            classes={
                              {
                                indicator: classes.activeTabOverLineOfOpaqueMenu,
                              }
                            }
                            value={(activeTab && activeTab.route) || false}
                          >
                            {console.log("Ponto D")}
                            {
                              tabs.map((tab, index) =>
                                <Tab
                                  className={
                                    `
${classes.nonContractibleNavigationTab}
${tab.active ? ' ' + classes.activeTab : ''}
`
                                  }
                                  component={Link}
                                  disableRipple
                                  key={`header-level-tab-${index}`}
                                  label={tab.label}
                                  to={tab.route}
                                  value={tab.route}
                                />,
                              )
                            }
                          </Tabs>
                        )
                    }
                  </>
                )
            }
          </div>
        </div>
      </header>

      {/* Line that separates an expandable/contractible menu's header and navigation levels */}
      {
        (contractible && !scrolled)
          ? <div className={classes.separator} />
          : null
      }

      {/* Navigation-level portion of the navigation menu */}
      {
        (contractible && !scrolled)
          ? (
            <nav className='container'>
              <div className={classes.bottomOfNavigationMenuContainer}>
                <Tabs
                  aria-label='Navigation-level tabs'
                  classes={
                    {
                      indicator: contractible
                        ? classes.activeTabOverLineOfTransparentMenu
                        : classes.activeTabOverLineOfOpaqueMenu,
                    }
                  }
                  value={(activeTab && activeTab.route) || false}
                >
                  {
                    tabs.map((tab, index) => {
                      if (!tab.yetToLogIn) {
                        return (
                          <Tab
                            className={
                              `
${contractible
                                ? classes.contractibleNavigationTab
                                : classes.nonContractibleNavigationTab
                              }
${tab.active ? ' ' + classes.activeTab : ''}
`
                            }
                            component={Link}
                            disableRipple
                            key={`navigation-level-tab-${index}`}
                            label={tab.label}
                            to={tab.route}
                            value={tab.route}
                          />
                        )
                      }
                    })
                  }
                </Tabs>
              </div>
            </nav>
          )
          : null
      }

      {
        !!subTabs && (
          <div
            className={
              !scrolled
                ? classes.nonScrolledSubTabsContainer
                : classes.scrolledSubTabsContainer
            }
          >
            {!!goBackLabel && (
              <div role='button' className='back-btn' onClick={handleGobackClick}>
                <SvgIcon name='chevron-left-circle' size={28} /> &nbsp;&nbsp; <span>{goBackLabel}</span>
              </div>
            )}

            <Tabs
              aria-label='Navigation-level sub-tabs'
              classes={
                {
                  indicator: (contractible && !scrolled)
                    ? classes.activeTabUnderLineOfTransparentMenu
                    : classes.activeTabUnderLineOfOpaqueMenu,
                }
              }
              value={(activeSubTab && activeSubTab.route) || false}
            >
              {subTabs.map((tab, index) =>
                <Tab
                  className={
                    `
${contractible
                      ? classes.contractibleNavigationSubTab
                      : classes.nonContractibleNavigationSubTab
                    }
${tab.active ? ' ' + classes.activeTab : ''}
`
                  }
                  component={Link}
                  disableRipple
                  key={`navigation-level-sub-tab-${index}`}
                  label={tab.label}
                  to={tab.route}
                  value={tab.route}
                />,
              )}
            </Tabs>
          </div>
        )
      }
    </div>
  )
}

export default Navigation
