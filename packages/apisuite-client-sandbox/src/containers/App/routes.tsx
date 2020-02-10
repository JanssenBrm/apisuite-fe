import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import NotFound from 'components/NotFound'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Sandbox from 'containers/Sandbox'
import LandingPage from 'containers/LandingPage'
import ListApps from 'containers/Applications/ListApps'
import CreateApp from 'containers/Applications/CreateApp'
import AppDetail from 'containers/Applications/AppDetail'
import Console from 'containers/Console'
import Login from 'containers/Login'
import Register from 'containers/Register'

import { AppRouteProps } from './types'
import RequireAuth from 'containers/Auth'
import { AuthStore } from 'containers/Auth/types'
import Subscriptions from 'containers/Subscriptions'

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox },
  { path: '/dashboard', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={LandingPage} /> },
  { path: '/dashboard/apps', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={ListApps} /> },
  { path: '/dashboard/apps/create', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={CreateApp} /> },
  { path: '/dashboard/apps/detail', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={AppDetail} /> },
  { path: '/dashboard/subscriptions', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={Subscriptions} /> },
  { path: '/dashboard/console', exact: true, component: (auth: AuthStore) => <RequireAuth auth={auth} component={Console} /> },
  // #conditional-loader-start: console
  // #conditional-loader-end
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  { render: () => <NotFound /> },
]

export default () => (
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <Route
        key={`routes-${indx}`}
        path={route.path}
        exact={route.exact}
        component={route.component}
      />,
    )}
  </Switch>
)
