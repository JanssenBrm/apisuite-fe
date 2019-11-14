import { RouterState } from 'connected-react-router'

import { AuthStore } from 'containers/Auth/types'

export interface Store {
  router: RouterState,
  auth: AuthStore,
}
