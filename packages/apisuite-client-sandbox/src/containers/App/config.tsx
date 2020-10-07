import * as React from 'react'
import SvgIcon from 'components/SvgIcon'
import { TabProps } from 'components/Navigation/types'
import { getMenuEntries } from 'util/extensions'
import { Menus } from 'apisuite-extension-ui-types'
import { useSettings } from 'util/useSetting'

const extensionsInitTabs = getMenuEntries(Menus.HeaderAnonymousMain)
const extensionsLoginTabs = getMenuEntries(Menus.HeaderAuthenticatedMain)
const extensionsLoginDashboardTabs = getMenuEntries(Menus.HeaderAuthenticatedDashboard)
const extensionsLoginProfileTabs = getMenuEntries(Menus.HeaderAuthenticatedProfile)

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
  }, [settings])

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
  }, [settings])

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
