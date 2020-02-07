/*
 * Combine all sagas in the this file and export them.
 */

import auth from 'containers/Auth/sagas'
import register from 'components/RegisterPortal/sagas'
import applications from 'containers/Applications/sagas'

const sagas = [
  auth,
  register,
  applications,
]

export default sagas
