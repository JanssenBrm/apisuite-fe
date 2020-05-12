import { Action } from 'redux'

export interface RegisterDispatchToProps {
  registerUser: (userData: UserData) => void,
}

export interface RegisterFormProps extends RegisterDispatchToProps {
  register: any,
  defaultEmail?: string,
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
