import { connect } from 'react-redux'
import { fetchOrgActions, updateOrgActions } from 'containers/Profile/ducks'
import {
  Dispatch,
  bindActionCreators,
} from 'redux'
import { Store } from 'store/types'
import OrganizationPage from './OrganizationPage'

export const mapStateToProps = ({ profile }: Store) => ({
  org: profile.org,
  profile: profile.profile,
})

export const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators({
  fetchOrg: fetchOrgActions.request,
  updateOrg: updateOrgActions.request,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationPage)
