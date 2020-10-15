/*
 * Combine all reducers in the this file and export them.
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'

import register from 'components/RegisterForm/ducks'
import informDialog from 'components/InformDialog/ducks'
import auth from 'containers/Auth/ducks'
import applications from 'containers/Applications/ducks'
import settings from 'containers/Settings/ducks'
import subscriptions from 'containers/Subscriptions/ducks'
import notifications from 'containers/NotificationStack/ducks'
import profile from 'containers/Profile/ducks'
import reduceReducers from './reduceReducers'

export default (
  history: History<any>, additionalReducers: Record<string, any[]> = {},
) => {
  const reducers: Record<string, any[]> = {
    router: [connectRouter(history)],
    auth: [auth],
    register: [register],
    applications: [applications],
    settings: [settings],
    subscriptions: [subscriptions],
    informDialog: [informDialog],
    notifications: [notifications],
    profile: [profile],
  }

  Object.keys(additionalReducers).map((key) => {
    if (!reducers[key]) {
      reducers[key] = []
    }
    reducers[key] = [...reducers[key], ...additionalReducers[key]]
  })

  const reducedReducers = Object.keys(reducers).reduce((accum, key) => {
    return {
      ...accum,
      [key]: reduceReducers(...reducers[key]),
    }
  }, {})

  return combineReducers(reducedReducers)
}
