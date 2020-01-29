import { AppData, ApplicationRouteProps } from '../types'

export type AppDetailProps = ApplicationRouteProps & {
  updateApp: (appData: AppData) => void,
  getAppDetails: () => void,
  currentApp: AppData,
}
