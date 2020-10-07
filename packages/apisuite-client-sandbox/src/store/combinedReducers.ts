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

export default (history: History<any>) => combineReducers({
  router: connectRouter(history),
  auth,
  register,
  applications,
  settings,
  subscriptions,
  informDialog,
  notifications,
  profile,
})
