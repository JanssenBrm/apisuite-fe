import { AppStorePayloads } from 'containers/App/types'

export interface MarketplaceProps extends MarketplaceMapDispatchToProps {
  requesting: boolean,
  requestError: string,
}

export interface MarketplaceMapDispatchToProps {
  inform: (payload: AppStorePayloads['inform']) => void,
}
