import * as React from 'react'

import { config } from 'constants/global'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import InformDialog from 'components/InformDialog'

import routes from './routes'
import { AppProps } from './types'
import { initTabs, loginTabs, gobackConfig } from './config'
import NotificationStack from 'containers/NotificationStack'

import logo from 'theme/images/logo.png'

const App: React.FC<AppProps> = ({ auth, history, loginUser, logout }) => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [currentSubTab, setCurrentSubTab] = React.useState(0)
  const [tabs, setTabs] = React.useState(initTabs)
  const [navScrolled, setNavScrolled] = React.useState(false)
  const [gobackLabel, setGobackLabel] = React.useState('')
  const [subTabs, setSubTabs] = React.useState(tabs[currentTab].subTabs)
  const [navigations, setNavigations] = React.useState(true)

  React.useEffect(() => {
    const pathname = history.location.pathname

    if (auth.authToken && !auth.user) {
      loginUser({ token: auth.authToken })
    }

    if (pathname.startsWith('/dashboard/') || pathname.startsWith('/profile')) {
      setNavScrolled(true)
    } else {
      setNavScrolled(false)
    }

    const gb = gobackConfig.find((item) => pathname.includes(item.path))

    if (pathname.startsWith('/auth') ||
    pathname.startsWith('/confirmation') ||
    pathname.startsWith('/registration') ||
    pathname.startsWith('/forgot')) {
      setNavigations(false)
    } else {
      setNavigations(true)
    }

    if (gb) {
      setGobackLabel(gb.label)
    } else {
      setGobackLabel('')
    }
  }, [history.location.pathname])

  function handleOnTabChange (index: number) {
    setCurrentTab(index)
    setSubTabs(tabs[index].subTabs)
    setCurrentSubTab(0)

    history.push(tabs[index].route)
  }

  function handleOnSubTabChange (index: number) {
    const subTabs = tabs[currentTab].subTabs

    if (Array.isArray(subTabs)) {
      setCurrentSubTab(index)
      history.push(subTabs[index].route)
    }
  }

  function handleGobackClick () {
    history.goBack()
  }

  React.useEffect(() => {
    if (auth.user) {
      const currentPath = history.location.pathname

      /* The following code, while somewhat verbose, is required to handle
      page refreshes, as the navigation menu misbehaves (by defaulting to
      Dashboard - Landing page) if we don't do this path-checking. */
      if (currentPath === '/') {
        // Home
        setTabs(loginTabs)
        setCurrentTab(0)
      } else if (currentPath === '/auth/login' || currentPath.startsWith('/dashboard')) {
        // Setting up the aftermath of a login, that leads to Dashboard
        setTabs(loginTabs)
        setCurrentTab(3)
        setSubTabs(loginTabs[3].subTabs)

        // Dashboard sub-tabs
        if (currentPath.endsWith('/subscriptions')) {
          setCurrentSubTab(1)
        } else if (currentPath.endsWith('/apps')) {
          setCurrentSubTab(2)
        } else if (currentPath.endsWith('/test')) {
          setCurrentSubTab(3)
        } else {
          setCurrentSubTab(0)
        }
      } else if (currentPath.startsWith('/profile')) {
        // Profile
        setTabs(loginTabs)
        setCurrentTab(4)
        setSubTabs(loginTabs[4].subTabs)

        // Profile sub-tabs
        if (currentPath.endsWith('/team')) {
          setCurrentSubTab(1)
        } else if (currentPath.endsWith('/organisation')) {
          setCurrentSubTab(2)
        } else {
          setCurrentSubTab(0)
        }
      }
    }
  }, [auth.user])

  return (
    <div style={{ height: '100%' }}>
      {navigations &&
        <Navigation
          key='app-navigation'
          tabs={tabs}
          subTabs={Array.isArray(subTabs) ? subTabs : undefined}
          tabIndex={currentTab}
          subTabIndex={currentSubTab}
          onTabChange={handleOnTabChange}
          onSubTabChange={handleOnSubTabChange}
          name={config.portalName}
          logoSrc={logo}
          user={auth.user}
          forceScrolled={navScrolled}
          showBackButton={gobackLabel.length > 0}
          backButtonLabel={gobackLabel}
          onGoBackCLick={handleGobackClick}
          logout={logout}
        />}

      {routes()}

      {navigations && <Footer />}

      <InformDialog />

      <NotificationStack />
    </div>
  )
}

export default App
