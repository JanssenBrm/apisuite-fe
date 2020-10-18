import * as React from 'react'
import { useLocation } from 'react-router-dom'
import SvgIcon from 'components/SvgIcon'
import { TabProps } from 'components/Navigation/types'
import { getMenuEntries } from 'util/extensions'
import { MenuEntry, Menus } from 'apisuite-extension-ui-types'
import { useSettings } from 'util/useSetting'
import { useSelector } from 'react-redux'
import { getRoleName } from 'containers/Profile/selectors'

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
  const { pathname } = useLocation()

  // Create an array for each accumulated level of pathnames of the current URI
  // Ex: /dashboard/subscriptions -> [/dashboard, /dashboard/subscriptions]
  const levelPathnames = React.useMemo(() => {
    const pathParts = pathname.split('/')
    return pathParts.reduce((accum, _part, index) => {
      const levelParts = pathParts.slice(0, index + 1)
      return [...accum, levelParts.join('/')]
    }, [] as string[]).slice(1)
  }, [pathname])

  // Iterates through all menu and sub-menu entries and sets which entries are
  // active. Active entries are either those whose path match with the current
  // page or where any of the sub menu items is active.
  const setMenuActiveEntries = React.useCallback((entries, level = 0) => {
    return entries.map((entry: MenuEntry) => {
      const hasLevelPathname = !!levelPathnames[level]
      const curEntryActive =
        entry.route === levelPathnames[level] || entry.route === pathname
      const matchesPrevLevelPath =
        !hasLevelPathname && entry.route === levelPathnames[level - 1]
      let subTabs = entry.subTabs
      let hasActiveSubtab
      if (subTabs) {
        subTabs = setMenuActiveEntries(entry.subTabs, level + 1)
        hasActiveSubtab = !!subTabs && subTabs.some((entry) => entry.active)
      }
      return {
        ...entry,
        subTabs,
        active: hasActiveSubtab || curEntryActive || matchesPrevLevelPath,
      }
    })
  }, [pathname, levelPathnames])

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
        active: pathname === '/auth/login',
      },
      {
        label: 'Register',
        route: '/auth/register',
        active: pathname === '/auth/register',
      },
      ...extensionsInitTabs,
    ].filter(Boolean)

    if (settings.supportURL) {
      entries.splice(1, 0, {
        label: 'Support',
        route: settings.supportURL,
      })
    }

    return setMenuActiveEntries(entries)
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

    return setMenuActiveEntries(entries)
  }, [
    settings,
    extensionsLoginTabs,
    extensionsLoginDashboardTabs,
    extensionsLoginProfileTabs,
    levelPathnames,
  ])

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
