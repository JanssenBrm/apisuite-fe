import * as React from 'react'
import SvgIcon from 'components/SvgIcon'

export type TabOpt = {
  label: React.ReactNode,
  route: string,
  subTabs?: TabOpt[],
}

export const initTabs: TabOpt[] = [
  {
    label: 'Sandbox Features',
    route: '/',
  },
  {
    label: 'Contact',
    route: '/contact',
  },
  {
    label: 'Log in',
    route: '/login',
  },
  {
    label: 'Demo',
    route: '/demo',
  },
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

export const loginTabs: TabOpt[] = [
  {
    label: 'Sandbox Features',
    route: '/',
  },
  {
    label: 'Documentation',
    route: '/docs',
  },
  {
    label: 'Contact',
    route: '/contact',
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
        label: 'Client Aplications',
        route: '/dashboard/apps',
      },
      {
        label: 'Test Data',
        route: '/dashboard/testdata',
      },
      {
        label: <ConsoleLabel />,
        route: '/dashboard/console',
      },
    ],
  },
]
