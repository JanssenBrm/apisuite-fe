import * as React from 'react'
import clsx from 'clsx'
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

const Navigation: React.FC<NavigationProps> = (props) => {
  const { title, className, tabNames, tabIndex, onTabChange, ...rest } = props
  const [barValues, setBarValues] = React.useState({ left: 0, width: 0 })
  const refs = tabNames.map(() => React.useRef(null))
  const tabsRef = React.useRef(null)

  React.useEffect(() => {
    setBarValues(getBarValues(tabsRef, refs[tabIndex]))
  }, [tabIndex])

  function handleTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const tabIndex = Number(currentTarget.dataset.tab) || 0

    if (tabIndex < tabNames.length) {
      onTabChange(tabIndex)
    }
  }

  return (
    <div className={clsx('navigation', className)} {...rest}>
      <header>
        <img src={props.logoSrc} alt='logo' />

        <h1>CLOUDOKI <b>SANDBOX</b></h1>
      </header>

      <nav className='container'>
        <div ref={tabsRef} className='tabs'>
          {tabNames.map((tabName, idx) => (
            <div
              data-testid={`nav-tab-${tabName}`}
              key={tabName}
              ref={refs[idx]}
              data-tab={idx}
              onClick={handleTabClick}
              className={clsx('tab', { selected: idx === tabIndex })}
            >
              {tabName}
            </div>
          ))}

          <div className='top-bar' style={{ left: barValues.left, width: barValues.width }} />
        </div>
      </nav>
    </div>
  )
}

export default Navigation
