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
import { User } from 'containers/Auth/types'

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox },
  { path: '/dashboard', exact: true, component: () => <RequireAuth component={LandingPage} /> },
  { path: '/dashboard/apps', exact: true, component: () => <RequireAuth component={ListApps} /> },
  { path: '/dashboard/apps/create', exact: true, component: () => <RequireAuth component={CreateApp} /> },
  { path: '/dashboard/apps/detail', exact: true, component: () => <RequireAuth component={AppDetail} /> },
  // #conditional-loader-start: console
  { path: '/dashboard/console', component: (user: User) => <RequireAuth user={user} component={Console} /> },
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
