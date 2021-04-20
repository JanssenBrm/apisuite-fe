import update from 'immutability-helper'
import { AuthStoreActionTypes } from 'containers/Auth/types'
import { LOGOUT } from 'containers/Auth/ducks'
import {
  InvitationFormStore,
  InvitationFormActions,
} from './types'

export enum InvitationFormActionsTypes {
  INVITATION_WITH_SIGN_REQUEST = 'INVITATION_WITH_SIGN_REQUEST',
  INVITATION_WITH_SIGN_SUCCESS = 'INVITATION_WITH_SIGN_SUCCESS',
  INVITATION_WITH_SIGN_ERROR = 'INVITATION_WITH_SIGN_ERROR',

  INVITATION_SIGN_REQUEST = 'INVITATION_SIGN_REQUEST',
  INVITATION_SIGN_SUCCESS = 'INVITATION_SIGN_SUCCESS',
  INVITATION_SIGN_ERROR = 'INVITATION_SIGN_ERROR',

  ACCEPT_INVITATION_REQUEST = 'ACCEPT_INVITATION_REQUEST',
  ACCEPT_INVITATION_SUCCESS = 'ACCEPT_INVITATION_SUCCESS',
  ACCEPT_INVITATION_ERROR = 'ACCEPT_INVITATION_ERROR',

  REJECT_INVITATION_REQUEST = 'REJECT_INVITATION_REQUEST',
  REJECT_INVITATION_SUCCESS = 'REJECT_INVITATION_SUCCESS',
  REJECT_INVITATION_ERROR = 'REJECT_INVITATION_ERROR',

  VALIDATE_INVITATION_TOKEN_REQUEST = 'VALIDATE_INVITATION_TOKEN_REQUEST',
  VALIDATE_INVITATION_TOKEN_SUCCESS = 'VALIDATE_INVITATION_TOKEN_SUCCESS',
  VALIDATE_INVITATION_TOKEN_ERROR = 'VALIDATE_INVITATION_TOKEN_ERROR',
}

const initialState: InvitationFormStore = {
  isRequesting: false,
  error: undefined,
  submittedEmail: '',
  invitation: {
    organization: '',
    email: '',
    isUser: false,
    hasOrganizations: false,
  },
  invitationError: undefined,
}

export default function registerFormReducer (
  state = initialState,
  action: InvitationFormActions | AuthStoreActionTypes['logout'],
): InvitationFormStore {
  switch (action.type) {
    case LOGOUT: {
      return initialState
    }

    case InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_SUCCESS: {
      return update(state, {
        invitation: { $set: action.response },
        isRequesting: { $set: false },
      })
    }
    case InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_ERROR: {
      return update(state, {
        invitationError: { $set: action.error },
        isRequesting: { $set: false },
      })
    }

    default:
      return state
  }
}

export const acceptInvitationWithSignInActions = {
  request: (token: string, provider: string, code: string) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_WITH_SIGN_REQUEST,
      payload: { token, provider, code },
    } as const
  },
  success: (response: any) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_WITH_SIGN_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_WITH_SIGN_ERROR,
      error: error,
    } as const
  },
}

export const acceptInvitationActions = {
  request: (token: string) => {
    return {
      type: InvitationFormActionsTypes.ACCEPT_INVITATION_REQUEST,
      payload: { token: token },
    } as const
  },
  success: (response: any) => {
    return {
      type: InvitationFormActionsTypes.ACCEPT_INVITATION_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: InvitationFormActionsTypes.ACCEPT_INVITATION_ERROR,
      error: error,
    } as const
  },
}

export const invitationSignInActions = {
  request: (token: string, provider: string) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_SIGN_REQUEST,
      payload: { token, provider },
    } as const
  },
  success: (response: any) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_SIGN_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: InvitationFormActionsTypes.INVITATION_SIGN_ERROR,
      error: error,
    } as const
  },
}

export const rejectInvitationActions = {
  request: (token: string) => {
    return {
      type: InvitationFormActionsTypes.REJECT_INVITATION_REQUEST,
      payload: { token: token },
    } as const
  },
  success: (response: any) => {
    return {
      type: InvitationFormActionsTypes.REJECT_INVITATION_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: InvitationFormActionsTypes.REJECT_INVITATION_ERROR,
      error: error,
    } as const
  },
}

export const validateInvitationTokenActions = {
  request: (token: string) => {
    return {
      type: InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_REQUEST,
      payload: { token: token },
    } as const
  },
  success: (response: any) => {
    return {
      type: InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_SUCCESS,
      response: response,
    } as const
  },
  error: (error: string) => {
    return {
      type: InvitationFormActionsTypes.VALIDATE_INVITATION_TOKEN_ERROR,
      error: error,
    } as const
  },
}
