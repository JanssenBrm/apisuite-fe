/*
 * Redux Store
 */

import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { routerMiddleware } from 'connected-react-router'
import { createBrowserHistory } from 'history'
import Reactotron from 'reactotron-react-js'
import reactotronConfig from 'util/reactotronConfig'

import combinedReducers from './combinedReducers'
import combinedSagas from './combinedSagas'

import { appMiddleware } from 'containers/App/ducks'

export const history = createBrowserHistory()
// Build the middleware for intercepting and dispatching navigation actions
const sagaMiddlewareOpts: any = {}

if (process.env.NODE_ENV === 'development') {
  sagaMiddlewareOpts.sagaMonitor = Reactotron.createSagaMonitor!()
}

const sagaMiddleware = createSagaMiddleware(sagaMiddlewareOpts)

const routingMiddleware = routerMiddleware(history)

const middleware = [sagaMiddleware, routingMiddleware, appMiddleware]

let composedMiddleware

if (process.env.NODE_ENV === 'development') {
  composedMiddleware = compose(applyMiddleware(...middleware), reactotronConfig.createEnhancer!())
} else {
  composedMiddleware = applyMiddleware(...middleware)
}

const store = createStore(combinedReducers(history), composedMiddleware)

combinedSagas.forEach((saga) => {
  sagaMiddleware.run(saga)
})

export default store
