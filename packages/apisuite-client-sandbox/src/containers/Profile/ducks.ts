import update from 'immutability-helper'
import {
  ProfileActions,
  ProfileStore,
} from './types'

const initialState: ProfileStore = {
  teamMembers: [],
}

export enum ProfileActionTypes {
  FETCH_TEAM_MEMBERS_REQUEST = 'FETCH_TEAM_MEMBERS_REQUEST',
  FETCH_TEAM_MEMBERS_SUCCESS = 'FETCH_TEAM_MEMBERS_SUCCESS',
  FETCH_TEAM_MEMBERS_ERROR = 'FETCH_TEAM_MEMBERS_ERROR'
}

export default function profileReducer (
  state: initialSate,
  action: ProfileActions,
): ProfileStore {
  switch (action.type) {
    case 
  }
}

export const fetchTeamMembersActions = {
  request: () => {
    return {
      type: ProfileActionTypes.FETCH_TEAM_MEMBERS_REQUEST,
      payload: ,
    } as const
  },
  success: (response: PersonalDetailsResponse) => {
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
