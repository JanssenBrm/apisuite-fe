import { AuthPayloads, AuthStore } from 'containers/Auth/types'

export interface LoginFormProps extends LoginDispatchToProps {
  auth: AuthStore,
}

export interface LoginDispatchToProps {
  login: (payload: AuthPayloads['login']) => void,
}
