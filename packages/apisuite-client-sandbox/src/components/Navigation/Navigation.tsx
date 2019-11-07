import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
import SvgIcon from 'components/SvgIcon'
import './styles.scss'
import { NavigationProps } from './types'

function getBarValues (parent: React.RefObject<HTMLDivElement>, target: React.RefObject<HTMLDivElement>) {
  const values = { left: 0, width: 0 }

  if (parent.current != null && target.current != null) {
    const parentRect = parent.current.getBoundingClientRect()
    const targetRect = target.current.getBoundingClientRect()

    values.left = targetRect.left - parentRect.left
    values.width = targetRect.width
  }

  return values
}

const useStyles = makeStyles({
  avatar: {
    width: 28,
    height: 28,
    border: '2px solid white',
  },
})

const Navigation: React.FC<NavigationProps> = (props) => {
  const {
    title,
    className,
    tabs,
    subTabs,
    tabIndex,
    subTabIndex,
    onTabChange,
    onSubTabChange,
    logoSrc,
    user,
    forceScrolled,
    showBackButton,
    backButtonLabel,
    onGoBackCLick,
    ...rest
  } = props
  const classes = useStyles()
  const [scrollPos, setScrollPos] = React.useState(0)
  const [barValues, setBarValues] = React.useState({ left: 0, width: 0 })
  const [subBarValues, setSubBarValues] = React.useState({ left: 0, width: 0 })
  const refs = tabs.map(() => React.useRef(null))
  const subRefs = tabs.map(() => React.useRef(null))
  const tabsRef = React.useRef(null)
  const subTabsRef = React.useRef(null)

  function scrollHandler () {
    setScrollPos(window.scrollY)
  }

  function handleTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const tabIndex = Number(currentTarget.dataset.tab) || 0

    if (tabIndex < tabs.length) {
      onTabChange(tabIndex)
    }
  }

  function handleSubTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const tabIndex = Number(currentTarget.dataset.tab) || 0

    if (tabIndex < tabs.length) {
      onSubTabChange(tabIndex)
    }
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  React.useEffect(() => {
    setBarValues(getBarValues(tabsRef, refs[tabIndex]))
  }, [tabIndex, tabs])

  React.useEffect(() => {
    setSubBarValues(getBarValues(subTabsRef, subRefs[subTabIndex]))
  }, [subTabIndex, subTabs])

  const scrolled = scrollPos >= 10

  return (
    <div className={clsx('navigation', className, { scrolled: scrolled || forceScrolled })} {...rest}>
      <header className={clsx({ scrolled: scrolled || forceScrolled })}>
        <img src={logoSrc} alt='logo' className='img' />

        <h1>CLOUDOKI <b>SANDBOX</b></h1>

        <nav className={clsx('container', { scrolled: scrolled || forceScrolled })}>
          <div ref={tabsRef} className='tabs'>
            <div className='space' />

            {tabs.map((tab, idx) => (
              <div
                data-testid={`nav-tab-${idx}`}
                key={`nav-tab-${idx}`}
                ref={refs[idx]}
                data-tab={idx}
                onClick={handleTabClick}
                className={clsx('tab', { selected: idx === tabIndex })}
              >
                {tab}
              </div>
            ))}

            {!(scrolled || forceScrolled) && (
              <div className='top-bar' style={{ left: barValues.left, width: barValues.width }} />
            )}
          </div>
        </nav>

        {user && (
          <div className='avatar-container'>
            {!(scrolled || forceScrolled) && <span>{user.fName}</span>}
            <Avatar src={user.avatar} className={classes.avatar} />
          </div>
        )}
      </header>

      {!!subTabs && (
        <div className={clsx('sub-container', { scrolled: scrolled || forceScrolled })}>
          <div ref={subTabsRef} className='tabs'>
            {showBackButton && (
              <div role='button' className='back-btn' onClick={onGoBackCLick}>
                <SvgIcon name='chevron-left-circle' size={28} /> &nbsp;&nbsp; <span>{backButtonLabel}</span>
              </div>
            )}

            <div className='space' />

            {subTabs.map((subTab, idx) => (
              <div
                data-testid={`nav-sub-tab-${idx}`}
                key={`nav-sub-tab-${idx}`}
                ref={subRefs[idx]}
                data-tab={idx}
                onClick={handleSubTabClick}
                className={clsx('tab', 'sub-tab', { selected: idx === subTabIndex })}
              >
                {subTab}
              </div>
            ))}

            {(scrolled || forceScrolled) && (
              <div className='bottom-bar' style={{ left: subBarValues.left, width: subBarValues.width }} />
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
