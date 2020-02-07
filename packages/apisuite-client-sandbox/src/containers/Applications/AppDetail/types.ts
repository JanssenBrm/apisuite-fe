import { AppData, ApplicationRouteProps } from '../types'

export type AppDetailProps = ApplicationRouteProps & {
  updateApp: (appData: AppData, appId: string) => void,
  getAppDetails: () => void,
  deleteApp: (appId: string) => void,
  currentApp: AppData,
}
