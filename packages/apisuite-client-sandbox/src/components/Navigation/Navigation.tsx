import * as React from 'react'
import clsx from 'clsx'
import Avatar from '@material-ui/core/Avatar'
import SvgIcon from 'components/SvgIcon'
import InformDialog from 'components/InformDialog'
import './styles.scss'
import { NavigationProps } from './types'
import { InformTarget } from 'containers/App/types'

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

const tabsRange = Array.from(Array(10).keys())

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
    name,
    logoSrc,
    user,
    forceScrolled,
    showBackButton,
    backButtonLabel,
    onGoBackCLick,
    logout,
    inform,
    requesting,
    requestError,
    ...rest
  } = props

  const [scrollPos, setScrollPos] = React.useState(0)
  const [barValues, setBarValues] = React.useState({ left: 0, width: 0 })
  const [subBarValues, setSubBarValues] = React.useState({ left: 0, width: 0 })
  const tabsRef = React.useRef(null)
  const subTabsRef = React.useRef(null)
  const [openDialog, setOpenDialog] = React.useState(false)
  const [textTarget, setTextTarget] = React.useState('')
  const [titleTarget, setTitleTarget] = React.useState('')
  const [informTarget, setInformTarget] = React.useState<InformTarget>('portal')

  // TODO: this needs another look into it, right now tabs and sub tabs are limit to 10 each.
  const refs = tabsRange.map(() => React.useRef(null))
  const subRefs = tabsRange.map(() => React.useRef(null))
  const scrolled = scrollPos >= 10

  function scrollHandler () {
    setScrollPos(window.scrollY)
  }

  function handleTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const { tab, disabled } = currentTarget.dataset
    const tabIndex = Number(tab) || 0

    if (disabled) {
      setOpenDialog(true)
      setTitleTarget('Keep me posted')
      setTextTarget("Whoah! We're not quite there yet but we promise to let you know the minute we launch the full product version!")
      setInformTarget('portal')
    } else if (tabIndex < tabs.length) {
      onTabChange(tabIndex)
    }
  }

  function handleSubTabClick ({ currentTarget }: React.MouseEvent<HTMLDivElement>) {
    const { tab, disabled } = currentTarget.dataset
    const tabIndex = Number(tab) || 0

    if (disabled) {
      setOpenDialog(true)
      setTitleTarget('Keep me posted')
      setTextTarget("Whoah! We're not quite there yet but we promise to let you know the minute we launch the full product version!")
      setInformTarget('portal')
    } else if (tabIndex < subTabs!.length) {
      onSubTabChange(tabIndex)
    }
  }

  function handleConfirm (email: string) {
    inform({
      email: email,
      target: informTarget,
    })
  }

  function closeDialog () {
    if (!requesting) {
      setOpenDialog(false)
    }
  }

  function handleCancel () {
    setOpenDialog(false)
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

  React.useEffect(() => {
    if (!requesting && !requestError) {
      closeDialog()
    }
  }, [requesting])

  return (
    <div className={clsx('navigation', className, { scrolled: scrolled || forceScrolled })} {...rest}>
      <header className={clsx({ scrolled: scrolled || forceScrolled })}>
        <img src={logoSrc} alt='logo' className='img' />

        <h1>{name} <b>SANDBOX</b></h1>

        <nav className={clsx('container', { scrolled: scrolled || forceScrolled })}>
          <div ref={tabsRef} className='tabs'>
            <div className='space' />

            {tabs.map((tab, idx) => (
              <div
                data-testid={`nav-tab-${idx}`}
                key={`nav-tab-${idx}`}
                ref={refs[idx]}
                data-tab={idx}
                data-label={tab.label}
                onClick={handleTabClick}
                className={clsx('tab', { selected: idx === tabIndex })}
                data-disabled={tab.disabled}
              >
                {tab.label}
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
            <Avatar className='avatar' onClick={logout}><SvgIcon name='logout' size={20} /></Avatar>
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
                data-disabled={subTab.disabled}
              >
                {subTab.label}
              </div>
            ))}

            {(scrolled || forceScrolled) && (
              <div className='bottom-bar' style={{ left: subBarValues.left, width: subBarValues.width }} />
            )}
          </div>
        </div>
      )}

      <InformDialog
        textTarget={textTarget}
        titleTarget={titleTarget}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        open={openDialog}
      />

    </div>
  )
}

export default Navigation
