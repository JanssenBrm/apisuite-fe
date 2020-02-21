import { AppData, ApplicationRouteProps } from '../types'
import { User } from 'containers/Auth/types'

export type AppDetailProps = ApplicationRouteProps & {
  user?: User,
  updateApp: (appData: AppData) => void,
  getAppDetails: (appId: number, userId: number) => void,
  deleteApp: (appId: number) => void,
  currentApp: AppData,
}
