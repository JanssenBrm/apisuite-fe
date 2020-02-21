/*
 * Combine all sagas in the this file and export them.
 */

import auth from 'containers/Auth/sagas'
import register from 'components/RegisterPortal/sagas'
import applications from 'containers/Applications/sagas'
import app from 'containers/App/sagas'
import subscriptions from 'containers/Subscriptions/sagas'

const sagas = [
  auth,
  register,
  applications,
  app,
  subscriptions,
]

export default sagas
