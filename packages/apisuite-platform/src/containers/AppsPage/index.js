import { connect } from 'react-redux'
import { fetchApps, getApp, updateApp, deleteApp, createApp } from 'containers/AppsPage/ducks'
import AppsPage from './AppsPage'
import AppDetailComponent from './AppDetail'
import { injectIntl } from 'react-intl'
import withTheme from 'components/ThemeContext/withTheme'
import { fetchApiSubscriptions } from 'containers/ApiSubscriptions/ducks'

const mapStateToProps = ({ apps, auth, subscriptions }) => ({
  apps: apps.data,
  ui: apps.ui,
  user: auth.user,
  subscriptions,
})

const mapDispatchToProps = (dispatch) => ({
  fetchApps: (organizationId) => dispatch(fetchApps(organizationId)),
  createApp: (organizationId, app) => dispatch(createApp(organizationId, app)),
  fetchApiSubscriptions: () => dispatch(fetchApiSubscriptions()),
})

export default connect(mapStateToProps, mapDispatchToProps)(
  withTheme(AppsPage)
)

const appDetailMapStateToProps = ({ apps, auth, subscriptions }) => ({
  app: apps.app,
  organizations: auth.user.organizations,
  user: auth.user,
  subscriptions,
})

const appDetailMapDispatchToProps = (dispatch) => ({
  getApp: (organizationId, appId) => dispatch(getApp(organizationId, appId)),
  updateApp: (organizationId, data) => dispatch(updateApp(organizationId, data)),
  deleteApp: (organizationId, appId) => dispatch(deleteApp(organizationId, appId)),
  createApp: (organizationId, app) => dispatch(createApp(organizationId, app)),
  fetchApiSubscriptions: () => dispatch(fetchApiSubscriptions()),
})

export const AppDetail = injectIntl(connect(appDetailMapStateToProps, appDetailMapDispatchToProps)(AppDetailComponent))
