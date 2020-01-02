import * as React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import requireImage from 'util/requireImage'

import { config } from 'constants/global'
import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

import theme from './theme'
import routes from './routes'
import { AppProps } from './types'
import { initTabs, loginTabs, gobackConfig } from './config'

const App: React.FC<AppProps> = ({ user, login, history }) => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [currentSubTab, setCurrentSubTab] = React.useState(0)
  const [tabs, setTabs] = React.useState(initTabs)
  const [navScrolled, setNavScrolled] = React.useState(false)
  const [gobackLabel, setGobackLabel] = React.useState('')

  React.useEffect(() => {
    const pathname = history.location.pathname
    if (pathname.startsWith('/dashboard/apps')) {
      setNavScrolled(true)
    } else {
      setNavScrolled(false)
    }

    const gb = gobackConfig.find((item) => item.path === pathname)

    if (gb) {
      setGobackLabel(gb.label)
    } else {
      setGobackLabel('')
    }
  }, [history.location.pathname])

  function handleOnTabChange (index: number) {
    setCurrentTab(index)
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

  const subTabs = tabs[currentTab].subTabs

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        key='app-navigation'
        tabs={tabs.map((tab) => tab.label)}
        subTabs={Array.isArray(subTabs) ? subTabs.map((tab) => tab.label) : undefined}
        tabIndex={currentTab}
        subTabIndex={currentSubTab}
        onTabChange={handleOnTabChange}
        onSubTabChange={handleOnSubTabChange}
        name={config.navbar.name}
        logoSrc={requireImage(config.navbar.logoUrl)}
        user={user}
        forceScrolled={navScrolled}
        showBackButton={gobackLabel.length > 0}
        backButtonLabel={gobackLabel}
        onGoBackCLick={handleGobackClick}
      />

      {routes()}
      <Footer />
    </ThemeProvider>
  )
}

export default App
