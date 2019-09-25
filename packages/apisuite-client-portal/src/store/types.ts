import { RouterState } from 'connected-react-router'

import { AppStoreState } from 'containers/App/types'

export interface Store {
  router: RouterState,
  app: AppStoreState,
}
