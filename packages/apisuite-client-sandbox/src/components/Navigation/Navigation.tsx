import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import SvgIcon from 'components/SvgIcon'
import Link from 'components/Link'
import useStyles from './styles'
import './styles.scss'
import { NavigationProps } from './types'

const Navigation: React.FC<NavigationProps> = (props) => {
  const {
    title,
    className,
    tabs,
    logoSrc,
    user,
    forceScrolled,
    showBackButton,
    backButtonLabel,
    onGoBackCLick,
    logout,
    toggleInform,
    ...rest
  } = props

  const classes = useStyles()
  const [scrollPos, setScrollPos] = React.useState(0)

  const { activeTab, subTabs, activeSubTab } = React.useMemo(() => {
    const activeTab = tabs.find((tab) => tab.active)
    const subTabs = !!activeTab && activeTab.subTabs
    const activeSubTab = !!subTabs && subTabs.find((tab) => tab.active)
    return { activeTab, subTabs, activeSubTab }
  }, [tabs])

  const scrolled = scrollPos >= 10

  function scrollHandler () {
    setScrollPos(window.scrollY)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <div className={clsx('navigation', className, { scrolled: scrolled || forceScrolled })} {...rest}>
      <header className={clsx({ scrolled: scrolled || forceScrolled })}>
        <img src={logoSrc} alt='logo' className='img' />

        <nav className={clsx('container', { scrolled: scrolled || forceScrolled })}>
          <div className='tabs maintabs'>
            <div className='space' />
            <Tabs
              value={(activeTab && activeTab.route) || false}
              aria-label='Main navigation'
              classes={{ indicator: classes.indicatorTop }}
            >
              {tabs.map((tab, idx) =>
                <Tab
                  component={Link}
                  key={`nav-tab-${idx}`}
                  label={tab.label}
                  to={tab.route}
                  disableRipple
                  classes={{ root: classes.tabRoot }}
                  className={clsx('tab', { selected: tab.active })}
                  value={tab.route}
                />,
              )}
            </Tabs>
          </div>
        </nav>

        {user && (
          <div className='avatar-container'>
            {!(scrolled || forceScrolled) && <span>{user.fName}</span>}
            <Avatar className='avatar' onClick={logout}><SvgIcon name='logout' size={20} /></Avatar>
          </div>
        )}
      </header>

      {!!subTabs && (
        <div className={clsx('sub-container', { scrolled: scrolled || forceScrolled })}>
          <div className='tabs subtabs'>
            {showBackButton && (
              <div role='button' className='back-btn' onClick={onGoBackCLick}>
                <SvgIcon name='chevron-left-circle' size={28} /> &nbsp;&nbsp; <span>{backButtonLabel}</span>
              </div>
            )}

            <div className='space' />

            <Tabs
              value={(activeSubTab && activeSubTab.route) || false}
              aria-label='Main navigation'
              classes={{ indicator: classes.indicatorBottom }}
            >
              {subTabs.map((tab, idx) =>
                <Tab
                  component={Link}
                  key={`nav-sub-tab-${idx}`}
                  label={tab.label}
                  to={tab.route}
                  disableRipple
                  classes={{ root: classes.tabRoot }}
                  className={clsx('tab', 'sub-tab', { selected: tab.active })}
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
