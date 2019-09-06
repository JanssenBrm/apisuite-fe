import React from 'react'
import { Route, Switch } from 'react-router'

import requireAuth, { ForgotPassword } from 'containers/Auth'
import Signup, { SuccessPage } from 'containers/Signup'
import LandingPage from 'containers/LandingPage'
import GitHubLogin from 'containers/GitHubLogin'
import NotFound from 'components/NotFound'
import Dashboard from 'containers/Dashboard'
import ApiDetail from 'components/ApiDetail'
import ApiReferences from 'components/ApiReferences'
// import ExternalResources from 'containers/ExternalResources'
import ApiSubscriptions from 'containers/ApiSubscriptions'
import Api from 'containers/Api'
import Documentation from 'containers/Documentation'
import Profile, { OrganisationSection } from 'containers/Profile'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Cookies from 'components/Cookies'
import AppsPage, { AppDetail } from 'containers/AppsPage'
import RecoveryCodes from 'containers/RecoveryCodes'
import TestData, { TestDetail, TransactionHistory } from 'containers/TestData'
import Scenarios from 'containers/Scenarios'
import Team from 'containers/Team'
import ScenariosManual from 'containers/Scenarios/ScenariosManual'
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
  { path: '/dashboard', exact: true, component: requireAuth(Dashboard), protected: true, footer: true },
  { path: '/apps', component: requireAuth(AppsPage), protected: true, footer: true, exact: true },
  { path: '/apps/:appId', component: requireAuth(AppDetail), protected: true, footer: true, exact: true },
  { path: '/testdata', component: requireAuth(TestData), protected: true, footer: true, exact: true },
  { path: '/testdata/:psuId', component: requireAuth(TestDetail), protected: true, footer: true, exact: true },
  { path: '/testdata/:psuId/transactions/:resourceId', component: requireAuth(TransactionHistory), protected: true, footer: true, exact: true },
  // { path: '/activity-log', component: requireAuth(ActivityLog), protected: true, footer: true },
  { path: '/github', component: GitHubLogin, footer: true },
  { path: '/api-detail', component: ApiDetail, footer: true, exact: true },
  { path: '/api-detail/:productId', component: ApiDetail, footer: true },
  { path: '/api/:brand/:productId/:role/:version', component: requireAuth(Api), protected: true, exact: true, footer: true },
  { path: '/api-references', component: requireAuth(ApiReferences), protected: true, footer: true },
  // { path: '/external-resources', component: requireAuth(ExternalResources), protected: true, footer: true },
  { path: '/api-subscriptions', component: requireAuth(ApiSubscriptions), protected: true, footer: true },
  { path: '/docs', component: requireAuth(Documentation), protected: true },
  { path: '/scenarios', component: requireAuth(Scenarios), protected: true, exact: true, footer: true },
  { path: '/scenarios/manual', component: requireAuth(ScenariosManual), protected: true, exact: true, footer: true },
  { path: '/profile', component: requireAuth(Profile), protected: true, footer: true },
  { path: '/team', component: requireAuth(Team), protected: true, footer: true },
  { path: '/organisation', component: requireAuth(OrganisationSection), protected: true, footer: true },
  { path: '/recovery-codes', component: RecoveryCodes, footer: true },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { path: '/cookies', component: Cookies },
  { component: NotFound, footer: true }
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
