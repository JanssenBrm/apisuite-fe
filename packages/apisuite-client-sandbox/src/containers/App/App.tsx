import * as React from 'react'
import { ThemeProvider } from '@material-ui/styles'

import Footer from 'components/Footer'

import theme from './theme'
import routes from './routes'
import { AppProps } from './types'
import Navigation from 'components/Navigation'
import logoSrc from 'assets/api-logo.png'

const tabs = [
  {
    name: 'Sandbox Features',
    route: '/',
  },
  {
    name: 'Contact',
    route: '/contact',
  },
  {
    name: 'Log in',
    route: '/login',
  },
  {
    name: 'Demo',
    route: '/demo',
  },
]

const App: React.FC<AppProps> = () => {
  const [currentTab, setCurrentTab] = React.useState(0)

  return (
    <ThemeProvider theme={theme}>
      <Navigation
        key='app-navigation'
        tabNames={tabs.map((tab) => tab.name)}
        tabIndex={currentTab}
        onTabChange={setCurrentTab}
        logoSrc={logoSrc}
      />

      {routes()}
      <Footer />
    </ThemeProvider>
  )
}

export default App
