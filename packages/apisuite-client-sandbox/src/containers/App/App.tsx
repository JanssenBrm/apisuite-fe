import * as React from 'react'
import { ThemeProvider } from '@material-ui/styles'

import Footer from 'components/Footer'

import theme from './theme'
import routes from './routes'
import { AppProps } from './types'
import Navigation from 'components/Navigation'
import logoSrc from 'assets/api-logo.png'
import { initTabs, loginTabs } from './config'

const App: React.FC<AppProps> = ({ user, login, history }) => {
  const [currentTab, setCurrentTab] = React.useState(0)
  const [tabs, setTabs] = React.useState(initTabs)

  function handleOnTabChange (index: number) {
    if (index === 2 && !user) {
      login({ email: 'foo@email.com', password: '1234567890' })
      setTabs(loginTabs)
      setCurrentTab(3)

      history.push(loginTabs[3].route)
    } else {
      setCurrentTab(index)
      history.push(tabs[index].route)
    }
  }

  const subTabs = tabs[currentTab].subTabs

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        key='app-navigation'
        tabNames={tabs.map((tab) => tab.name)}
        subTabNames={Array.isArray(subTabs) ? subTabs.map((tab) => tab.name) : undefined}
        tabIndex={currentTab}
        subTabIndex={0}
        onTabChange={handleOnTabChange}
        logoSrc={logoSrc}
        user={user}
      />

      {routes()}
      <Footer />
    </ThemeProvider>
  )
}

export default App
