/*
 * Combine all sagas in the this file and export them.
 */

import auth from 'containers/Auth/sagas'
import register from 'components/RegisterForm/sagas'
import settings from 'containers/Settings/sagas'
import informDialog from 'components/InformDialog/sagas'
import applications from 'containers/Applications/sagas'
import subscriptions from 'containers/Subscriptions/sagas'
import profile from 'containers/Profile/sagas'
import apiDetails from 'containers/APIDetails/sagas'
import security from 'containers/Security/sagas'

const sagas = [
  auth,
  register,
  settings,
  applications,
  subscriptions,
  informDialog,
  profile,
  apiDetails,
  security,
]

export default sagas
