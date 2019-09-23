import { AppStorePayloads } from 'containers/App/types'

export interface SandboxProps extends SandboxMapDispatchToProps {
  requesting: boolean,
  requestError: string,
}

export interface SandboxMapDispatchToProps {
  inform: (payload: AppStorePayloads['inform']) => void,
}
