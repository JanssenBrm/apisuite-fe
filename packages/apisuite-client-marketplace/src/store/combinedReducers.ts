/*
 * Combine all reducers in the this file and export them.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import app from 'containers/App/ducks'

export default (history: History<any>) => combineReducers({
  router: connectRouter(history),
  app,
})
