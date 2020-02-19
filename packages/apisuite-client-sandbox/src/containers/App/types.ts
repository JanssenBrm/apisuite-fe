import { RouteProps } from 'react-router'
import { AuthPayloads, AuthStore } from 'containers/Auth/types'
import { History } from 'history'

export interface AppProps extends AppDispatchToProps {
  history: History<any>,
  auth: AuthStore,
  logout: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
}

export interface AppDispatchToProps {
  loginUser: (payload: AuthPayloads['loginUser']) => void,
}

export type AppRouteProps = RouteProps
