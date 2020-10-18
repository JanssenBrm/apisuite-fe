import * as React from 'react'

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

  React.useEffect(function initOnce () {
    getSettings()
  }, [])

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

    if (
      pathname.startsWith('/auth') ||
      pathname.startsWith('/confirmation') ||
      pathname.startsWith('/registration') ||
      pathname.startsWith('/forgot')
    ) {
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

  function handleGobackClick () {
    history.goBack()
  }

  React.useEffect(() => {
    setActiveMenuName(auth.user ? 'login' : 'init')
  }, [auth.user])

  return (
    <div style={{ height: '100%' }}>
      {navigations &&
        <Navigation
          key='app-navigation'
          tabs={activeMenu}
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
