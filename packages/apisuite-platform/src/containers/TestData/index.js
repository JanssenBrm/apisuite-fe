import { connect } from 'react-redux'
import TestData from './TestData'
import TestDetailComponent from './TestDetail'
import TransactionHistoryComponent from './TransactionHistory'
import { injectIntl } from 'react-intl'
import { openSupportModal } from 'containers/Support/ducks'
import { fetchTestData, getTestUser, createTestUser, updateTestUser, getTestUserAccounts, getTestUserTransactions } from 'containers/TestData/ducks'
import { fetchApps, createApp } from 'containers/AppsPage/ducks'
import withTheme from 'components/ThemeContext/withTheme'
import { fetchApiSubscriptions, createApiSubscription } from 'containers/ApiSubscriptions/ducks'

const mapStateToProps = ({ apps, testdata, auth, subscriptions }) => (
  {
    testusers: testdata.data,
    accounts: testdata.accounts,
    ui: testdata.ui,
    apps: apps.data,
    user: auth.user,
    subscriptions,
  }
)

const mapDispatchToProps = (dispatch) => ({
  openSupportModal: option => dispatch(openSupportModal(option)),
  fetchTestData: (page, pageSize) => dispatch(fetchTestData(page, pageSize)),
  fetchApps: (organizationId) => dispatch(fetchApps(organizationId)),
  createApp: (organizationId, app) => dispatch(createApp(organizationId, app)),
  fetchApiSubscriptions: () => dispatch(fetchApiSubscriptions()),
  createApiSubscription: (organizationId, productIds) => dispatch(createApiSubscription(organizationId, productIds)),
  createTestUser: (organizationId, user) => dispatch(createTestUser(organizationId, user)),
  getTestUserAccounts: () => dispatch(getTestUserAccounts()),
})

export default injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(
    withTheme(TestData)
  )
)

const detailMapStateToProps = ({ testdata, auth }) => ({
  testuser: testdata.testuser,
  organizations: auth.user.organizations,
})

const detailDispatchToProps = (dispatch) => ({
  getTestUser: (organizationId, psuId) => dispatch(getTestUser(organizationId, psuId)),
  updateTestUser: (organizationId, psuId, data) => dispatch(updateTestUser(organizationId, psuId, data)),
})

export const TestDetail = injectIntl(connect(detailMapStateToProps, detailDispatchToProps)(TestDetailComponent))

const historyMapStateToProps = ({ testdata, auth }) => ({
  testuser: testdata.testuser,
  organizations: auth.user.organizations,
  transactions: testdata.transactions,
})

const historyDispatchToProps = (dispatch) => ({
  getTestUserTransactions: (organizationId, resourceId) => dispatch(getTestUserTransactions(organizationId, resourceId)),
})

export const TransactionHistory = injectIntl(connect(historyMapStateToProps, historyDispatchToProps)(TransactionHistoryComponent))
