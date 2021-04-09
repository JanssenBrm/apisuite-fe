import { History } from 'history'

import { SettingsStore } from 'containers/Settings/types'

export interface SignInOrUpProps {
  history: History,
  settings: SettingsStore,
}

export type View = 'signup' | 'signin'
