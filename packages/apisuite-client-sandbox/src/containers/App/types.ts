import { RouteProps } from 'react-router'
import { History } from 'history'
import { AuthPayloads, AuthStore } from 'containers/Auth/types'
import { TabProps } from 'components/Navigation/types'

export interface AppProps extends AppDispatchToProps {
  history: History<any>,
  auth: AuthStore,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export interface AppDispatchToProps {
  getSettings: () => void,
  loginUser: (payload: AuthPayloads['loginUser']) => void,
}

export type AppRouteProps = RouteProps

export interface TabMenus {
  [key: string]: TabProps[],
}
