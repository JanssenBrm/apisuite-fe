import { Store } from 'store/types'

export const getRoleName = ({ auth }: Store) =>
  auth && auth.user && auth.user.role && auth.user.role.name
