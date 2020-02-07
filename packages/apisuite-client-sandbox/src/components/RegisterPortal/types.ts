import { Action } from 'redux'
import { AuthStore } from 'containers/Auth/types'

export interface RegisterDispatchToProps {
  registerUser: (userData: UserData) => void,
}

export interface RegisterPortalProps extends RegisterDispatchToProps {
  auth: AuthStore,
}

export interface UserData {
  name: string,
  email: string,
  password: string,
}

export interface RegisterAction extends Action {
  type: 'REGISTER_USER',
  userData: UserData,
}
