// import update from 'immutability-helper'
import {
  ProfileActions,
  ProfileStore,
  FetchTeamMembersResponse,
  FetchRoleOptionsResponse,
} from './types'

const initialState: ProfileStore = {
  members: [{
    'org_id': '',
    'User': {
      name: '',
      id: 0,
    },
    'Role': {
      name: 'admin',
      id: '',
    },
  }],
  roleOptions: ['admin'],
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
  INVITE_MEMBER_ERROR = 'INVITE_MEMBER_ERROR'
}

export default function profileReducer (
  state = initialState,
  action: ProfileActions,
): ProfileStore {
  switch (action.type) {
    case ProfileActionTypes.FETCH_TEAM_MEMBERS_SUCCESS: {
      return state
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
  request: () => {
    return {
      type: ProfileActionTypes.INVITE_MEMBER_REQUEST,
      payload: ,
    } as const
  },
  success: (response: FetchRoleOptionsResponse) => {
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
