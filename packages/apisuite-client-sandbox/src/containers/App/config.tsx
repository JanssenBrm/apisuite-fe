import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import { TabProps } from 'components/Navigation/types'
import { getMenuEntries } from 'util/extensions'
import { Menus } from 'apisuite-extension-ui-types'
import { useSettings } from 'util/useSetting'
import { useSelector } from 'react-redux'
import { getRoleName } from 'containers/Auth/selectors'

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

export function useTabs (): Array<TabProps[]> {
  const [settings] = useSettings()
  const roleName = useSelector(getRoleName)
  const [
    extensionsInitTabs,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
  ] = React.useMemo(
    () => {
      return [
        getMenuEntries(Menus.HeaderAnonymousMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedMain, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedDashboard, roleName),
        getMenuEntries(Menus.HeaderAuthenticatedProfile, roleName),
      ]
    },
    [roleName],
  )

  const initTabs = React.useMemo((): TabProps[] => {
    const entries = [
      {
        label: 'Home',
        route: '/',
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
    ].filter(Boolean)

    if (settings.supportURL) {
      entries.splice(1, 0, {
        label: 'Support',
        route: settings.supportURL,
      })
    }

    return entries
  }, [settings, extensionsInitTabs])

  const loginTabs = React.useMemo((): TabProps[] => {
    const entries = [
      {
        label: 'Home',
        route: '/',
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
    ].filter(Boolean)

    if (settings.supportURL) {
      entries.splice(1, 0, {
        label: 'Support',
        route: settings.supportURL,
      })
    }

    if (settings.documentationURL) {
      entries.splice(1, 0, {
        label: 'Documentation',
        route: settings.documentationURL,
      })
    }

    return entries
  }, [
    settings,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
  ])

  console.log({ loginTabs })

  return [initTabs, loginTabs]
}

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
