import { connect } from 'react-redux'
import Dashboard from './Dashboard'
import { openSupportModal } from 'containers/Support/ducks'
import { fetchApps } from 'containers/AppsPage/ducks'
import { fetchLatestNotification } from 'containers/PortalNotification/ducks'
import withTheme from 'components/ThemeContext/withTheme'

const mapStateToProps = ({ auth, apps, portalnotifications }) => ({ auth, apps: apps.data, ...portalnotifications })

const mapDispatchToProps = (dispatch) => ({
  fetchLatestNotification: () => dispatch(fetchLatestNotification()),
  fetchApps: (organizationId) => dispatch(fetchApps(organizationId)),
  openSupportModal: option => dispatch(openSupportModal(option))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(Dashboard)
)
