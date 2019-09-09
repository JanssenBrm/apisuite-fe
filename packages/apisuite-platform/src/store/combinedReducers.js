/*
 *
 * Combine all reducers in the this file
 * and export them.
 *
 */

import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

import auth from 'containers/Auth/ducks'
import signup from 'containers/Signup/ducks'
import lang from 'containers/LanguageProvider/ducks'
import notifications from 'containers/NotificationManager/ducks'
import documentation from 'containers/Documentation/ducks'
import apps from 'containers/AppsPage/ducks'
import support from 'containers/Support/ducks'
import organizations from 'containers/Profile/ducks'
import testdata from 'containers/TestData/ducks'
import products from 'containers/LandingPage/ducks'
import subscriptions from 'containers/ApiSubscriptions/ducks'
import newsletter from 'containers/Newsletter/ducks'
import recovery from 'containers/RecoveryCodes/ducks'
import apidocs from 'containers/Api/ducks'
import scenarios from 'containers/Scenarios/ducks'
import team from 'containers/Team/ducks'
import activity from 'containers/ActivityLog/ducks'
import resources from 'containers/ExternalResources/ducks'
import portalnotifications from 'containers/PortalNotification/ducks'

export default (history) => combineReducers({
  router: connectRouter(history),
  auth,
  signup,
  lang,
  notifications,
  documentation,
  apps,
  support,
  organizations,
  testdata,
  products,
  subscriptions,
  newsletter,
  recovery,
  apidocs,
  scenarios,
  team,
  activity,
  resources,
  portalnotifications,
})
