
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'
import LanguageProvider from 'containers/LanguageProvider'
import ErrorMonitor from 'components/ErrorMonitor'
import { translationMessages, formats } from 'util/i18n'
import store, { history } from 'store'
import 'typeface-roboto'
import { THEME } from 'constants/global'
import ThemeContext from 'components/ThemeContext'
import themes from 'themes'
import smoothscroll from 'smoothscroll-polyfill'
import 'assets/fortis.png'

// route components
import App from 'containers/App'

// Main Application Styles
import 'styles/app.scss'

// Theme styles
import(`themes/${THEME}/theme.scss`)

smoothscroll.polyfill()

function render (Component) {
  ReactDOM.render(
    <ErrorMonitor>
      <Provider store={store}>
        <LanguageProvider messages={translationMessages} formats={formats}>
          <ThemeContext.Provider value={themes[THEME]}>
            <ConnectedRouter history={history}>
              <Route path='/' component={Component} />
            </ConnectedRouter>
          </ThemeContext.Provider>
        </LanguageProvider>
      </Provider>
    </ErrorMonitor>,
    document.getElementById('root')
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
