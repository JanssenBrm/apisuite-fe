import * as React from 'react'

// import { config } from 'constants/global'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'
import InformDialog from 'components/InformDialog'

import routes from './routes'
import { AppProps, TabMenus } from './types'
import { gobackConfig, useTabs } from './config'
import NotificationStack from 'containers/NotificationStack'

import logo from 'theme/images/current_APISuite_logo.png'

const App: React.FC<AppProps> = ({
  auth,
  history,
  getSettings,
  loginUser,
  logout,
}) => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [currentSubTab, setCurrentSubTab] = React.useState(0)
  const [activeMenuName, setActiveMenuName] = React.useState('init')
  const [navScrolled, setNavScrolled] = React.useState(false)
  const [gobackLabel, setGobackLabel] = React.useState('')
  const [navigations, setNavigations] = React.useState(true)
  const [initTabs, loginTabs] = useTabs()
  const allTabs: TabMenus = {
    init: initTabs,
    login: loginTabs,
  }
  const activeMenu = allTabs[activeMenuName]
  const subTabs = activeMenu[currentTab].subTabs

  React.useEffect(() => {
    const pathname = history.location.pathname

    getSettings()

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
    // For tabs and sub-tabs with external links
    if (!activeMenu[index].route.startsWith('/')) {
      window.open(activeMenu[index].route, '_blank')

      return
    }

    // For tabs and sub-tabs without external links (i.e., for project navigation)
    setCurrentTab(index)
    setCurrentSubTab(0)

    history.push(activeMenu[index].route)
  }

  function handleOnSubTabChange (index: number) {
    const subTabs = activeMenu[currentTab].subTabs

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
        setActiveMenuName('login')
        setCurrentTab(0)
      } else if (currentPath === '/auth/login' || currentPath.startsWith('/dashboard')) {
        // Setting up the aftermath of a login, that leads to Dashboard
        if (!loginTabs[3]) {
          return
        }
        setActiveMenuName('login')
        setCurrentTab(3)

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
        setActiveMenuName('login')
        setCurrentTab(4)

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
          tabs={activeMenu}
          subTabs={Array.isArray(subTabs) ? subTabs : undefined}
          tabIndex={currentTab}
          subTabIndex={currentSubTab}
          onTabChange={handleOnTabChange}
          onSubTabChange={handleOnSubTabChange}
          // The previous value of this property was '{config.portalName}'
          name=''
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
