import { User } from 'containers/Auth/types'
import { History } from 'history'

export interface LandingPageProps {
  history: History<any>,
  user?: User,
}
