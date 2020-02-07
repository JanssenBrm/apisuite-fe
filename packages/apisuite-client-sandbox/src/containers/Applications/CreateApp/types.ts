import { AppData, ApplicationRouteProps } from '../types'
import { User } from 'containers/Auth/types'

export type CreateAppProps = ApplicationRouteProps & {
  createApp: (appData: AppData) => void,
  user?: User,
}
