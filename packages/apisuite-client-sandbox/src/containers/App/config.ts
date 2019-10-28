
export type TabOpt = {
  name: string,
  route: string,
  subTabs?: TabOpt[],
}

export const initTabs: TabOpt[] = [
  {
    name: 'Sandbox Features',
    route: '/',
  },
  {
    name: 'Contact',
    route: '/contact',
  },
  {
    name: 'Log in',
    route: '/login',
  },
  {
    name: 'Demo',
    route: '/demo',
  },
]

export const loginTabs: TabOpt[] = [
  {
    name: 'Sandbox Features',
    route: '/',
  },
  {
    name: 'Documentation',
    route: '/docs',
  },
  {
    name: 'Contact',
    route: '/contact',
  },
  {
    name: 'Dashboard',
    route: '/dashboard',
    subTabs: [
      {
        name: 'Landing page',
        route: '/dashboard',
      },
      {
        name: 'Subscriptions',
        route: '/dashboard/subscriptions',
      },
      {
        name: 'Client Aplications',
        route: '/dashboard/apps',
      },
      {
        name: 'Test Data',
        route: '/dashboard/testdata',
      },
      {
        name: '< >',
        route: '/dashboard/testdata',
      },
    ],
  },
]
