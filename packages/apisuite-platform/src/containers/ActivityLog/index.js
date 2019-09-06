import { connect } from 'react-redux'
import ActivityLog from './ActivityLog'
import { fetchActivities, fetchKpis } from './ducks'
import { injectIntl } from 'react-intl'

const mapStateToProps = ({ auth, activity }) => ({
  user: auth.user,
  logs: activity.logs,
  kpis: activity.kpis,
  ui: activity.ui
})

const mapDispatchToProps = (dispatch) => ({
  fetchActivities: (filters) => dispatch(fetchActivities(filters)),
  fetchKpis: () => dispatch(fetchKpis())
})

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(ActivityLog))
