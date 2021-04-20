import { AuthStore } from 'containers/Auth/types'
import { History } from 'history'
import { InvitationFormStore } from 'components/InvitationForm/types'

export interface SignInOrUpProps {
  auth: AuthStore,
  invitation: InvitationFormStore,
  history: History,
}

export type View = 'signup' | 'signin' | 'invitation'
