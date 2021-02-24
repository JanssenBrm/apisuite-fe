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
  updateOrgActions,
  changeRoleActions,
  resetErrorAction,
  deleteAccountActions,
  createOrgActions,
} from './ducks'
import {
  mapStateToProps,
  mapDispatchToProps,
} from './index'
import { RequestStatus } from 'util/request'

export type ProfileProps =
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

export const roleNameOptions = ['admin', 'organizationOwner', 'developer', ''] as const

export type NewOrgInfo = {
  name: string,
  description: string | null,
  vat?: string | null,
  tosUrl: string,
  privacyUrl: string,
  youtubeUrl: string,
  websiteUrl: string,
  supportUrl: string,
  logo: string,
}

export type ExistingOrgInfo = {
  description: string | null,
  vat?: string | null,
  tosUrl: string,
  privacyUrl: string,
  youtubeUrl: string,
  websiteUrl: string,
  supportUrl: string,
  logo: string,
  'org_code'?: string,
  createdAt?: string,
  updatedAt?: string,
}

export type ProfileStore = {
  members: FetchTeamMembersResponse[],
  roleOptions: Role[],
  profile: Profile,
  org: Organization &
  Pick<
  ExistingOrgInfo,
  'description' |
  'vat' |
  'tosUrl' |
  'privacyUrl' |
  'youtubeUrl' |
  'websiteUrl' |
  'supportUrl' |
  'logo'
  >,
  requestStatuses: {
    getMembersRequest: RequestStatus,
    getRolesRequest: RequestStatus,
    inviteMemberRequest: RequestStatus & { invited: boolean },
    updateProfileRequest: RequestStatus,
    updateOrgRequest: RequestStatus,
    createOrgRequest: RequestStatus,
    changeRoleRequest: RequestStatus,
    deleteAccount: RequestStatus,
  },
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
  'Organization': Organization,
  'Role': Role,
  'User': Pick<User, 'id'> & { name: string },
}

export type FetchRoleOptionsResponse = Role[]

export type InviteMemberResponse = any

export type ConfirmInviteResponse = any

export type ChangeRoleResponse = any

export type GetProfileResponse = Profile

export type UpdateProfileResponse = {
  success: boolean,
  message: string,
}

export type FetchOrgResponse = {
  success: boolean,
  message: string,
  org: Organization & ExistingOrgInfo,
}

export type CreateOrgResponse = any

export type UpdateOrgResponse = any

export type ProfileActions =
  ReturnNestedType<typeof fetchTeamMembersActions> |
  ReturnNestedType<typeof fetchRoleOptionsActions> |
  ReturnNestedType<typeof inviteMemberActions> |
  ReturnNestedType<typeof confirmInviteActions> |
  ReturnNestedType<typeof getProfileActions> |
  ReturnNestedType<typeof updateProfileActions> |
  ReturnNestedType<typeof createOrgActions> |
  ReturnNestedType<typeof updateOrgActions> |
  ReturnNestedType<typeof changeRoleActions> |
  ReturnNestedType<typeof fetchOrgActions> |
  ReturnNestedType<typeof deleteAccountActions> |
  ReturnType<typeof resetErrorAction>
