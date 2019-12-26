/*
 * Combine all sagas in the this file and export them.
 */

import auth from 'containers/Auth/sagas'
import register from 'components/RegisterPortal/sagas'

const sagas = [
  auth,
  register,
]

export default sagas
