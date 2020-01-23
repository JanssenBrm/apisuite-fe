import { History } from 'history'
import { Action } from 'redux'

export interface ApplicationRouteProps {
  history: History<any>,
  createApp: () => void,
}

export interface CreateAppAction extends Action {
  type: 'CREATE_APP',
}
