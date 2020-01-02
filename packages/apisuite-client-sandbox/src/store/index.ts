/*
 * Redux Store
 */

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import { createLogger } from 'redux-logger'
import { composeWithDevTools } from 'redux-devtools-extension'
import { createAuthMiddleware } from 'containers/Auth/ducks'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

export const history = createBrowserHistory()

const sagaMiddleware = createSagaMiddleware()
const routingMiddleware = routerMiddleware(history)
const authMiddleware = createAuthMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, authMiddleware]

let composedMiddleware

if (process.env.NODE_ENV === 'development') {
  const composeEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : composeWithDevTools
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
