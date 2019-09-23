import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth, { ForgotPassword } from 'containers/Auth'
import Signup, { SuccessPage } from 'containers/Signup'
import LandingPage from 'containers/LandingPage'
import NotFound from 'components/NotFound'
import Dashboard from 'containers/Dashboard'
import ApiDetail from 'components/ApiDetail'
import ApiReferences from 'components/ApiReferences'
import ApiSubscriptions from 'containers/ApiSubscriptions'
import Api from 'containers/Api'
import Profile, { OrganisationSection } from 'containers/Profile'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Cookies from 'components/Cookies'
import AppsPage, { AppDetail } from 'containers/AppsPage'
import RecoveryCodes from 'containers/RecoveryCodes'
import TestData, { TestDetail, TransactionHistory } from 'containers/TestData'
import Team from 'containers/Team'
// import ActivityLog from 'containers/ActivityLog'

/**
 * Add routes here
 * - should the route be protected by auth? - `protected: true`
 */
export const routesConfig = [
  { path: '/', exact: true, component: LandingPage, footer: true },
  { path: '/forgot', component: ForgotPassword, footer: true },
  { path: '/recovery', component: LandingPage, footer: true },
  { path: '/signup', exact: true, component: Signup, footer: true },
  { path: '/signup/done', component: SuccessPage, footer: true },
  { path: '/dashboard', exact: true, component: requireAuth(Dashboard), footer: true },
  { path: '/apps', component: requireAuth(AppsPage), footer: true, exact: true },
  { path: '/apps/:appId', component: requireAuth(AppDetail), footer: true, exact: true },
  { path: '/testdata', component: requireAuth(TestData), footer: true, exact: true },
  { path: '/testdata/:psuId', component: requireAuth(TestDetail), footer: true, exact: true },
  { path: '/testdata/:psuId/transactions/:resourceId', component: requireAuth(TransactionHistory), footer: true, exact: true },
  // { path: '/activity-log', component: requireAuth(ActivityLog), footer: true },
  { path: '/api-detail', component: ApiDetail, footer: true, exact: true },
  { path: '/api-detail/:productId', component: ApiDetail, footer: true },
  { path: '/api/:brand/:productId/:role/:version', component: requireAuth(Api), exact: true, footer: true },
  { path: '/api-references', component: requireAuth(ApiReferences), footer: true },
  { path: '/api-subscriptions', component: requireAuth(ApiSubscriptions), footer: true },
  { path: '/profile', component: requireAuth(Profile), footer: true },
  { path: '/team', component: requireAuth(Team), footer: true },
  { path: '/organisation', component: requireAuth(OrganisationSection), footer: true },
  { path: '/recovery-codes', component: RecoveryCodes, footer: true },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { path: '/cookies', component: Cookies },
  { component: NotFound, footer: true },
]

export default () => (
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        protected={route.protected}
        component={route.component}
      />
    )}
  </Switch>
)
