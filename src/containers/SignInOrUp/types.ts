import { AuthStore } from 'containers/Auth/types'
import { History } from 'history'
import { InvitationFormStore } from 'components/InvitationForm/types'
import { SettingsStore } from 'containers/Settings/types'

export interface SignInOrUpProps {
  auth: AuthStore,
  invitation: InvitationFormStore,
  history: History,
  settings: SettingsStore,
}

export type View = 'signup' | 'signin' | 'invitation'
