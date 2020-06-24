import update from 'immutability-helper'
import {
  ProfileActions,
  ProfileStore,
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
  InviteMemberResponse,
  ConfirmInviteResponse,
  ChangeRoleResponse,
  GetProfileResponse,
  UpdateProfileResponse,
  UpdateOrgResponse,
} from './types'

const initialState: ProfileStore = {
  members: [{
    'Organization': {
      id: '',
      name: '',
    },
    'User': {
      name: '',
      id: 0,
    },
    'Role': {
      name: '',
      id: '',
    },
  }],
  profile: {
    'current_org': {
      name: '',
      id: '',
      'member_since': '',
      role: {
        name: '',
        id: '',
      },
    },
    'orgs_member': [{
      id: '',
      name: '',
    }],
    user: {
      email: '',
      id: '',
      'last_login': '',
      name: '',
    },
  },
  roleOptions: [{
    name: '',
    id: '',
  }],
  org: {
    name: '',
    id: '',
    description: '',
    vat: '',
    website: '',
    terms: '',
    logo: '',
  },
}

export enum ProfileActionTypes {
  FETCH_TEAM_MEMBERS_REQUEST = 'FETCH_TEAM_MEMBERS_REQUEST',
  FETCH_TEAM_MEMBERS_SUCCESS = 'FETCH_TEAM_MEMBERS_SUCCESS',
  FETCH_TEAM_MEMBERS_ERROR = 'FETCH_TEAM_MEMBERS_ERROR',

  FETCH_ROLE_OPTIONS_REQUEST = 'FETCH_ROLE_OPTIONS_REQUEST',
  FETCH_ROLE_OPTIONS_SUCCESS = 'FETCH_ROLE_OPTIONS_SUCCESS',
  FETCH_ROLE_OPTIONS_ERROR = 'FETCH_ROLE_OPTIONS_ERROR',

  INVITE_MEMBER_REQUEST = 'INVITE_MEMBER_REQUEST',
  INVITE_MEMBER_SUCCESS = 'INVITE_MEMBER_SUCCESS',
  INVITE_MEMBER_ERROR = 'INVITE_MEMBER_ERROR',

  CONFIRM_INVITE_MEMBER_REQUEST = 'CONFIRM_INVITE_MEMBER_REQUEST',
  CONFIRM_INVITE_MEMBER_SUCCESS = 'CONFIRM_INVITE_MEMBER_SUCCESS',
  CONFIRM_INVITE_MEMBER_ERROR = 'CONFIRM_INVITE_MEMBER_ERROR',

  CHANGE_ROLE_REQUEST = 'CHANGE_ROLE_REQUEST',
  CHANGE_ROLE_SUCCESS = 'CHANGE_ROLE_SUCCESS',
  CHANGE_ROLE_ERROR = 'CHANGE_ROLE_ERROR',

  GET_PROFILE_REQUEST = 'GET_PROFILE_REQUEST',
  GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS',
  GET_PROFILE_ERROR = 'GET_PROFILE_ERROR',

  UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST',
  UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
  UPDATE_PROFILE_ERROR = 'UPDATE_PROFILE_ERROR',

  FETCH_ORG_REQUEST = 'FETCH_ORG_REQUEST',
  FETCH_ORG_SUCCESS = 'FETCH_ORG_SUCCESS',
  FETCH_ORG_ERROR = 'FETCH_ORG_ERROR',

  UPDATE_ORG_REQUEST = 'UPDATE_ORG_REQUEST',
  UPDATE_ORG_SUCCESS = 'UPDATE_ORG_SUCCESS',
  UPDATE_ORG_ERROR = 'UPDATE_ORG_ERROR'
}

export default function profileReducer (
  state = initialState,
  action: ProfileActions,
): ProfileStore {
  switch (action.type) {
    case ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS: {
      return update(state, {
        members: { $set: action.response.members },
      })
    }

    case ProfileActionTypes.FETCH_ROLE_OPTIONS_SUCCESS: {
      return update(state, {
        roleOptions: { $set: action.response },
      })
    }

    case ProfileActionTypes.GET_PROFILE_SUCCESS: {
      return update(state, {
        profile: { $set: action.response.profile },
      })
    }

    case ProfileActionTypes.FETCH_ORG_SUCCESS: {
      return update(state, {
        org: { $set: action.response.org },
      })
    }

    default:
      return state
  }
}

export const fetchTeamMembersActions = {
  request: () => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST,
    } as const
  },
  success: (response: FetchTeamMembersResponse) => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_ERROR,
      error: error,
    } as const
  },
}

export const fetchRoleOptionsActions = {
  request: () => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_REQUEST,
    } as const
  },
  success: (response: FetchRoleOptionsResponse) => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_ROLE_OPTIONS_ERROR,
      error: error,
    } as const
  },
}

export const inviteMemberActions = {
  request: (email: string, roleId: string) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_REQUEST,
      payload: {
        email: email,
        'role_id': roleId,
      },
    } as const
  },
  success: (response: InviteMemberResponse) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_ERROR,
      error: error,
    } as const
  },
}

export const confirmInviteActions = {
  request: (confirmationToken: string) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_REQUEST,
      payload: { token: confirmationToken },
    } as const
  },
  success: (response: ConfirmInviteResponse) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.CONFIRM_INVITE_MEMBER_ERROR,
      error: error,
    } as const
  },
}

export const changeRoleActions = {
  request: (userId: string, orgId: string, roleId: string) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_REQUEST,
      payload: {
        'user_id': userId,
        'org_id': orgId,
        'role_id': roleId,
      },
    } as const
  },
  success: (response: ChangeRoleResponse) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.CHANGE_ROLE_ERROR,
      error: error,
    } as const
  },
}

export const getProfileActions = {
  request: () => {
    return {
      type: ProfileActionTypes.GET_PROFILE_REQUEST,
    } as const
  },
  success: (response: GetProfileResponse) => {
    return {
      type: ProfileActionTypes.GET_PROFILE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.GET_PROFILE_ERROR,
      error: error,
    } as const
  },
}

export const updateProfileActions = {
  request: (bio: string, avatar: string, mobile: number, orgId: string) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_REQUEST,
      payload: {
        bio: bio,
        avatar: avatar,
        mobile: mobile,
        'org_id': orgId,
      },
    } as const
  },
  success: (response: UpdateProfileResponse) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.UPDATE_PROFILE_ERROR,
      error: error,
    } as const
  },
}

export const fetchOrgActions = {
  request: (orgId: string) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_REQUEST,
      payload: {
        'org_id': orgId,
      },
    } as const
  },
  success: (response: ChangeRoleResponse) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.FETCH_ORG_ERROR,
      error: error,
    } as const
  },
}

export const updateOrgActions = {
  request: (orgId: string) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_REQUEST,
      payload: {
        'org_id': orgId,
      },
    } as const
  },
  success: (response: UpdateOrgResponse) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: ProfileActionTypes.UPDATE_ORG_ERROR,
      error: error,
    } as const
  },
}
