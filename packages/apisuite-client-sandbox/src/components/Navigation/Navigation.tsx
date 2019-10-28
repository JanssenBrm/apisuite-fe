import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import { makeStyles } from '@material-ui/core/styles'
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
  const { title, className, tabNames, subTabNames, tabIndex, subTabIndex, onTabChange, logoSrc, user, ...rest } = props
  const classes = useStyles()
  const [scrollPos, setScrollPos] = React.useState(0)
  const [barValues, setBarValues] = React.useState({ left: 0, width: 0 })
  const [subBarValues, setSubBarValues] = React.useState({ left: 0, width: 0 })
  const refs = tabNames.map(() => React.useRef(null))
  const subRefs = tabNames.map(() => React.useRef(null))
  const tabsRef = React.useRef(null)
  const subTabsRef = React.useRef(null)

  function scrollHandler () {
    setScrollPos(window.scrollY)
  }

  function handleTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const tabIndex = Number(currentTarget.dataset.tab) || 0

    if (tabIndex < tabNames.length) {
      onTabChange(tabIndex)
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
  }, [tabIndex, tabNames])

  React.useEffect(() => {
    setSubBarValues(getBarValues(subTabsRef, subRefs[subTabIndex]))
  }, [subTabIndex, subTabNames])

  const scrolled = scrollPos >= 10

  return (
    <div className={clsx('navigation', className, { scrolled })} {...rest}>
      <header className={clsx({ scrolled })}>
        <img src={logoSrc} alt='logo' className='img' />

        <h1>CLOUDOKI <b>SANDBOX</b></h1>

        <nav className={clsx('container', { scrolled })}>
          <div ref={tabsRef} className='tabs'>
            {tabNames.map((tabName, idx) => (
              <div
                data-testid={`nav-tab-${tabName}`}
                key={`nav-tab-${tabName}`}
                ref={refs[idx]}
                data-tab={idx}
                onClick={handleTabClick}
                className={clsx('tab', { selected: idx === tabIndex })}
              >
                {tabName}
              </div>
            ))}

            {!scrolled && <div className='top-bar' style={{ left: barValues.left, width: barValues.width }} />}
          </div>
        </nav>

        {user && (
          <div className='avatar-container'>
            {!scrolled && <span>{user.fName}</span>}
            <Avatar src={user.avatar} className={classes.avatar} />
          </div>
        )}
      </header>

      {!!subTabNames && (
        <div className={clsx('sub-container', { scrolled })}>

          <div ref={subTabsRef} className='tabs'>
            {subTabNames.map((tabName, idx) => (
              <div
                data-testid={`nav-sub-tab-${tabName}`}
                key={`nav-sub-tab-${tabName}`}
                ref={subRefs[idx]}
                className={clsx('tab', 'sub-tab', { selected: idx === subTabIndex })}
              >
                {tabName}
              </div>
            ))}

            {scrolled && <div className='bottom-bar' style={{ left: subBarValues.left, width: subBarValues.width }} />}
          </div>
        </div>
      )}
    </div>
  )
}

export default Navigation
