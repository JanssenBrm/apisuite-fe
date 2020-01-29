import { AppData, ApplicationRouteProps } from '../types'

export type CreateAppProps = ApplicationRouteProps & {
  createApp: (appData: AppData) => void,
}
