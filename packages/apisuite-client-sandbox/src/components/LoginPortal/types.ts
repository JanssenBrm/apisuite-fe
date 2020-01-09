import { AuthPayloads } from 'containers/Auth/types'

export interface LoginPortalProps extends React.HTMLAttributes<HTMLDivElement> {
  login: (payload: AuthPayloads['login']) => void,
}
