/*
* Combine all sagas in the this file and export them.
*/

import apiDetails from 'containers/APIDetails/sagas'
import applications from 'containers/Applications/sagas'
import auth from 'containers/Auth/sagas'
import invitation from 'components/InvitationForm/sagas'
import informDialog from 'components/InformDialog/sagas'
import profile from 'containers/Profile/sagas'
import register from 'components/SignUpForm/sagas'
import security from 'containers/Security/sagas'
import subscriptions from 'containers/Subscriptions/sagas'

const sagas = [
  apiDetails,
  applications,
  auth,
  informDialog,
  invitation,
  profile,
  register,
  security,
  subscriptions,
]

export default sagas
