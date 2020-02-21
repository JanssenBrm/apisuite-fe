import { ApplicationRouteProps } from '../types'
import { User } from 'containers/Auth/types'

export type ListAppsProps = ApplicationRouteProps & {
  user?: User,
  getUserApps: (userId: number) => void,
}
