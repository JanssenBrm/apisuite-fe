import * as React from 'react'
import {
  Route,
  Switch,
} from 'react-router'
import MainLayout from 'layouts/Main'
import EssentialLayout from 'layouts/Essential'
import NotFound from 'components/NotFound'
import Terms from 'components/Terms'
import Privacy from 'components/Privacy'
import Sandbox from 'containers/Sandbox'
import LandingPage from 'containers/LandingPage'
import ListApps from 'containers/Applications/ListApps'
import CreateApp from 'containers/Applications/CreateApp'
import AppDetail from 'containers/Applications/AppDetail'
import Subscriptions from 'containers/Subscriptions'
import Login from 'containers/Login'
import { AppRouteProps } from './types'
import RequireAuth from 'containers/Auth'
import Instructions from 'containers/Instructions'
import RegisterConfirmation from 'containers/RegisterConfirmation'
import RedirectPage from 'containers/RedirectPage'
import ForgotPasswordPage from 'containers/ForgotPasswordPage'
import TeamPage from 'containers/TeamPage'
import Profile from 'containers/Profile'
import OrganizationPage from 'containers/OrganizationPage'
import { getRoutes } from 'util/extensions'

const extensionsRoutes = getRoutes().map(
  (route: any): AppRouteProps => {
    if (!route.auth) {
      return route
    }
    return {
      ...route,
      auth: true,
      component: route.component,
      roleReq: route.role,
    }
  },
)

export const routesConfig: AppRouteProps[] = [
  { path: '/', exact: true, component: Sandbox, layoutProps: { contractibleMenu: true } },
  { path: '/dashboard', exact: true, component: LandingPage, layoutProps: { contractibleMenu: true } },
  // { path: '/dashboard', exact: true, render: (props) => <RequireAuth component={LandingPage} {...props} /> },
  // // // { path: '/dashboard/apps', exact: true, render: (props) => <RequireAuth component={ListApps} {...props} /> },
  { path: '/dashboard/apps', exact: true, auth: true, component: ListApps },
  { path: '/dashboard/apps/create', exact: true, auth: true, component: CreateApp },
  { path: '/dashboard/apps/detail/:id', exact: true, auth: true, component: AppDetail },
  { path: '/dashboard/subscriptions', exact: true, auth: true, component: Subscriptions },
  { path: '/dashboard/test', exact: true, auth: true, component: Instructions },
  { path: '/profile', exact: true, auth: true, component: Profile },
  { path: '/profile/team', exact: true, auth: true, component: TeamPage },
  { path: '/profile/organisation', exact: true, auth: true, component: OrganizationPage },
  { path: '/auth/:view?/:email?', exact: true, component: Login, layout: EssentialLayout },
  { path: ['/:redirect/confirm', '/:redirect/reset'], exact: true, component: RedirectPage },
  { path: '/confirmation/:name?', exact: true, component: RegisterConfirmation, layout: EssentialLayout },
  { path: '/forgot', exact: true, component: ForgotPasswordPage, layout: EssentialLayout },
  { path: '/terms', component: Terms },
  { path: '/privacy', component: Privacy },
  ...extensionsRoutes,
  { render: () => <NotFound /> },
]

function RouteWrapper ({
  layout: Layout = MainLayout,
  layoutProps,
  component: Component,
  render,
  auth,
  role,
  ...rest
}: AppRouteProps) {
  const renderFunc = render || ((props) => {
    if (!Component) {
      return <NotFound />
    }
    const LayoutContainer = (
      <Layout {...layoutProps}>
        <Component {...props} />
      </Layout>
    )

    return auth ? (
      <RequireAuth role={role} component={LayoutContainer} {...props} />
    ) : (
      LayoutContainer
    )
  })

  return (
    <Route {...rest} render={renderFunc} />
  )
}

export default () => (
  <Switch key='routes'>
    {routesConfig.map((route, indx) =>
      <RouteWrapper
        key={`routes-${indx}`}
        auth={route.auth}
        role={route.role}
        layout={route.layout}
        layoutProps={route.layoutProps}
        path={route.path}
        exact={route.exact}
        component={route.component}
        render={route.render}
      />,
    )}
  </Switch>
)
