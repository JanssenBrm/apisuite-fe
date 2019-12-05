/*
 * Redux Store
 */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

import { appMiddleware } from 'containers/App/ducks'

export const history = createBrowserHistory()
// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddlewareOpts: any = {}

const sagaMiddleware = createSagaMiddleware()

const routingMiddleware = routerMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, appMiddleware]

let composedMiddleware

if (process.env.NODE_ENV === 'development') {
  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : composeWithDevTools
  middleware.push(createLogger())
  composedMiddleware = composeEnhancer(applyMiddleware(...middleware))
} else {
  composedMiddleware = applyMiddleware(...middleware)
}

const store = createStore(combinedReducers(history), composedMiddleware)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
