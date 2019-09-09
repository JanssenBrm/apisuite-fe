import { compose } from 'recompose'
import { connect } from 'react-redux'
import withTheme from '../../components/ThemeContext/withTheme'
import ApiSubscriptions from './ApiSubscriptions'
import { injectIntl } from 'react-intl'
import { fetchApiSubscriptions, createApiSubscription } from 'containers/ApiSubscriptions/ducks'
import { fetchApps } from 'containers/AppsPage/ducks'

const mapStateToProps = ({ auth, subscriptions, apps }) => ({
  auth,
  subscriptions,
  apps: apps.data,
})

const mapDispatchToProps = (dispatch) => ({
  fetchApiSubscriptions: () => dispatch(fetchApiSubscriptions()),
  createApiSubscription: (organizationId, productIds) => dispatch(createApiSubscription(organizationId, productIds)),
  fetchApps: (organizationId) => dispatch(fetchApps(organizationId)),
})

const Enhanced = compose(
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withTheme
)(ApiSubscriptions)

export default Enhanced
