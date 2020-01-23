import { Action } from 'redux'

export interface RegisterPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  registerUser: (userData: UserData) => void,
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
