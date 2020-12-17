
import * as React from 'react'

import ReactDOM from 'react-dom'

import { Provider } from 'react-redux'

import { ConnectedRouter } from 'connected-react-router'

import { createMuiTheme, Theme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/styles'
import theme from 'theme'

import store, { history } from 'store'

// Translations
import 'language/i18n'

// Main Application Styles
import 'typeface-roboto'
import 'styles/app.scss'

import App from 'containers/App'

import ErrorMonitor from 'components/ErrorMonitor'

import { config } from 'constants/global'

import 'util/extensions'

interface customTheme extends Theme {
  alert: {
    success: {
      background: string
    }
  }
  dimensions: {
    borderRadius: number
  }
  feedback: {
    error: string
  }
}

const defaultTheme = createMuiTheme(theme)

const apiSuiteCustomTheme: customTheme = {
  alert: config?.palette?.alert,
  dimensions: config?.dimensions,
  feedback: config?.palette?.feedback,
  ...defaultTheme
}

function render(Component: any) {
  // @ts-ignore
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={apiSuiteCustomTheme}>
            <Component />
          </ThemeProvider>
        </ConnectedRouter>
      </Provider>
    </ErrorMonitor>,
    document.getElementById('root'),
  )
}

render(App)

// Enable HMR for js files
if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    render(NextApp)
  })
}
