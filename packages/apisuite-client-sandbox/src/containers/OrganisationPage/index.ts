import { connect } from 'react-redux'
import {
  fetchOrgActions,
  updateOrgActions,
  resetErrorAction,
  createOrgActions,
} from 'containers/Profile/ducks'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'
import OrganisationPage from './OrganisationPage'

export const mapStateToProps = ({ profile }: Store) => ({
  org: profile.org,
  profile: profile.profile,
  requestStatutes: profile.requestStatuses,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchOrg: fetchOrgActions.request,
  createOrg: createOrgActions.request,
  updateOrg: updateOrgActions.request,
  resetErrors: resetErrorAction,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganisationPage)
