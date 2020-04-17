import { AppData, ApplicationRouteProps, Response } from '../types'
import { User } from 'containers/Auth/types'
import { Api } from 'containers/Subscriptions/types'

export type CreateAppProps = ApplicationRouteProps & {
  createApp: (appData: AppData) => void,
  user?: User,
  history: History,
  resCreate: Response,
  apis: Api[],
  getApis: () => void,
}
