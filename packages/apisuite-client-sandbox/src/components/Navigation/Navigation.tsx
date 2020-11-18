import * as React from 'react'

import { useSelector } from 'react-redux'

import { useHistory } from 'react-router-dom'

import clsx from 'clsx'

import { useMenu, goBackConfig } from './useMenu'

import Link from 'components/Link'
import SvgIcon from 'components/SvgIcon'

import Avatar from '@material-ui/core/Avatar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'

import AmpStoriesRoundedIcon from '@material-ui/icons/AmpStoriesRounded'
import PowerSettingsNewRoundedIcon from '@material-ui/icons/PowerSettingsNewRounded'

import { getAuth } from 'containers/Auth/selectors'

import useStyles from './styles'

import './styles.scss'

import { TabMenus, NavigationProps } from './types'

const Navigation: React.FC<NavigationProps> = ({
  contractible = false,
  logout,
  profile,
  settings,
  title,
  toggleInform,
  ...rest
}) => {
  const classes = useStyles()
  const history = useHistory()

  const auth = useSelector(getAuth)
  const user = auth.user
  const userProfile = profile.profile.user

  // User's initials (to be used in his Avatar, in the absence of a picture)
  let splitName
  let initials

  if (user) {
    splitName = userProfile.name.split(' ')
    initials = splitName.length >= 2
      ? `${splitName[0][0] + splitName[1][0]}` : splitName[0].slice(0, 1)
  }

  const [scrollPos, setScrollPos] = React.useState(0)
  const scrolled = contractible && (scrollPos >= 10)

  const scrollHandler = React.useCallback(() => {
    setScrollPos(window.scrollY)
  }, [])

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

  const handleGobackClick = React.useCallback(() => history.goBack(), [])

  React.useEffect(() => {
    setActiveMenuName(auth.user ? 'login' : 'init')
  }, [auth.user])

  React.useEffect(() => {
    const { pathname } = history.location
    const goBack = goBackConfig.find((item) => pathname.indexOf(item.path) === 0)

    if (goBack) {
      setGoBackLabel(goBack.label)
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

            <h3 className={classes.portalName}>
              {settings.portalName}
            </h3>
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
                  if (tab.isProfileTab) return

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
                        label={tab.isLogin ? <PowerSettingsNewRoundedIcon /> : tab.label}
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

        {
          user && (
            <div
              className={
                (contractible && !scrolled)
                  ? classes.transparentMenuUserNameAndAvatarContainer
                  : classes.opaqueMenuUserNameAndAvatarContainer
              }
            >
              {
                (contractible && !scrolled) &&
                <Link
                  className={classes.linkToProfile}
                  to='/profile'
                >
                  <span className={classes.userName}>
                    {userProfile.name}
                  </span>
                </Link>
              }

              {
                userProfile.avatar !== ''
                  ? (
                    /* TODO: Using Gonçalo's picture as a placeholder - change logic to
                    use actual picture of user, whose source should be stored somewhere
                    in the app's Store */
                    <Link
                      className={classes.linkToProfile}
                      to='/profile'
                    >
                      <Avatar
                        alt="User's photo"
                        className={
                          (contractible && !scrolled)
                            ? classes.transparentMenuUserAvatar
                            : classes.opaqueMenuUserAvatar
                        }
                        src={userProfile.avatar}
                      />
                    </Link>
                  )
                  : (
                    <Link
                      className={classes.linkToProfile}
                      to='/profile'
                    >
                      <Avatar
                        className={
                          (contractible && !scrolled)
                            ? classes.transparentMenuUserAvatar
                            : classes.opaqueMenuUserAvatar
                        }
                      >
                        {initials}
                      </Avatar>
                    </Link>
                  )
              }

              <PowerSettingsNewRoundedIcon
                className={classes.logOutIcon}
                onClick={logout}
              />
            </div>
          )
        }
      </header>

      {!!subTabs && (
        <div className={clsx('sub-container', { scrolled })}>
          <div
            className={`tabs ${goBackLabel ? classes.subTabsAndBackButton : classes.subTabs}`}
          >
            {
              !!goBackLabel && (
                <div
                  className={classes.goBackButton}
                  onClick={handleGobackClick}
                  role='button'
                >
                  <SvgIcon name='chevron-left-circle' size={28} />
                  <span>{goBackLabel}</span>
                </div>
              )
            }

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
