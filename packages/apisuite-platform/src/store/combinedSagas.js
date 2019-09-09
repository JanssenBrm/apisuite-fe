/*
 *
 * Combine all sagas in the this file
 * and export them.
 *
 */

import AuthSagas from 'containers/Auth/sagas'
import SignupSagas from 'containers/Signup/sagas'
import AppsSagas from 'containers/AppsPage/sagas'
import SupportSagas from 'containers/Support/sagas'
import ProfileSagas from 'containers/Profile/sagas'
import TestDataSagas from 'containers/TestData/sagas'
import ProductsSagas from 'containers/LandingPage/sagas'
import SubscriptionsSagas from 'containers/ApiSubscriptions/sagas'
import MonitorSagas from 'containers/Monitor/sagas'
import NewsletterSagas from 'containers/Newsletter/sagas'
import RecoverySagas from 'containers/RecoveryCodes/sagas'
import ApiSagas from 'containers/Api/sagas'
import ScenariosSagas from 'containers/Scenarios/sagas'
import TeamSagas from 'containers/Team/sagas'
import ActivityLogSagas from 'containers/ActivityLog/sagas'
import ExternalResourcesSagas from 'containers/ExternalResources/sagas'
import PortalNotificationSagas from 'containers/PortalNotification/sagas'

const sagas = [
  ...AuthSagas,
  ...SignupSagas,
  ...AppsSagas,
  ...SupportSagas,
  ...ProfileSagas,
  ...TestDataSagas,
  ...ProductsSagas,
  ...SubscriptionsSagas,
  ...MonitorSagas,
  ...NewsletterSagas,
  ...RecoverySagas,
  ...ApiSagas,
  ...ScenariosSagas,
  ...TeamSagas,
  ...ActivityLogSagas,
  ...ExternalResourcesSagas,
  ...PortalNotificationSagas,
]

export default sagas
