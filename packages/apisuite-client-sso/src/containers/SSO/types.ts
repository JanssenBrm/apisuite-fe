import { AppStorePayloads } from 'containers/App/types'

export interface SSOProps extends SSOMapDispatchToProps {
  requesting: boolean,
  requestError: string,
}

export interface SSOMapDispatchToProps {
  inform: (payload: AppStorePayloads['inform']) => void,
}
