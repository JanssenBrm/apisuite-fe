import { AuthPayloads, AuthStore } from 'containers/Auth/types'

export interface LoginPortalProps extends LoginDispatchToProps {
  auth: AuthStore,
}

export interface LoginDispatchToProps {
  login: (payload: AuthPayloads['login']) => void,
}
