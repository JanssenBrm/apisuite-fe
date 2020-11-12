
import * as React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { createMuiTheme } from '@material-ui/core/styles'
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

import 'util/extensions'

function render (Component: any) {
  // @ts-ignore
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ThemeProvider theme={createMuiTheme(theme)}>
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
