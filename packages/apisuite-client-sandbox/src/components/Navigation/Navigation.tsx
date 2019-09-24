import * as React from 'react'
import clsx from 'clsx'

import { APP_URL } from 'constants/endpoints'
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

const [protocol, domain] = typeof APP_URL === 'string' ? APP_URL.split('://') : []

const Navigation: React.FC<NavigationProps> = (props) => {
  const { title, className, tabNames, tabIndex, onTabChange, onGobackClick, chevronColor, ...rest } = props
  const [scrollPos, setScrollPos] = React.useState(0)
  const [barValues, setBarValues] = React.useState({ left: 0, width: 0 })
  const refs = tabNames.map(() => React.useRef(null))
  const tabsRef = React.useRef(null)

  function scrollHandler () {
    setScrollPos(window.scrollY)
  }

  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  React.useEffect(() => {
    setBarValues(getBarValues(tabsRef, refs[tabIndex]))
  }, [tabIndex])

  // function handleTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
  //   const tabIndex = Number(currentTarget.dataset.tab) || 0

  //   if (tabIndex < tabNames.length) {
  //     onTabChange(tabIndex)
  //   }
  // }

  return (
    <nav className={clsx('navigation', className, { scrolled: scrollPos >= 40 })} {...rest}>
      <div className='container'>
        <div data-testid='nav-back' role='button' aria-label='go back' className='back-btn' onClick={onGobackClick}>
          <SvgIcon name='chevron-left-circle' size={28} /> &nbsp;&nbsp; <span>Go Back</span>
        </div>

        <div className='space' />

        <a href={APP_URL} className='domain'>
          <span>{domain}</span>
          <SvgIcon name='chevron-right' size={18} color={chevronColor} />
        </a>

        <div ref={tabsRef} className='tabs'>
          {tabNames.map((tabName, idx) => (
            <a
              data-testid={`nav-tab-${tabName}`}
              key={tabName}
              ref={refs[idx]}
              data-tab={idx}
              // onClick={handleTabClick}
              className={clsx('tab', { selected: idx === tabIndex })}
              href={`${protocol}://${tabName.toLocaleLowerCase()}.${domain}`}
            >
              {tabName}
            </a>
          ))}

          <div className='bottom-bar' style={{ left: barValues.left, width: barValues.width }} />
        </div>

        <div role='button' aria-label='support' className='support-btn'>
          <SvgIcon name='headset' size={16} color='white' />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
