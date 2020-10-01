import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import { TabProps } from 'components/Navigation/types'
import { getMenuEntries } from 'util/extensions'
import { Menus } from 'apisuite-extension-ui-types'

import { DOCUMENTATION_URL, SUPPORT_URL } from 'constants/endpoints'

const extensionsInitTabs = getMenuEntries(Menus.HeaderAnonymousMain)
const extensionsLoginTabs = getMenuEntries(Menus.HeaderAuthenticatedMain)
const extensionsLoginDashboardTabs = getMenuEntries(Menus.HeaderAuthenticatedDashboard)
const extensionsLoginProfileTabs = getMenuEntries(Menus.HeaderAuthenticatedProfile)

export const initTabs: TabProps[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Support',
    route: SUPPORT_URL,
  },
  {
    label: 'Log in',
    route: '/auth/login',
  },
  {
    label: 'Register',
    route: '/auth/register',
  },
  ...extensionsInitTabs,
]

const ConsoleLabel = () => (
  <div style={{ backgroundColor: '#A9A9A9', borderRadius: 4, paddingLeft: 4, paddingRight: 4, pointerEvents: 'none' }}>
    <SvgIcon
      name='code'
      size={24}
      color='white'
      style={{ backgroundColor: 'transparent' }}
    />
  </div>
)

export const loginTabs: TabProps[] = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Documentation',
    route: DOCUMENTATION_URL,
  },
  {
    label: 'Support',
    route: SUPPORT_URL,
  },
  {
    label: 'Dashboard',
    route: '/dashboard',
    subTabs: [
      {
        label: 'Landing page',
        route: '/dashboard',
      },
      {
        label: 'Subscriptions',
        route: '/dashboard/subscriptions',
      },
      {
        label: 'Client Applications',
        route: '/dashboard/apps',
      },
      {
        label: 'Test',
        route: '/dashboard/test',
      },
      // #conditional-loader-start: console
      {
        label: <ConsoleLabel />,
        route: '/dashboard/console',
      },
      // #conditional-loader-end
      ...extensionsLoginDashboardTabs,
    ],
  },
  {
    label: 'Profile',
    route: '/profile',
    subTabs: [
      {
        label: 'Profile',
        route: '/profile',
      },
      {
        label: 'Team',
        route: '/profile/team',
      },
      {
        label: 'Organisation',
        route: '/profile/organisation',
      },
      ...extensionsLoginProfileTabs,
    ],
  },
  ...extensionsLoginTabs,
]

export const gobackConfig = [
  {
    path: '/dashboard/apps/create',
    label: 'Cancel',
  },
  {
    path: '/dashboard/apps/detail',
    label: 'Back to overview',
  },
]
