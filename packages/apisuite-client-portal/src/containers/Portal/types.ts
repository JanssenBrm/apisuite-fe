import { AppStorePayloads } from 'containers/App/types'

export interface PortalProps extends PortalMapDispatchToProps {
  requesting: boolean,
  requestError: string,
}

export interface PortalMapDispatchToProps {
  inform: (payload: AppStorePayloads['inform']) => void,
}
