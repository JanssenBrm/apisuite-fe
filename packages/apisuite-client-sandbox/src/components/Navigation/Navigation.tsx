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

            {/* TODO: Eventually change the following text to "${settings.clientName}'s Portal" */}
            <h3 className={classes.portalName}>Cloudoki's Portal</h3>
          </div>

          {!user && (
            <div className={'tabs pretabs'}>
              <Tabs
                aria-label='Top navigation'
                value={(activeTab && activeTab.route) || false}
              >
                {topTabs.map((tab, idx) =>
                  <Tab
                    className={classes.tab}
                    component={Link}
                    disableRipple
                    key={`nav-tab-${idx}`}
                    label={tab.isLogin ? '(|)' : tab.label}
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
              aria-label='Main navigation'
              classes={
                {
                  indicator: classes.activeTabOverLine,
                }
              }
              value={(activeTab && activeTab.route) || false}
            >
              {tabs.map((tab, idx) =>
                <Tab
                  className={
                    `
                      ${classes.tab}
                      ${tab.active ? ' ' + classes.activeTab : ''}
                      ${tab.authRelated ? ' ' + classes.authRelated : ''}
                    `
                  }
                  component={Link}
                  disableRipple
                  key={`nav-tab-${idx}`}
                  label={tab.label}
                  to={tab.route}
                  value={tab.route}
                />,
              )}
            </Tabs>
          </div>
        </nav>

        {user && (
          <div className='avatar-container'>
            {(contractible && !scrolled) && <span>{user.fName}</span>}
            <Avatar className='avatar' onClick={logout}><SvgIcon name='logout' size={20} /></Avatar>
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
              value={(activeSubTab && activeSubTab.route) || false}
              aria-label='Main navigation'
              classes={{ indicator: classes.activeTabUnderLine }}
            >
              {subTabs.map((tab, idx) =>
                <Tab
                  component={Link}
                  key={`nav-sub-tab-${idx}`}
                  label={tab.label}
                  to={tab.route}
                  disableRipple
                  className={
                    `
                      ${classes.subTab}
                      ${tab.active ? ' ' + classes.activeTab : ''}
                    `
                  }
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
