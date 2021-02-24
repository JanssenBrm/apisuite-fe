import { Store } from 'store/types'

export const getRoleName = ({ profile }: Store) =>
  profile?.profile?.current_org?.role?.name || 'anonymous'
