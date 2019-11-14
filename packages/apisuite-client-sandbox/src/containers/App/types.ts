import { RouteProps } from 'react-router-dom'
import { AuthPayloads, User } from 'containers/Auth/types'
import { History } from 'history'

export interface AppProps extends AppDispatchToProps {
  history: History<any>,
  user?: User,
}

export interface AppDispatchToProps {
  login: (payload: AuthPayloads['login']) => void,
}

export type AppRouteProps = RouteProps
