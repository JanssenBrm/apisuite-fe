import { User } from 'containers/Auth/types'
import { ReturnNestedType } from 'util/typeUtils'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
} from './ducks'

export type ProfileStore = Pick<FetchTeamMembersResponse, 'members'> & {
  roleOptions: RoleOptions[],
}

export type Role = {
  'Role': {
    name: RoleOptions,
    id: string,
  },
}

export type FetchTeamMembersResponse = {
  success: boolean,
  message: string,
  members: ({
    'org_id': string,
    'User': Pick<User, 'id'> & { name: string },
  } & Role)[],
}

export type FetchRoleOptionsResponse = {

}

export type RoleOptions = 'superadmin' | 'admin' | 'developer'

export type ProfileActions =
  ReturnNestedType<typeof fetchTeamMembersActions> |
  ReturnNestedType<typeof fetchRoleOptionsActions>
