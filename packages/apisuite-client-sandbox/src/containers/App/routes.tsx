import * as React from 'react'
import { Route, Switch } from 'react-router'
import NotFound from 'components/NotFound'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Sandbox from 'containers/Sandbox'
import LandingPage from 'containers/LandingPage'
import ListApps from 'containers/Applications/ListApps'
import CreateApp from 'containers/Applications/CreateApp'
import AppDetail from 'containers/Applications/AppDetail'
import Subscriptions from 'containers/Subscriptions'
import Console from 'containers/Console'
import Login from 'containers/Login'
// import Register from 'containers/Register'
import { AppRouteProps } from './types'
import RequireAuth from 'containers/Auth'

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox },
  { path: '/dashboard', exact: true, render: (props) => <RequireAuth component={LandingPage} {...props} /> },
  { path: '/dashboard/apps', exact: true, render: (props) => <RequireAuth component={ListApps} {...props} /> },
  { path: '/dashboard/apps/create', exact: true, render: (props) => <RequireAuth component={CreateApp} {...props} /> },
  { path: '/dashboard/apps/detail', exact: true, render: (props) => <RequireAuth component={AppDetail} {...props} /> },
  { path: '/dashboard/subscriptions', exact: true, render: (props) => <RequireAuth component={Subscriptions} {...props} /> },
  { path: '/dashboard/console', render: (props) => <RequireAuth component={Console} {...props} /> },
  // #conditional-loader-start: console
  // #conditional-loader-end
  { path: '/auth', exact: true, component: Login },
  { path: '/auth/:email', exact: true, component: Login },
  // { path: '/register', component: Register },
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
        render={route.render}
        component={route.component}
      />,
    )}
  </Switch>
)
