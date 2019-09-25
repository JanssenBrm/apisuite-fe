import * as React from 'react'

import Navigation from 'components/Navigation'
import Footer from 'components/Footer'

import routes from './routes'
import './styles.scss'
import { AppProps, AppState } from './types'

const tabs = [
  {
    name: 'Portal',
    route: '/',
    chevronColor: '#14BC7D',
  },
  {
    name: 'Sandbox',
    route: '/sandbox',
    chevronColor: '#2DB7BA',
  },
  {
    name: 'Marketplace',
    route: '/marketplace',
    chevronColor: '#14DE2D',
  },
  {
    name: 'SSO',
    route: '/sso',
    chevronColor: '#F5A623',
  },
]

class App extends React.Component<AppProps, AppState> {
  public state = {
    currentTab: -1,
  }

  public static getDerivedStateFromProps (nextProps: AppProps, prevState: AppState) {
    const nextIndx = tabs.findIndex((tab) => tab.route === nextProps.location.pathname)

    if (nextIndx !== prevState.currentTab) {
      return { currentTab: nextIndx }
    }

    return null
  }

  public render () {
    return (
      <>
        <Navigation
          key='app-navigation'
          tabNames={tabs.map((tab) => tab.name)}
          tabIndex={3}
          onTabChange={this.handleTabChange}
          onGobackClick={this.handleGoBack}
          chevronColor={tabs[3].chevronColor}
        />

        {routes()}

        <Footer />
      </>
    )
  }

  private handleTabChange = (indx: number) => {
    this.props.history.push(tabs[indx].route)
  }

  private handleGoBack = () => {
    this.props.history.goBack()
  }
}

export default App
