import { User } from 'containers/Auth/types'
import { ReturnNestedType } from 'util/typeUtils'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
  inviteMemberActions,
} from './ducks'

export type ProfileStore = Pick<FetchTeamMembersResponse, 'members'> & {
  roleOptions: Role[],
}

export type Role = {
  name: RoleNameOptions,
  id: string,
}

export type FetchTeamMembersResponse = {
  success: boolean,
  message: string,
  members: ({
    'org_id': string,
    'User': Pick<User, 'id'> & { name: string },
  } & {
    'Role': Role,
  })[],
}

export type FetchRoleOptionsResponse = Role[]

export type InviteMemberResponse = any

export type ConfirmInviteResponse = any

export type RoleNameOptions = 'superadmin' | 'admin' | 'developer' | ''

export type ProfileActions =
  ReturnNestedType<typeof fetchTeamMembersActions> |
  ReturnNestedType<typeof fetchRoleOptionsActions> |
  ReturnNestedType<typeof inviteMemberActions>
