import { User } from 'containers/Auth/types'
import { ReturnNestedType } from 'util/typeUtils'
import {
  fetchTeamMembersActions,
  fetchRoleOptionsActions,
  inviteMemberActions,
  confirmInviteActions,
  getProfileActions,
  fetchOrgActions,
  updateProfileActions,
} from './ducks'
import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'

export type ProfileProps =
ReturnType<typeof mapStateToProps> &
ReturnType<typeof mapDispatchToProps>

export const roleNameOptions = ['superadmin', 'admin', 'developer', ''] as const

export type OrgInfo = {
  description: string | null,
  vat: string,
  website: string,
  terms: string,
  logo: string,
  'org_code'?: string,
  createdAt?: string,
  updatedAt?: string,
}

export type ProfileStore = Pick<FetchTeamMembersResponse, 'members'> & {
  roleOptions: Role[],
  profile: Profile,
  org: Organization & Pick<OrgInfo, 'description' | 'vat' | 'website' | 'terms' | 'logo'>,
}

export type Profile = {
  'current_org': Organization & {
    'member_since': string,
    role: Role,
  },
  'orgs_member': Organization[],
  user: {
    avatar?: string,
    bio?: string,
    email: string,
    id: string,
    'last_login': string,
    mobile?: string,
    name: string,
  },
}

export type Role = {
  name: typeof roleNameOptions[number],
  id: string,
}

export type Organization = {
  id: string,
  name: string,
}

export type FetchTeamMembersResponse = {
  success: boolean,
  message: string,
  members: ({
    'Organization': Organization,
    'Role': Role,
    'User': Pick<User, 'id'> & { name: string },
  })[],
}

export type FetchRoleOptionsResponse = Role[]

export type InviteMemberResponse = any

export type ConfirmInviteResponse = any

export type ChangeRoleResponse = any

export type GetProfileResponse = {
  message: string,
  profile: Profile,
  success: boolean,
}

export type UpdateProfileResponse = {
  success: boolean,
  message: string,
}

export type FetchOrgResponse = {
  success: boolean,
  message: string,
  org: Organization & OrgInfo,
}

export type UpdateOrgResponse = any

export type ProfileActions =
  ReturnNestedType<typeof fetchTeamMembersActions> |
  ReturnNestedType<typeof fetchRoleOptionsActions> |
  ReturnNestedType<typeof inviteMemberActions> |
  ReturnNestedType<typeof confirmInviteActions> |
  ReturnNestedType<typeof getProfileActions> |
  ReturnNestedType<typeof updateProfileActions> |
  ReturnNestedType<typeof fetchOrgActions>
